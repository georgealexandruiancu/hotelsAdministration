import React, { Component } from 'react';
import './../admin/style.css';
import fire from "./../config/Fire";
// import { browserHistory } from 'react-router';
class SignUpAdmin extends Component {
    constructor(props) {
        super(props);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            if(u){
                fire.database().ref("admins/").push({
                    email: this.state.email
                }).then(() => {
                    console.log("created user in db");
                }).catch((err) => {
                    console.log(err);
                })
            }else{
                console.log("err");
            }
            // console.log(u);
        }).then(()=>{
            alert("success");
        }).then(()=>{
            window.location = "/LogInAdmin"
        }).catch((err) => {
            console.log(err);
        })
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value })
    }
    handleChangePass(e) {
        this.setState({ password: e.target.value })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                ADMIN SIGNUP
                            </center>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>Please insert the Email</p>
                            <input type="email" placeholder="Email here.." name="email" style={{ width: 100 + "%" }} value={this.state.email} onChange={this.handleChangeEmail} ></input>
                        </div>
                        <div className="col-md-6">
                            <p>Please insert the password</p>
                            <input type="password" placeholder="Password here.." name="password" style={{ width: 100 + "%" }} value={this.state.password} onChange={this.handleChangePass} ></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                <button className="btn btn-danger" onClick={this.signup}>Sign up!</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpAdmin;
