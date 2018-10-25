import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire'

class ManagerDashboard extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.state ={
            navBarOpen: true
        }
        this.checkConnection = this.checkConnection.bind(this);
        this.createHotel = this.createHotel.bind(this);

    }
    componentWillMount(){
            this.checkConnection();
    }
    checkConnection(){
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
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
    render() {
        return (
            <div>
                <div className="fancyNav" id="fancyNav">
                    <div className="user">
                        MANGER1@test.com
                    </div>
                    <div className="commnadList">
                        <li>
                                <i class="fas fa-tachometer-alt iconsMenu"></i>
                                <div className="textMenu">DASHBOARD</div>
                        </li>
                        <li>
                                <i class="fas fa-chart-pie iconsMenu"></i>
                                <div className="textMenu">GEST HOTEL</div>
                        </li>
                        <li onClick={this.createHotel}>
                                <i class="fas fa-plus-square iconsMenu"></i>
                                <div className="textMenu">CREATE HOTELS</div>
                        </li>
                    </div>
                </div>
            </div>
        );
    }
   
}

export default ManagerDashboard;
