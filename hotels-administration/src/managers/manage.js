import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire'
import { Link } from 'react-router-dom';
class ManagerDashboard extends Component {
   constructor(props){
       super(props);
       this.logout = this.logout.bind(this);
       this.checkNavBar = this.checkNavBar.bind(this);
       this.state ={
           navBarOpen: true
       }
   }
   componentDidMount(){
       this.checkNavBar();
   }
   logout(){
       fire.auth().signOut();
       window.location = "/LogInManager";
   }
   checkNavBar(){
       var This = this
       if(This.state.navBarOpen === true)
       {

       }else{

       }   
   }

    render() {
        return (
            <div>
                <div className="fancyNav" id="fancyNav">
                    <div className="btnMenu" id="btnMenu" onClick={this.checkNavBar()}>
                        <i class="fas fa-bars fa-2x"></i>
                    </div>
                    <div className="user">
                        MANGER1@test.com
                    </div>
                    <div className="commnadList">
                        <li>
                            <i class="fas fa-tachometer-alt iconsMenu"></i> 
                            <div className="textMenu">DASHBOARD</div>
                        </li>
                        <li>
                            <i class="fas fa-chart-pie iconsMenu"></i> 
                            <div className="textMenu">GEST HOTEL</div>
                        </li>
                        <li>
                            <i class="fas fa-plus-square iconsMenu"></i> 
                            <div className="textMenu">CREATE HOTELS</div>
                        </li>
                    </div>
               </div>
            </div>
        );
    }
   
}

export default ManagerDashboard;
