
import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire'
import _ from 'lodash';

class GetHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetch: false,
            history: "",
            activeManager: ""
        }
        this.checkConnection = this.checkConnection.bind(this);
    }
    componentWillMount(){
        this.checkConnection();
    }
    checkConnection() {
        var This = this;

        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                This.setState({ activeManager: user.email}, () => {This.getHistory()});
            } else {
                alert("You must be logged in");
                window.location = "/LogInManager";
            }
        });
    }
    getHistory(){

        fire.database().ref("/history/").orderByChild('manager').equalTo(this.state.activeManager).once('value', (snapshot) => {
            let historyArr = _.values(snapshot.val());
            this.setState({ history: historyArr, fetch: true });

        }); 
    }
    pushHistory(){
        let table = [];
        if(this.state.fetch === true){
            console.log(this.state)
            for (let i = this.state.history.length-1;i > 0; --i){
                table.push(
                    <div class="alert alert-primary" role="alert">
                        {this.state.history[i].date} - {this.state.history[i].hotel} - {this.state.history[i].action}
                    </div>
                );
            }
            return table;
        }else{
            return(<p>Loading, please wait!...</p>);
        }
    }
    render() {
        return (
            <div>
                {this.pushHistory()}
            </div> 
        );
    }
}

export default GetHistory;
