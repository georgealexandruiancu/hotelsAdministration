import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import LogInManager from './managers/logIn';
import LogInClient from './clients/logIn';
import SignUpClient from './clients/signUp';
import ManagerDashboard from "./managers/dashboard";
import ClientDashboard from "./clients/dashboard";
import HotelDetails from "./clients/hotelDetails";
import CreateHotel from "./managers/createHotel";
import GestHotel from "./managers/gestHotel";
import MainPage from "./MainPage";

export default () =>
(
    <BrowserRouter>
        <div>
            <Route exact path="/Travelissimo" component={MainPage} />
            <Route path="/Travelissimo/LogInClient" component={LogInClient}></Route>         
            <Route path="/Travelissimo/SignUpClient" component={SignUpClient}></Route>
            <Route path="/Travelissimo/Client/Dashboard" component={ClientDashboard}></Route>
            <Route path="/Travelissimo/Client/HotelDetails/:hotelname" component={HotelDetails}></Route>            
            <Route path="/LogInManager" component={LogInManager}></Route>
            <Route path="/ManagerDashboard" component={ManagerDashboard}></Route>
            <Route path="/CreateHotel" component={CreateHotel}></Route>
            <Route path="/GestHotel" component={GestHotel}></Route>
        </div>
    </BrowserRouter>
)