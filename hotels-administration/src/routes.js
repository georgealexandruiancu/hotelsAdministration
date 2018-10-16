import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import LogInAdmin from './admin/logIn';
import SignUpAdmin from './admin/signUp';
import ManagerAdmin from './admin/manage';

export default () =>
(
    <BrowserRouter>
        <div>
        <Route path="/LogInAdmin" component={LogInAdmin}></Route>
        <Route path="/SignUpAdmin" component={SignUpAdmin}></Route>
        <Route path="/ManagerAdmin" component={ManagerAdmin}></Route>
        </div>
    </BrowserRouter>
)