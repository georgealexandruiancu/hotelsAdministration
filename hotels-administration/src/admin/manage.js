import React, { Component } from 'react';
import './../admin/style.css';
import fire from './../config/Fire';

class Manage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentEmailUser: ""
        }
        this.getCredentials = this.getCredentials.bind(this);
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
    logout(){
        fire.auth().signOut();
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
                </div>
            </div>
        );
    }
}

export default Manage;
