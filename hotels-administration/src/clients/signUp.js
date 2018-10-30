import React, { Component } from 'react';
import fire from './../config/Fire';
import "./../clients/style.css";
import { Link } from 'react-router-dom';
class SignUpClient extends Component {
    constructor(props) {
        super(props);
        this.handleChanges = this.handleChanges.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            email: "",
            password: "",
            name: "",
            age: "",
            phone: "",
            city: "",
        }

    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            if (u) {
                fire.database().ref("clients/").push({
                    email: this.state.email,
                    displayName: this.state.name,
                    age: this.state.age,
                    phone: this.state.phone,
                    city: this.state.city,
                    reservations: ""
                }).then(() => {
                    console.log("created user in db");
                    this.logout();
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                console.log("err");
            }
            // console.log(u);
        }).then(() => {
            alert("success");
        }).then(() => {
        }).catch((err) => {
            console.log(err);
        })
    }
    logout() {
        fire.auth().signOut();
        window.location = "/Travelissimo";
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
                                    <h2>Register client</h2>
                                </center>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <p>Please insert the Email</p>
                                <input type="email" placeholder="Email here.." name="email" style={{ width: 100 + "%" }} value={this.state.email} onChange={this.handleChanges} ></input>
                            </div>
                            <div className="col-md-4">
                                <p>Please insert the password</p>
                                <input type="password" placeholder="Password here.." name="password" style={{ width: 100 + "%" }} value={this.state.password} onChange={this.handleChanges} ></input>
                            </div>
                            <div className="col-md-4">
                                <p>Please insert your age</p>
                                <input type="text" placeholder="Age here.." name="age" style={{ width: 100 + "%" }} value={this.state.age} onChange={this.handleChanges} ></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <p>Please insert your full name</p>
                                <input type="text" placeholder="Name here.." name="name" style={{ width: 100 + "%" }} value={this.state.name} onChange={this.handleChanges} ></input>
                            </div>
                            <div className="col-md-4">
                                <p>Please insert your phone</p>
                                <input type="text" placeholder="Phone here.." name="phone" style={{ width: 100 + "%" }} value={this.state.phone} onChange={this.handleChanges} ></input>
                            </div>
                            <div className="col-md-4">
                                <p>Please insert your city</p>
                                <input type="text" placeholder="City here.." name="city" style={{ width: 100 + "%" }} value={this.state.city} onChange={this.handleChanges} ></input>
                            </div>
                        </div>
                        <div className="row mt-50">
                            <div className="col-md-12">
                                <center>
                                    <button className="btn btn-danger" onClick={this.signup}>Sign up!</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpClient;
