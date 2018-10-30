import React, { Component } from 'react';
import fire from './../config/Fire';
import "./../clients/style.css";
import { Link } from 'react-router-dom';
class AsideProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeClient: "",
            clientOk: false,
            infoClient: "",
            key: ""
        }
        this.checkConnection = this.checkConnection.bind(this);
        this.getClientData = this.getClientData.bind(this);
    }
    componentWillMount(){
        this.checkConnection();
    }
    checkConnection() {
        var This = this;
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                This.setState({ activeClient: user.email}, () => {This.getClientData()})
            } else {
                window.location = "/Travelissiomo";
            }
        });
    }
    getClientData(){
       
            fire.database().ref('/clients').orderByChild('email').equalTo(this.state.activeClient).on('value', (snapshot) => {
                let user = snapshot.val();
                let key = Object.keys(user)[0];
                this.setState({ infoClient: user, key: key, clientOk: true })
            });
        
    }
    showUpdateInputs(){
        var table = [];
        if(this.state.clientOk === true){
            table.push(
                <div>
                    <div className="inputProfileHolder">
                        <label>
                            Modify your name:
                                </label>
                        <input placeholder={this.state.infoClient[this.state.key].displayName} id="modName" />
                    </div>
                    <div className="inputProfileHolder">
                        <label>
                            Modify your age:
                                </label>
                        <input placeholder={this.state.infoClient[this.state.key].age} id="modAge" />
                    </div>
                    <div className="inputProfileHolder">
                        <label>
                            Modify your phone:
                                </label>
                        <input placeholder={this.state.infoClient[this.state.key].phone} id="modPhone" />
                    </div>
                    <div className="inputProfileHolder">
                        <label>
                            Modify your city:
                                </label>
                        <input placeholder={this.state.infoClient[this.state.key].city} id="modCity" />
                    </div>
                    <button className="btn btn-danger mt-25">
                        Update this
                    </button>
                </div>
            );
            return table;
        }else{
            table.push(<center>
                <div class="loader"></div>
            </center>);
            return table;
        }
    }
    render() {
        return (
            <div>
               <div className="asidePannel">
                    <div className="profileName mt-100">
                        <center>
                            <h6>Hello,  {this.state.activeClient}</h6>
                        </center>
                    </div>
                    <div className="profileInfo mt-100">
                        {this.showUpdateInputs()}
                    </div>
                    <div className="buttonsHolder mt-50">
                        <center>
                            <button className="btn btn-primary">
                                My reservations
                            </button><br /><br />
                            <button className="btn btn-danger">
                                Logout
                            </button>
                        </center>
                    </div>
               </div>
            </div>
        );
    }
}

export default AsideProfile;
