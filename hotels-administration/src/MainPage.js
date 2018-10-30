import React, { Component } from 'react';
import fire from './config/Fire';
import _ from 'lodash';
import { Link } from 'react-router-dom';
class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: "",
            fetched: false
        }
        this.getData = this.getData.bind(this);
        this.logInClient = this.logInClient.bind(this);
        this.signUpClient = this.signUpClient.bind(this);
        this.logInManager = this.logInManager.bind(this);

    }
    componentWillMount(){
        this.getData();
    }
    logInClient(){
        window.location = '/Travelissimo/LogInClient';
    }
    signUpClient() {
        window.location = '/Travelissimo/signUpClient';
    }
    logInManager() {
        window.location = '/LogInManger';
    }
    getData(){
        fire.database().ref('/hotels').once("value", (snapshot)=>{
            let hotels = _.values(snapshot.val());
            this.setState({hotels: hotels, fetched: true});
        })
    }
    showImgs(){
        var table = [];
        if(this.state.fetched === true){
            for(let i=0;i<this.state.hotels.length;i++){
                if(i===0){
                    table.push(
                        <div className="carousel-item active" key={i}>
                            <img className="d-block w-100 " src={this.state.hotels[0].image}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{this.state.hotels[0].title}</h5>
                            </div>
                        </div>
                    );
                }else{
                    table.push(
                        <div className="carousel-item" key={i}>
                            <img className="d-block w-100" src={this.state.hotels[i].image} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{this.state.hotels[i].title}</h5>
                            </div>
                        </div>
                    )
                }
               
            }
            return table;
        }else{
            table.push(
                <center>
                    <div class="loader"></div>
                </center>
            );
            return table;
        }
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
                <div className="container-fluid carouselHolder">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                                {this.showImgs()}
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt-100">
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <center>
                                        <button onClick={this.logInClient} className="btn btn-primary">Log In As Client</button>
                                    </center>
                                </div>
                                <div className="col-md-6">
                                    <center>
                                        <button onClick={this.signUpClient} className="btn btn-danger">Sign Up As Client</button>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pos-abs-right">
                    <button onClick={this.logInManager} className="btn btn-danger">Log In As Manager</button>
                </div>
            </div>
            );
    }
}

export default MainPage;
