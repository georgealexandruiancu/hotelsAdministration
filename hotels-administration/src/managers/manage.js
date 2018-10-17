import React, { Component } from 'react';
import './../managers/style.css';
import fire from './../config/Fire'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
   const RouterPage = () =>{
       <Router>
           <div className="fancyNav" id="fancyNav">
               <div className="user">
                   MANGER1@test.com
                    </div>
               <div className="commnadList">
                   <li>
                       <Link to="/managerDashboard">
                       <i class="fas fa-tachometer-alt iconsMenu"></i>
                       <div className="textMenu">DASHBOARD</div>
                       </Link>
                   </li>
                   <li>
                       <Link to="/gestHotel">
                       <i class="fas fa-chart-pie iconsMenu"></i>
                       <div className="textMenu">GEST HOTEL</div>
                       </Link>
                   </li>
                   <li>
                       <Link to="/createHotel">
                       <i class="fas fa-plus-square iconsMenu"></i>
                       <div className="textMenu">CREATE HOTELS</div>
                       </Link>
                   </li>
               </div>
               <Route exact path="/managerDashboard" component={Manager} />
               <Route path="/gestHotel" component={GestHotel} />
               <Route path="/createHotel" component={CreateHotel} />
           </div>
       </Router>
   }
    render() {
        return (
            <div>
               
            </div>
        );
    }
   
}

export default ManagerDashboard;
