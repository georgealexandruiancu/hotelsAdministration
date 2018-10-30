import React, { Component } from 'react';
import fire from './../config/Fire'


export const saveHistory = (manager, hotel, action) => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    manager = manager.toString();
    fire.database().ref("/history").push({
        manager: manager,
        hotel: hotel,
        action: action,
        date: today
    });
}