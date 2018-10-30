import React, { Component } from 'react';
import fire from './../config/Fire';
import "./../clients/style.css";
import _ from 'lodash';
import { Link } from 'react-router-dom';
class CardHotels extends Component {
    constructor(props) {
        super(props);
        this.state = {
           hotels: "",
           allOk: false
        }
       this.showCards = this.showCards.bind(this);
       this.getHotels = this.getHotels.bind(this);
       this.goToDetails = this.goToDetails.bind(this);

    }
    componentWillMount(){
        this.getHotels();
    }
    goToDetails(name){
        window.location = '/Travelissimo/Client/HotelDetails/'+name;
    }
   getHotels(){
       fire.database().ref('/hotels').on("value", (snapshot)=>{
            var hotels = _.values(snapshot.val());
            this.setState({hotels: hotels, allOk: true});
       });
   }
   showCards(){
       var table=[];
        if(this.state.allOk === true){
            var hotels = this.state.hotels;
            console.log(hotels);
            for(let i=0;i<hotels.length;i++){
                table.push(
                    <div className="col-md-4 card-hotel" key={"hotel"+i}>
                        <div className="card-hotel">
                            <img src={hotels[i].image} />
                            <div className="hotel-preview">
                                <div className="title">
                                        {hotels[i].title}
                                        </div>
                                <div className="lineDiv"></div>
                                
                                <button className="btn btn-primary pos-abs" onClick={this.goToDetails.bind(this,hotels[i].title)}>View More</button>
                            </div>
                        </div>
                    </div>
                )
            }
            return table;
        }else{
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

export default CardHotels;
