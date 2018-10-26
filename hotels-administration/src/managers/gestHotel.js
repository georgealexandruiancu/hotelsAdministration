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
        var temp = 0;
        if (this.state.hotels != "") {
            var rooms = {};
            for (let i = 0; i < this.state.hotels.titles.length; i++) {
                var title = this.state.hotels.titles[i];
                rooms[title] = null;
            }
            for (let i = 0; i < Object.keys(rooms).length; i++) {
                console.log(title, i)
                fire.database().ref("/rooms/").child(this.state.hotels.titles[i]).once('value', (snapshot) => {
                    console.log(snapshot.val());
                  
                    rooms[Object.keys(rooms)[i]] = snapshot.val();
                    this.setState({ rooms });
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
        if (hotel !== "selectanhotel") {
            var This = this;
            This.setState({ hotelChange: true, activeHotel: hotel })
        } else {
            var This = this;
            This.setState({ hotelChange: false, activeHotel: "" })
        }
        // this.pushHotelData(hotel);
    }
    pushHotelData() {
        if (this.state.hotelChange === true) {
            var hotels = this.state.hotels;
            console.log(hotels.data[this.state.activeHotel]);
            let table = [];
            table.push(
                <div>
                    <label>Name:</label>
                    <input value={hotels.data[this.state.activeHotel].title} className="allInputs" /><br />
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
    showBtn(){
        if(this.state.hotelChange === true){
            return(
                <div>
                     <br/><button className="dispBlock">Update hotel</button>
                </div>
            )
        }
    }
    containerRooms() {
        let table = [];
        if (this.state.hotelChange === true) {
           
            // var rooms = _.values(this.state.rooms)
            var rooms = this.state.rooms[this.state.activeHotel];
            for(let i=0;i<rooms.length;i++){
                table.push(
                    <div className="roomContainer">
                        <h6>Room number: {i} </h6>
                        <label>Name:</label>
                        <input type="text" value={rooms[i].name} id={"roomname/" + i} /><br />
                        <label>Description:</label>
                        <textarea type="text" value={rooms[i].description} id={"roomdesc/" + i} className="textareaEdit"></textarea><br />
                        <label>Facilities:</label>                        
                        <input type="text" value={rooms[i].facilities} id={"roomfaci/" + i} /><br />
                        <label>Price:</label>                        
                        <input type="text" value={rooms[i].price} id={"roomprice/" + i} /><br />
                        <img src={rooms[i].image} />
                        <label > Select another image for room </label>
                        <input type="file" placeholder="Room Image.." id={"roomimage/" + i} /><br />
                        {/* <button onClick={this.saveRoom.bind(this, i)}>Save Room</button> */}
                    </div>
                )
            }
            return table;
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
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                {this.showBtn()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

export default GestHotel;
