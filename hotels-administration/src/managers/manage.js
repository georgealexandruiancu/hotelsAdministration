import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire'
import { Link } from 'react-router-dom';
class ManagerDashboard extends Component {
   
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                YOU ARE IN MANAGER DASHBOARD
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManagerDashboard;
