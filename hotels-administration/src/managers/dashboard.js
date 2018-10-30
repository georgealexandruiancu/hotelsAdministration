

import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire'
import Navigation from "./manage";
import GetHistory  from './getHistory';
import GetReservations from './getReservations';



class ManagerDashboard extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            navBarOpen: true,
            fetchManager: false,
            activeManager: "",
            history: ""
        }
        this.checkConnection = this.checkConnection.bind(this);
    }
    componentDidMount() {
        this.checkConnection();
    }
    showState(){
        console.log(this.state);
    }
    checkConnection() {
        var This = this;
        
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                This.setState({ activeManager: user.email});
            } else {
                alert("You must be logged in");
                window.location = "/LogInManager";
            }
        });
    }
    logout() {
        fire.auth().signOut();
        window.location = "/LogInManager";
    }
   
    render() {
        return (
            <div>
            <Navigation/>
                <div className="holder-page">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <div class="alert alert-danger" role="alert">
                                    Commands History for: {this.state.activeManager} <br/>
                                    <center>DATE - HOTEL - ACTION</center>
                                </div>
                                <GetHistory />
                            </div>
                            <div className="col-md-8">
                                <center>
                                    <h3>Last reservations</h3>
                                </center>
                                <table class="table">
                                    <thead>
                                        <th>No.</th>
                                        <th>Hotel Name</th>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                        <th>Room Type</th>
                                        <th>Total Price</th>
                                        <th>Persons</th>
                                        <th>ACTIONS</th>
                                    </thead>
                                    <tbody>
                                        <GetReservations />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ManagerDashboard;
