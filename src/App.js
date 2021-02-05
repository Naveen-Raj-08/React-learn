import React,{ Component } from "react";
import {Route, Redirect} from "react-router-dom";

import './App.css';
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Home2 from "./components/home2";

class App extends Component{
    constructor(props){
      super(props);
      this.state ={
        username: "",
        password: "",
        redirect: '/home',
      }
    }

    handleRoute = () => {

    }

  render(){
    var Login =  localStorage.getItem('isLoggedIn');
  return (
    <div className="App container">
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home2" component={Home2} />
      <Route path="/login" component={LoginForm} />
      {
        Login === null
        ? null
        : Login 
          ? <Redirect to={this.state.redirect}/> 
          : <Redirect to={{pathname: "/login"}} />
      }
      
    
    </div>
  );
}
}

export default App;
