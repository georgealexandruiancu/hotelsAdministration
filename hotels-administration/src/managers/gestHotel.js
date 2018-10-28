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
        this.saveRooms = this.saveRooms.bind(this);

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
        // this.preventDefault();
        if (this.state.hotelChange === true) {
            var convertedActiveHotel = _.snakeCase(this.state.activeHotel);
            var hotels = this.state.hotels;
            console.log(hotels.data[this.state.activeHotel]);
            let table = [];
            table.push(
                <div>
                    <label>Name:</label>
                    <h2>{hotels.data[this.state.activeHotel].title}</h2>
                    <label>Description:</label>
                    <textarea id={"descHotel/" + convertedActiveHotel} placeholder={hotels.data[this.state.activeHotel].description} className="allInputs textareaEdit" /><br />
                    <label>Location:</label>
                    <input id={"locationHotel/" + convertedActiveHotel} placeholder={hotels.data[this.state.activeHotel].location} className="allInputs" /><br />
                    <label>Manager: </label>
                    <input id={"managerHotel/" + convertedActiveHotel} placeholder={hotels.data[this.state.activeHotel].manager} className="allInputs" /><br />
                    <label>Stars: </label>
                    <input id={"starsHotel/" + convertedActiveHotel} placeholder={hotels.data[this.state.activeHotel].stars} className="allInputs" /><br />
                    <label>Contact: </label>
                    <input id={"contactHotel/" + convertedActiveHotel} placeholder={hotels.data[this.state.activeHotel].contact} className="allInputs" /><br />
                    <img src={hotels.data[this.state.activeHotel].image} />
                    <label > Select another image for HOTEL </label>
                    <input type="file" placeholder="Hotel Image.." id={"imgHotel/" + convertedActiveHotel} /><br />
                </div>
            );
            return table;
        }
    }
    showBtn(value){
        if(this.state.hotelChange === true){
            var roomImageCopy = this.state.rooms[this.state.activeHotel];
            console.log(roomImageCopy[1].image);
            console.log(this.state.activeHotel);
            return(
                <div>
                     <br/><button onClick={this.updateChanges.bind(this)} className="dispBlock">Update hotel</button>
                </div>
            )
           
        }
      
    }
    updateChanges(e){
        e.preventDefault();
        alert("se salveaza");
        if(this.state.hotelChange === true){
            var convertedActiveHotel = _.snakeCase(this.state.activeHotel);
            var titleHotel = this.state.activeHotel;
            var descHotel = document.getElementById('descHotel/' + convertedActiveHotel).value;
            var imageHotel = document.getElementById('imgHotel/' + convertedActiveHotel).files[0];
            var starsHotel = document.getElementById('starsHotel/' + convertedActiveHotel).value;
            var locationHotel = document.getElementById('locationHotel/' + convertedActiveHotel).value;
            var contactHotel = document.getElementById('contactHotel/' + convertedActiveHotel).value;
            var imageHotelCopy = this.state.hotels.data[this.state.activeHotel].image;
            console.log(imageHotelCopy);
            if(imageHotel){
                alert("A intrat pe hotel")

                const name = titleHotel;
                const ref = fire.storage().ref("/hotels");
                const metadata = {contentType: imageHotel.type};
                const task = ref.child(name).put(imageHotel,metadata);
                task
                    .then(snapshot => snapshot.ref.getDownloadURL())
                    .then((url) => {
                        console.log(url);
                        this.setState({ currentImageHotel: url })

                    }).then(() => {
                        fire.database().ref('hotels/' + titleHotel).set({
                            title: titleHotel,
                            description: descHotel,
                            image: this.state.currentImageHotel,
                            stars: starsHotel,
                            location: locationHotel,
                            contact: contactHotel,
                            manager: this.state.manager
                        });
                    }).then(() => {
                        let rooms = this.state.rooms[this.state.activeHotel];
                        for(let i=0;i<rooms.length;i++){
                            this.saveRooms(i);
                        }                        
                    })
            }else{
                fire.database().ref('hotels/' + titleHotel).set({
                    title: titleHotel,
                    description: descHotel,
                    stars: starsHotel,
                    location: locationHotel,
                    contact: contactHotel,
                    manager: this.state.manager,
                    image: imageHotelCopy
                });
                let rooms = this.state.rooms[this.state.activeHotel];
                for (let i = 0; i < rooms.length; i++) {
                    this.saveRooms(i);
                }
            }
        }
    }
    saveRooms(key) {

        var roomName = document.getElementById("roomname/" + key).value;
        var roomDesc = document.getElementById("roomdesc/" + key).value;
        var roomFaci = document.getElementById("roomfaci/" + key).value;
        var roomPrice = document.getElementById("roomprice/" + key).value;
        var roomImage = document.getElementById("roomimage/" + key).files[0];
        var copy = this.state.rooms[this.state.activeHotel];
        var roomImageCopy = copy[key].image
        if (roomImage) {
            alert("A intrat pe room")
            const name = this.state.activeHotel + "/" + key;
            const ref = fire.storage().ref("/rooms");
            const metadata = { contentType: roomImage.type };
            const task = ref.child(name).put(roomImage, metadata);
            task
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                    console.log(url);
                    this.setState({ currentImageRoom: url })

                }).then(() => {
                    fire.database().ref('rooms/' + this.state.activeHotel + "/" + key).set({
                        name: roomName,
                        description: roomDesc,
                        facilities: roomFaci,
                        price: roomPrice,
                        image: this.state.currentImageRoom
                    });
                })
        } else {
            fire.database().ref('rooms/' + this.state.activeHotel + "/" + key).set({
                name: roomName,
                description: roomDesc,
                facilities: roomFaci,
                price: roomPrice,
                image: roomImageCopy
            });
        }
    }
    containerRooms() {
        let table = [];
        if (this.state.hotelChange == true) {
           
            // var rooms = _.values(this.state.rooms)
            var rooms = this.state.rooms[this.state.activeHotel];
            for(let i=0;i<rooms.length;i++){
                table.push(
                    <div className="roomContainer">
                        <h6>Room number: {i} </h6>
                        <label>Name:</label>
                        <input type="text" placeholder={rooms[i].name} id={"roomname/" + i} /><br />
                        <label>Description:</label>
                        <textarea type="text" placeholder={rooms[i].description} id={"roomdesc/" + i} className="textareaEdit"></textarea><br />
                        <label>Facilities:</label>                        
                        <input type="text" placeholder={rooms[i].facilities} id={"roomfaci/" + i} /><br />
                        <label>Price:</label>                        
                        <input type="text" placeholder={rooms[i].price} id={"roomprice/" + i} /><br />
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
                                {this.showBtn(this.state.activeHotel)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

export default GestHotel;
