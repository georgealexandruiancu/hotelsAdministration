import React, { Component } from 'react';
import fire from './../config/Fire';
import "./../clients/style.css";
import _ from 'lodash';
import { Link } from 'react-router-dom';
class CardRes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeClient: "",
            reservations: "",
            allOk: false
        }
        this.showCards = this.showCards.bind(this);
        this.getRes = this.getRes.bind(this);
        this.checkConnection = this.checkConnection.bind(this);


    }
    componentWillMount() {
        this.checkConnection();
    }
    checkConnection() {
        var This = this;
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                This.setState({ activeClient: user.email }, () => { This.getRes();})
            } else {
                window.location = "/Travelissiomo";
            }
        });
    }
    getRes() {
        var user = this.state.activeClient;
        console.log(user);
        fire.database().ref('/clients/').orderByChild('email').equalTo(user).once('value', (snapshot) => {
            let key = Object.keys(snapshot.val())[0];
            fire.database().ref("/clients/" + key + "/reservations").once('value', (snapshot)=>{
                let reservations = _.values(snapshot.val());
                this.setState({reservations, allOk: true}, () => {
                    this.showCards();
                });
            })
        });
    }
    showCards() {
        var table = [];
        if (this.state.allOk === true) {
            var res = this.state.reservations;
            for (let i = 0; i < res.length; i++) {
                if(res[i].activeRes === false){
                table.push(
                    <tr key={"res"+i}>
                        <td>{i}</td>
                        <td>{res[i].hotelName}</td>
                        <td>{res[i].dateCheckIn}</td>
                        <td>{res[i].dateCheckOut}</td>
                        <td>{res[i].roomType}</td>
                        <td>{res[i].totalPrice}</td>
                        <td>{res[i].persons}</td>
                        <td>Pending</td>
                    </tr>
                )
                }else{
                    table.push(
                    <tr key={"res" + i}>
                        <td>{i}</td>
                        <td>{res[i].hotelName}</td>
                        <td>{res[i].dateCheckIn}</td>
                        <td>{res[i].dateCheckOut}</td>
                        <td>{res[i].roomType}</td>
                        <td>{res[i].totalPrice}</td>
                        <td>{res[i].persons}</td>
                        <td>Aproved</td>
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
    render() {
        return (
            this.showCards()
        );
    }
}

export default CardRes;
