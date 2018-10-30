import React, { Component } from 'react';
import AsideProfile from './profile';
import testImg from './../splashHolder.jpeg';
import CardHotels from './cardHotel';
import fire from './../config/Fire';
import "./../clients/style.css";
class HotelDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeHotel: "",
            hotel: "",
            fetch: false
        }
        this.saveReservation = this.saveReservation.bind(this);
    }
    componentWillMount() {
        this.setState({ activeHotel: this.props.match.params.hotelname }, () => { this.queryDb() });
    }
    queryDb() {
        var hotelname = this.state.activeHotel;
        fire.database().ref("/hotels/" + hotelname).on("value", (snapshot) => {
            this.setState({ hotel: snapshot.val() }, () => { this.getRooms() });
        });
    }
    getRooms() {
        var hotelname = this.state.activeHotel;
        if (this.state.hotel != "") {
            fire.database().ref('/rooms/' + hotelname).once('value', (snapshot) => {
                this.setState({ rooms: snapshot.val(), fetch: true }, () => { console.log(this.state) });
            })
        }
    }
    showHotel() {
        var table = [];
        if (this.state.fetch === true) {
            table.push(
                <div className="col-md-6 hotel-details">
                    <h5>{this.state.hotel.title}</h5>
                    <div className="stars">
                        Stars: {this.state.hotel.stars}
                                </div>
                    <div className="lineDiv"></div>
                    <img src={this.state.hotel.image} />
                    <div className="description">
                        {this.state.hotel.description}
                                </div>
                    <div className="lineDiv"></div>

                    <div className="contact">
                        Contact: {this.state.hotel.contact}
                                </div>
                    <div className="lineDiv"></div>

                    <div className="location">
                        Location: {this.state.hotel.location}
                                </div>
                </div>
            );
            return table;
        }else{
            table.push(
                <center>
                    <div className="loader m-l-50" key={"loddder"}></div>
                </center>
            );
            return table;
        }
    }
    showRooms(){
        var table = [];
        if (this.state.fetch === true) {
            for(let i=0;i<this.state.rooms.length;i++){
                table.push(
                    <div className="room-card">
                        <img src={this.state.rooms[i].image} />
                        <div class="room-preview">
                            <div className="room-name">
                                Room Title: {this.state.rooms[i].name}
                                            </div>
                            <div className="lineDiv"></div>
                            <div className="room-facilities">
                                Facilities: {this.state.rooms[i].facilities}
                                            </div>
                            <div className="room-price">
                                Price: {this.state.rooms[i].price} USD / night
                                            </div>
                            <div className="makeReserv">
                                Make a reservation: <br></br><br></br>

                                <label for="checkIn">CheckIn: </label>
                                <input type="date" id={"checkIn/" + i} name="trip" /><br></br>
                                <label for="checkOut">CheckOut: </label>
                                <input type="date" id={"checkOut/" + i} name="trip" /><br></br>
                                <label for="checkOut">Persons: </label>
                                <input type="number" id={"persons/" + i} name="trip" /><br></br><br></br><br></br><br></br>
                                <button className="btn btn-primary pos-abs" onClick={(e) => this.saveReservation(e, i, this.state.rooms[i].name, this.state.hotel.title)}>Save Reservation</button>

                            </div>

                        </div>
                    </div>
                );
            }
            return table;
        } else {
            table.push(
                <center>
                    <div className="loader m-l-50" key={"loddder"}></div>
                </center>
            );
            return table;
        }
    }
    saveReservation(e,index, room, hotel){
        e.preventDefault();

        var checkIn = document.getElementById("checkIn/" + index).value;
        var checkOut = document.getElementById("checkOut/" + index).value;
        var persons = document.getElementById("persons/" + index).value;
     
        // fire.database().ref('/clients')
        var user = fire.auth().currentUser;
        alert(user.email);
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
                <AsideProfile />
                <div className="page-holder-client">
                    <div className="container-fluid mt-50">
                        <div className="row">
                            {this.showHotel()}
                            <div className="col-md-6 rooms-holder">
                                <h5>Rooms for: {this.state.hotel.title}</h5>
                                {this.showRooms()}
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
        );
    }
}

export default HotelDetails;
