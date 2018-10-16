import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import SignUpAdmin from './admin/signUp';

import LogInAdmin from './admin/logIn';
import LogInManager from './managers/logIn';


import ManagerAdmin from './admin/manage';
import ManagerDashboard from "./managers/manage";
export default () =>
(
    <BrowserRouter>
        <div>
            <Route path="/LogInAdmin" component={LogInAdmin}></Route>
            <Route path="/SignUpAdmin" component={SignUpAdmin}></Route>
            <Route path="/ManagerAdmin" component={ManagerAdmin}></Route>
            <Route path="/LogInManager" component={LogInManager}></Route>
            <Route path="/ManagerDashboard" component={ManagerDashboard}></Route>
        </div>
    </BrowserRouter>
)