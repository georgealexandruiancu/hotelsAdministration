import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire';
import _ from 'lodash';
import Navigation from "./manage";
class GestHotel extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            navBarOpen: true,
            activeManager: false,
            activeHotel: "",
            manager: "",
            hotels: "",
            rooms: "",
            finishFetch: false,
            hotelChange: false,
        }
        this.getHotels = this.getHotels.bind(this);
        this.checkConnection = this.checkConnection.bind(this);
        this.showHotels = this.showHotels.bind(this);
        this.pushHotelData = this.pushHotelData.bind(this);
    }
    componentWillMount() {
        this.checkConnection();
    }

    checkConnection() {
        var This = this;
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                This.setState({ manager: user.email, activeManager: true }, () => { This.getHotels() });
                console.log(This.state);
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
    getHotels() {
        if (this.state.activeManager != false) {
            fire.database().ref("/hotels/").orderByChild('manager').equalTo(this.state.manager).on('value', (snapshot) => {
                this.setState({
                    hotels:
                    {
                        data: snapshot.val(),
                        titles: Object.keys(snapshot.val())
                    }
                }, () => { this.getRooms() });
                console.log(this.state.hotels);

            });
        }
    }
    getRooms() {
        if (this.state.hotels != "") {
            var rooms = {};
            
            for (var i = 0; i < this.state.hotels.titles.length; i++) {
                var title = this.state.hotels.titles[i];
                 rooms[title] = null;
                // rooms.push(x)

                console.log(title,i)
                fire.database().ref("/rooms/").child(this.state.hotels.titles[i]).once('value', (snapshot) => {
                    console.log(snapshot.val());
                    // rooms[title] = snapshot.val();
                    rooms[title] = i;
                    this.setState({ rooms })

                    // rooms.push(title[snapshot.val()])

                    // this.setState({
                    //     rooms: [...this.state.rooms, title]
                    // });
                    console.log(this.state);
                });
            }
            this.setState({ finishFetch: true }, () => { this.showHotels() });
        }
    }
    showHotels() {
        let table = [];
        if (this.state.finishFetch === true) {
            for (var i = 0; i < this.state.hotels.titles.length; i++) {
                table.push(
                    <option value={this.state.hotels.titles[i]}>{this.state.hotels.titles[i]}</option>
                )
            }
        }
        return table;
    }
    getHotelTitle() {
        var e = document.getElementById("selectHotel");
        var hotel = e.options[e.selectedIndex].value;
        if(hotel !== "selectanhotel"){
            var This = this;
            This.setState({ hotelChange: true, activeHotel: hotel })
        }else{
            var This = this;
            This.setState({ hotelChange: false, activeHotel: "" })
        }
        // this.pushHotelData(hotel);
    }
    pushHotelData() {
        if(this.state.hotelChange === true){
            var hotels = this.state.hotels;
            console.log(hotels.data[this.state.activeHotel]);
            let table = [];
            table.push(
                <div>
                    <label>Name:</label> 
                    <input value={hotels.data[this.state.activeHotel].title} className="allInputs"/><br/>
                    <label>Description:</label>
                    <textarea value={hotels.data[this.state.activeHotel].description} className="allInputs textareaEdit" /><br />
                    <label>Location:</label>
                    <input value={hotels.data[this.state.activeHotel].location} className="allInputs" /><br />
                    <label>Manager: </label>
                    <input value={hotels.data[this.state.activeHotel].manager} className="allInputs" /><br />
                    <label>Stars: </label>
                    <input value={hotels.data[this.state.activeHotel].stars} className="allInputs" /><br />
                    <img src={hotels.data[this.state.activeHotel].image} />
                </div>
            );
            return table;
        }
    }
    containerRooms(){
        let table = [];
        if(this.state.hotelChange === true){
            console.log(this.state);
            // var rooms = _.values(this.state.rooms)
        }
    }
    render() {
        return (
            <div>
                <Navigation />
                <div className="holder-page">
                    <center>
                        <h5>
                            Modify an hotel
                        </h5>
                    </center>
                    SELECT THE HOTEL: 
                    <select onChange={this.getHotelTitle.bind(this)} id="selectHotel">
                        <option value="selectanhotel">SELECT AN HOTEL</option>
                        {this.showHotels()}
                    </select>
                    <div className="hotelDetails">
                        {this.pushHotelData()}
                    </div>
                    <div id="containerRooms">
                        {this.containerRooms()}
                    </div>
                </div>
            </div>

        );
    }

}

export default GestHotel;
