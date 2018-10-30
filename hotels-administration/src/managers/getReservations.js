

import React, { Component } from 'react';
import './../managers/style.css';
import fire from '../config/Fire'
import Navigation from "./manage";
import GetHistory  from './getHistory';
import _ from 'lodash';

class GetReservations extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            navBarOpen: true,
            fetchManager: false,
            activeManager: "",
            history: "",
            allOk: false
        }
        this.checkConnection = this.checkConnection.bind(this);
        this.getReservations = this.getReservations.bind(this);

    }
    componentDidMount() {
        this.checkConnection();
    }
    checkConnection() {
        var This = this;
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                This.setState({ activeManager: user.email}, () => {This.getReservations();});
            } else {
                alert("You must be logged in");
                window.location = "/LogInManager";
            }
        });
    }
    getReservations() {
        fire.database().ref("/hotels/").orderByChild('manager').equalTo(this.state.activeManager).once('value', (snapshot) => {
            let hotels = _.values(snapshot.val());
            console.log(hotels);
            var reservationsRaw = []
            for(let i=0;i<hotels.length;i++){
                var keys = Object.keys(hotels[i].reservations);
                for (let j = 0; j < keys.length;j++){
                    reservationsRaw.push(hotels[i].reservations[keys[j]]);
                }
            }
            this.setState({reservations: reservationsRaw, allOk: true}, () => {console.log(this.state)});
        });
    }
    showCards() {
        var table = [];
        if (this.state.allOk === true) {
            var res = this.state.reservations;
            console.log(res);
            for (let i = 0; i < res.length; i++) {
                if (res[i].activeRes === false) {
                    table.push(
                        <tr key={"res" + i}>
                            <td>{i}</td>
                            <td>{res[i].hotelName}</td>
                            <td>{res[i].dateCheckIn}</td>
                            <td>{res[i].dateCheckOut}</td>
                            <td>{res[i].roomType}</td>
                            <td>{res[i].totalPrice}</td>
                            <td>{res[i].persons}</td>
                            <td>
                                <button>Approve This</button>
                            </td>
                        </tr>
                    )
                } else {
                    table.push(
                        <tr key={"res" + i}>
                            <td>{i}</td>
                            <td>{res[i].hotelName}</td>
                            <td>{res[i].dateCheckIn}</td>
                            <td>{res[i].dateCheckOut}</td>
                            <td>{res[i].roomType}</td>
                            <td>{res[i].totalPrice}</td>
                            <td>{res[i].persons}</td>
                            <td>
                                <button>Cancel This</button>
                            </td>
                        </tr>
                    );
                }
            }
            return table;
        } else {
            table.push(
                <center>
                    <div className="loader pos-center" key={"loddder"}></div>
                </center>
            );
            return table;
        }
    }
    logout() {
        fire.auth().signOut();
        window.location = "/LogInManager";
    }
   
    render() {
        return (
            this.showCards()
        );
    }

}

export default GetReservations;
