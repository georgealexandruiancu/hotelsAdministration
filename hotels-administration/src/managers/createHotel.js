import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire'
import Navigation from "./manage";
import {saveHistory} from './history';
class CreateHotel extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            activeManager: "",
            navBarOpen: true,
            rooms: 1,
            finishFunction: false,
            hotelCurrentCreated: "",
            currentImageHotel: "",
            currentImageRoom: ""
        }
        // this.checkConnection = this.checkConnection.bind(this);
        this.appendRooms = this.appendRooms.bind(this);
        this.containerRooms = this.containerRooms.bind(this);
        this.saveRoom = this.saveRoom.bind(this);
    }
    componentWillMount() {
        this.checkConnection();
    }
    checkConnection() {
        var This = this;
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                This.setState({activeManager: user.email});
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
    appendRooms() {
        var rooms = document.getElementById("noRooms").value
        this.setState({
            finishFunction: true,
            rooms: rooms
        });       
    }

    saveRoom(key) {

        var roomName = document.getElementById("roomname/"+key).value;
        var roomDesc = document.getElementById("roomdesc/"+key).value;
        var roomFaci = document.getElementById("roomfaci/"+key).value;
        var roomPrice = document.getElementById("roomprice/" + key).value;
        var roomImage = document.getElementById("roomimage/"+key).files[0];
        const name = this.state.hotelCurrentCreated + "/" + key;
        const ref = fire.storage().ref("/rooms");
        const metadata = { contentType: roomImage.type };
        const task = ref.child(name).put(roomImage, metadata);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                console.log(url);
                this.setState({ currentImageRoom: url })

            }).then(() => {
                fire.database().ref('rooms/' + this.state.hotelCurrentCreated + "/" + key).set({
                    name: roomName,
                    description: roomDesc,
                    facilities: roomFaci,
                    price: roomPrice,
                    image: this.state.currentImageRoom
                });
            })
    }
    containerRooms() {
        let table = [];
        if (this.state.finishFunction === true) {
            for (var i = 0; i < this.state.rooms; i++) {
                table.push(
                    <div className="roomContainer">
                        <h6>Room number: {i} </h6>
                        <input type="text" placeholder="Room Name.." id={"roomname/" + i}/><br />
                        <input type="text" placeholder="Room Description.." id={"roomdesc/" + i}/><br />
                        <input type="text" placeholder="Room Facilities.." id={"roomfaci/" + i}/><br />
                        <label > Select an image for room </label>
                        <input type="file" placeholder="Room Image.." id={"roomimage/" + i}/><br />
                        <input type="text" placeholder="Price per night.." id={"roomprice/" + i} /><br />

                        <button onClick={this.saveRoom.bind(this, i)}>Save Room</button>
                    </div>
                )
            }
            return table;
        }
    }
    publishHotel(){
        alert("se salveaza");
        var titleHotel = document.getElementById("titleHotel").value;
        var descHotel = document.getElementById("descHotel").value;
        var imageHotel = document.getElementById("imageHotel").files[0];
        var starsHotel = document.getElementById("starsHotel").value;
        var locationHotel = document.getElementById("locationHotel").value;
        var contactHotel = document.getElementById("contactHotel").value;
        this.setState({hotelCurrentCreated: titleHotel});
        const name = titleHotel;
        const ref = fire.storage().ref("/hotels");
        const metadata = { contentType: imageHotel.type };
        const task = ref.child(name).put(imageHotel, metadata);
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                console.log(url);
                this.setState({currentImageHotel: url})
              
            }).then(() => {
                fire.database().ref('hotels/' + titleHotel).set({
                    title: titleHotel,
                    description: descHotel,
                    image: this.state.currentImageHotel,
                    stars: starsHotel,
                    location: locationHotel,
                    contact: contactHotel,
                    manager: this.state.activeManager
                });
            }).then(() => {
                for(var i=0;i<this.state.rooms;i++){
                    this.saveRoom(i);
                }
            }).then(() => {
                saveHistory(this.state.activeManager, titleHotel, 'Hotel created');
            })
    }
    render() {
        return (
            <div>
                <Navigation />
                <div className="holder-page">
                    <center>
                        <h5>
                            Create an hotel
                        </h5>
                    </center>
                    <div className="inputs-holder">
                        <input type="text" placeholder="Title of hotel.." className="allInputs" id="titleHotel"/><br />
                        <textarea className="allInputs" placeholder="Description of hotel.." id="descHotel">
                        </textarea><br />
                        <input type="file" placeholder="Hotel Image.." className="allInputs" id="imageHotel"/><br />
                        <input type="text" placeholder="Stars(1->5).." className="allInputs" id="starsHotel"/><br />
                        <input type="text" placeholder="Location of hotel.." className="allInputs" id="locationHotel"/><br />
                        <input type="text" placeholder="Contact of hotel.." className="allInputs" id="contactHotel"/><br />
                        <label className="allInputs">Number of rooms: (integer number)</label><br></br>
                        <input type="text" placeholder="Number of rooms.." className="allInputs" id="noRooms" /><button onClick={this.appendRooms}>Make details for rooms</button><br></br>
                        <div id="containerRooms">
                            {this.containerRooms()}
                        </div>
                        <button onClick={this.publishHotel.bind(this)} className="allInputs">PUBLISH THE HOTEL</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateHotel;
