import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import LogInManager from './managers/logIn';
import ManagerDashboard from "./managers/manage";
import CreateHotel from "./managers/createHotel";
import GestHotel from "./managers/gestHotel";

export default () =>
(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={LogInManager} />
            <Route path="/LogInManager" component={LogInManager}></Route>
            <Route path="/ManagerDashboard" component={ManagerDashboard}></Route>
            <Route path="/CreateHotel" component={CreateHotel}></Route>
            <Route path="/GestHotel" component={GestHotel}></Route>
        </div>
    </BrowserRouter>
)