import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import "./App.css";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Home2 from "./components/home2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  render() {
    var Login = localStorage.getItem("isLoggedIn");
    console.log(Login);
    var user = localStorage.getItem("user");
    return (
      <div className="App container">
        {Login ? (
          <Redirect to={{ pathname: "/home" }} />
        ) : user === null || user !== null ? (
          Login ? (
            <Redirect to={{ pathname: "/login" }} />
          ) : null
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )}
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/home2" component={Home2} />
          <Route path="/login" component={LoginForm} />
          <Route path="*" component={() => <h1>404 not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
