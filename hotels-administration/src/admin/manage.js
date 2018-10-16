import React, { Component } from 'react';
import './../admin/style.css';
import fire from './../config/Fire';

class Manage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentEmailUser: "",
            managerEmail: "",
            managerPass: ""
        }
        this.getCredentials = this.getCredentials.bind(this);
        this.emailManager = this.emailManager.bind(this);
        this.passManager = this.passManager.bind(this);
        this.createManager = this.createManager.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount(){
        this.getCredentials();
    }
    getCredentials(){
        var This = this;
        fire.auth().onAuthStateChanged(function(user){
            if(user){
                This.setState({currentEmailUser: user.email });
                console.log(This.state);
            }
        });
    }
    emailManager(e){
        this.setState({ managerEmail: e.target.value })
    }
    passManager(e){
        this.setState({ managerPass: e.target.value })
    }
    createManager(){
        var This = this;
        fire.auth().onAuthStateChanged(function(user){
            if(user){
                fire.auth().createUserWithEmailAndPassword(This.state.managerEmail, This.state.managerPass).then((u)=>{
                    alert("Manager is success");
                }).then(()=>{
                    fire.database().ref("/managers").push({
                        email: This.state.managerEmail
                    })
                })
            }   
        })
    }
    logout(){
        fire.auth().signOut();
        window.location = "/LogInAdmin";
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                <h5>Hi, {this.state.currentEmailUser}</h5>  
                                <button className="btn btn-danger" onClick={this.logout}>LOG OUT!!</button>
                            </center>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                <h5>Create an Manager Profile</h5>
                                <p>Please insert the email</p>
                                <input type="email" className="form-control" style={{width: 320+"px"}} onChange={this.emailManager} value={this.state.managerEmail} />
                                <br/>
                                <p>Please insert the password</p>
                                <input type="password" className="form-control" style={{ width: 320 + "px" }} onChange={this.passManager} value={this.state.managerPass} />
                                <br/>
                                <button className="btn btn-primary" style={{marginTop: 50+"px"}} onClick={this.createManager}>Create manager</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Manage;
