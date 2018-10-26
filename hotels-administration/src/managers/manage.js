import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire'

class ManagerDashboard extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.state ={
            navBarOpen: true,
            activeManager: ""
        }
        this.checkConnection = this.checkConnection.bind(this);
        this.createHotel = this.createHotel.bind(this);
        this.gestHotel = this.gestHotel.bind(this);


    }
    componentWillMount(){
            this.checkConnection();
    }
    checkConnection(){
        var This = this;
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                This.setState({activeManager: user.email})
            } else {
                alert("You must be logged in");
                window.location = "/LogInManager";
            }
        });
    }
    logout(){
        fire.auth().signOut();
        window.location = "/LogInManager";
    }
    createHotel(){
        window.location = "/CreateHotel";
    }
    gestHotel(){
        window.location = '/GestHotels';
    }
    render() {
        return (
            <div>
                <div className="fancyNav" id="fancyNav">
                    <div className="user">
                        {this.state.activeManager}
                    </div>
                    <div className="commnadList">
                        <li>
                                <i className="fas fa-tachometer-alt iconsMenu"></i>
                                <div className="textMenu">DASHBOARD</div>
                        </li>
                        <li onClick={this.gestHotel}>
                                <i className="fas fa-chart-pie iconsMenu"></i>
                                <div className="textMenu">GEST HOTEL</div>
                        </li>
                        <li onClick={this.createHotel}>
                                <i className="fas fa-plus-square iconsMenu"></i>
                                <div className="textMenu">CREATE HOTELS</div>
                        </li>
                    </div>
                </div>
            </div>
        );
    }
   
}

export default ManagerDashboard;
