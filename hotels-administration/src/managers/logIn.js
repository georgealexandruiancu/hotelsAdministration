import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire'
import { Link } from 'react-router-dom';
class LogInManager extends Component {
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
            window.location = "/ManagerDashboard"
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                MANAGER LOGIN
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
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                <button className="btn btn-danger" onClick={this.login}>Log in!</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogInManager;
