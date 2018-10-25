import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire'
import Navigation from "./manage";
class CreateHotel extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            navBarOpen: true,
            rooms: 1
        }
        this.checkConnection = this.checkConnection.bind(this);
        this.appendRooms = this.appendRooms.bind(this);
        this.containerRooms = this.containerRooms.bind(this);
        this.saveRoom = this.saveRoom.bind(this);


    }
    componentWillMount() {
        this.checkConnection();
    }
    checkConnection() {
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
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
    createHotel() {
        window.location = "/CreateHotel";
    }
    appendRooms(){
        var rooms = document.getElementById("noRooms").value
        this.containerRooms(rooms);        
    }
    saveRoom(){
        alert("da");
    }
    containerRooms(rooms){
         let table = [];
        var containerRooms = document.getElementById("containerRooms");
        for (let i = 0; i < rooms; i++) {           
            containerRooms.innerHTML += `
            <div className="roomContainer" style="background: #007bff; border-radius: 25px; padding: 10px 10px 10px 10px; margin-top: 15px; width: 350px; float: left; margin-left: 10px;">
                <h5 style="color: white; padding: none; margin: none;">Room number: `+(i+1)+`</h5>
                <input type="text" placeholder="Room Name.." style="width: 250px; margin-top: 15px"/><br/>
                <input type="text" placeholder="Room Description.." style="width: 250px; margin-top: 15px"/><br/>
                <input type="text" placeholder="Room Facilities.." style="width: 250px; margin-top: 15px"/><br/>
                <label style="width: 250px; color: white"> Select an image for room </label>
                <input type="file" placeholder="Room Image.." style="width: 250px;"/><br/>
                <button style="margin-top: 10px">Save Room</button>
            </div>`
        }
    }
    render() {
        return (
            <div>
                <Navigation/>
                <div className="holder-page">
                    <center>
                        <h5>
                            Create an hotel
                        </h5>
                    </center>
                    <div className="inputs-holder">
                        <input type="text" placeholder="Title of hotel.." className="allInputs"/><br/>
                        <textarea className="allInputs" placeholder="Description of hotel..">
                        </textarea><br/>
                        <input type="text" placeholder="Location of hotel.." className="allInputs" /><br />
                        <input type="text" placeholder="Contact of hotel.." className="allInputs" /><br />
                        <label className="allInputs">Number of rooms: (integer number)</label><br></br>
                        <input type="text" placeholder="Number of rooms.." className="allInputs" id="noRooms"/><button onClick={this.appendRooms}>Make details for rooms</button><br></br>
                        <div id="containerRooms">
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateHotel;
