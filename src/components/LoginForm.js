import React, { Component } from "react";
import NavBar from "./NavBar";
import validator from "validator";
import { Redirect, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      validate_name: "",
      validate_password: "",
      null_error: false,
      wrong_name_pwd: false,
    };
  }
  handleUsername = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var user_details = JSON.parse(localStorage.getItem("user"));
    if (user_details === null) {
      this.setState({
        null_error: true,
      });
      if (this.state.name.length === 0 && this.state.password.length === 0) {
        this.setState({
          null_error: true,
          wrong_name_pwd: false,
        });
      } else {
        this.setState({
          null_error: false,
          wrong_name_pwd: true,
        });
      }
    } else {
      this.setState({
        null_error: false,
      });
      if (this.state.name.length === 0 && this.state.password.length === 0) {
        this.setState({
          wrong_name_pwd: true,
        });
      } else {
        if (
          this.state.name === user_details.name &&
          this.state.password === user_details.password
        ) {
          this.setState({
            wrong_name_pwd: false,
          });
          localStorage.setItem("isLoggedIn", true);
          this.props.history.push("/home");
        } else {
          <Redirect to={{ pathname: "/login" }} />;
          this.setState({
            wrong_name_pwd: true,
          });
        }
      }
    }
  };
  render() {
    var userData = JSON.parse(localStorage.getItem("user"));
    return (
      <>
        <NavBar />
        <div className="form p-5">
          <h1>Welcome to Login..</h1>
          {this.state.null_error ? (
            <p className="error-message">Sorry please signup</p>
          ) : null}
          {this.state.wrong_name_pwd ? (
            <p className="error-message">Username and password wrong</p>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="username"
              onChange={this.handleUsername}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              onChange={this.handlePassword}
            />
            <br />
            <button type="submit">Log In</button>
          </form>
        </div>
      </>
    );
  }
}

export default LoginForm;
