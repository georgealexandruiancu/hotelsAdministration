import React, { Component } from 'react';
import fire from './../config/Fire';
import "./../clients/style.css";
import { Link } from 'react-router-dom';
class LogInClient extends Component {
    constructor(props) {
        super(props);
        this.handleChanges = this.handleChanges.bind(this);
        this.login = this.login.bind(this);
        this.state = {
            email: "",
            password: ""
        }

    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {

        }).then(() => {
            window.location = "/Travelissimo/Client/Dashboard"
        }).catch((err) => {
            console.log(err);
        })
    }
    handleChanges(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <div>
                <div className="splashHolder"></div>
            <div className="page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 logo-holder">
                            <center>
                                Travelissimo
                            </center>
                        </div>
                    </div>
                </div>
                <div className="container mt-50">
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                <h2>CLIENT LOGIN</h2>
                            </center>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>Please insert the Email</p>
                            <input type="email" placeholder="Email here.." name="email" style={{ width: 100 + "%" }} value={this.state.email} onChange={this.handleChanges} ></input>
                        </div>
                        <div className="col-md-6">
                            <p>Please insert the password</p>
                            <input type="password" placeholder="Password here.." name="password" style={{ width: 100 + "%" }} value={this.state.password} onChange={this.handleChanges} ></input>
                        </div>
                    </div>
                    <div className="row mt-50">
                        <div className="col-md-12">
                            <center>
                                <button className="btn btn-danger" onClick={this.login}>Log in!</button>
                            </center>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default LogInClient;
