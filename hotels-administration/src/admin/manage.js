import React, { Component } from 'react';
import './../admin/style.css';
import fire from './../config/Fire';
import _ from 'lodash';

class Manage extends Component {
    constructor(props) {

        super(props)
        this.state = {
            currentEmailUser: "",
            managerEmail: "",
            managerPass: "",
            managers: "",
            managersKeys: ""
        }
        this.getCredentials = this.getCredentials.bind(this);
        this.emailManager = this.emailManager.bind(this);
        this.passManager = this.passManager.bind(this);
        this.createManager = this.createManager.bind(this);
        this.getManagers = this.getManagers.bind(this);
        this.logout = this.logout.bind(this);
        this.deleteManager = this.deleteManager.bind(this);
        this.checkConnection = this.checkConnection.bind(this);

    }
    componentWillMount(){
        this.getManagers();
        this.checkConnection();
    }
    componentDidMount(){
        this.getCredentials();
        // this.getManagers();
    }
    getCredentials(){
        var This = this;
        fire.auth().onAuthStateChanged(function(user){
            if(user){
                This.setState({currentEmailUser: user.email });
                console.log(This.state);
            }
        });
    }
    getManagers(){
        var This = this;
        fire.database().ref("/managers").once('value').then(function(snap){
            var partialObj = _.values(snap.val());
            console.log(partialObj);
            if(partialObj.length != 0){
                var keys = Object.keys(snap.val());
                console.log(keys);
                This.setState({managers: partialObj, managersKeys: keys});
            }
        })
    }
    checkConnection() {
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
            } else {
                alert("You must be logged in");
                window.location = "/LogInAdmin";
            }
        });
    }
    ManagerTable = () => {
        let table = [];
        for (let i = 0; i < this.state.managers.length; i++) {
            table.push(
                <div className="listManagers" key={this.state.managersKeys[i]}>
                    {this.state.managers[i].email}
                    <div className="buttonsActions">
                        <i className="fas fa-trash-alt" onClick={(e) => this.deleteManager(e, this.state.managersKeys[i])}></i>
                        <i className="fas fa-wrench"></i>
                    </div>
                </div>
            )
        }
        return table;
    }
    deleteManager(e, key) {
        e.preventDefault();
        console.log(key);
        
        alert("Are you sure to delete this ?");

        fire.database().ref('/managers').child(key).remove()
        .then(alert("works"))
        .catch((err) => {
            console.log(err)
        })

        this.getManagers();
    }
    emailManager(e){
        this.setState({ managerEmail: e.target.value })
    }
    passManager(e){
        this.setState({ managerPass: e.target.value })
    }
    createManager(){
        var This = this;
        fire.auth().onAuthStateChanged(function(user){
            if(user){
                fire.auth().createUserWithEmailAndPassword(This.state.managerEmail, This.state.managerPass).then((u)=>{
                    alert("Manager is success");
                }).then(()=>{
                    fire.database().ref("/managers").push({
                        email: This.state.managerEmail
                    })
                })
            }   
        })
        // var serviceAccount = adminKey;
        // admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount),
        //     databaseURL: "https://hotelsadministration.firebaseio.com"
        // });
        // admin.auth().createUser({
        //     email: This.state.managerEmail,
        //     emailVerified: false,
        //     password: This.state.managerPass,
        //     disabled: false
        // })
        // .then(function (userRecord) {
        //         // See the UserRecord reference doc for the contents of userRecord.
        //         console.log("Successfully created new user:", userRecord.uid);
        // })
        // .catch(function (error) {
        //         console.log("Error creating new user:", error);
        // });
    }
    logout(){
        fire.auth().signOut();
        window.location = "/LogInAdmin";
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                <h5>Hi, {this.state.currentEmailUser}</h5>  
                                <button className="btn btn-danger" onClick={this.logout}>LOG OUT!!</button>
                            </center>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <center>
                                <h5>Create an Manager Profile</h5>
                                <p>Please insert the email</p>
                                <input type="email" className="form-control" style={{width: 320+"px"}} onChange={this.emailManager} value={this.state.managerEmail} />
                                <br/>
                                <p>Please insert the password</p>
                                <input type="password" className="form-control" style={{ width: 320 + "px" }} onChange={this.passManager} value={this.state.managerPass} />
                                <br/>
                                <button className="btn btn-primary" style={{marginTop: 50+"px"}} onClick={this.createManager}>Create manager</button>
                            </center>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <h2>Manager List</h2>
                            {this.ManagerTable()}
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Manage;
