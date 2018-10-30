import React, { Component } from 'react';
import AsideProfile from './profile';
import fire from './../config/Fire';
import "./../clients/style.css";
import { Link } from 'react-router-dom';
class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeClient: ""
        }

    }
    componentWillMount() {
       
    }

    render() {
        return (
            <div>   
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 logo-holder">
                            <center>
                                Travelissimo
                            </center>
                        </div>
                    </div>
                </div>
                <AsideProfile/>
            </div>
        );
    }
}

export default ClientDashboard;
