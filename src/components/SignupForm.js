import React, { Component } from "react";
import validator from "validator";
import { Redirect } from "react-router-dom";

import NavBar from "./NavBar";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      mail: "",
      password: "",
      confirm_password: "",
      isTypedPassword: false,
      error: false,
    };
  }
  handleUsername = (e) => {
    let validate_name = e.target.value;
    this.setState({
      name: validate_name.trim(),
    });
  };
  handleUsernumber = (e) => {
    let phone_numer = e.target.value;
    this.setState({
      phone: phone_numer.trim(),
    });
  };
  handleUsermail = (e) => {
    this.setState({
      mail: e.target.value,
    });
  };
  handlePassword = (e) => {
    let pwd = e.target.value;
    this.setState({
      password: pwd.trim(),
      isTypedPassword: true,
    });
  };
  handlePassword2 = (e) => {
    let con_pwd = e.target.value;
    this.setState({
      confirm_password: con_pwd.trim(),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //password validation before submitting
    const password_validator = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const phone_validator = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    let phno = this.state.phone.match(phone_validator);
    let pwd = this.state.password.match(password_validator);
    let confirm_pwd = this.state.confirm_password.match(password_validator);
    console.log(phno);
    console.log(pwd);
    console.log(confirm_pwd);
    if (pwd === null || confirm_pwd === null || phno === null) {
      this.setState({
        error: true,
      });
    } else {
      if (pwd.input === confirm_pwd.input) {
        this.setState({
          error: false,
        });
        localStorage.setItem("user", JSON.stringify(this.state));
        this.props.history.push("/login");
      } else {
        this.setState({
          error: true,
        });
      }
    }
  };

  render() {
    const password_validator = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const phone_validator = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return (
      <>
        <NavBar />
        <div className="form">
          {this.state.error ? (
            <p className="error-message">Please check your details.</p>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="username"
              onChange={this.handleUsername}
              required
            />
            <br />
            {this.state.name === null ? (
              <p className="error-message">Please Provide any name</p>
            ) : null}
            <input
              type="text"
              placeholder="Phone number"
              onChange={this.handleUsernumber}
              required
            />
            <br />
            {validator.isEmpty(
              this.state.phone
            ) ? null : this.state.phone.match(phone_validator) ? null : (
              <p className="error-message">
                Please enter the valid 10 digit mobile number
              </p>
            )}
            <input
              type="email"
              placeholder="email"
              onChange={this.handleUsermail}
              required
            />
            <br />
            {validator.isEmpty(this.state.mail) ? null : validator.isEmail(
                this.state.mail
              ) ? null : (
              <p className="error-message">Please provide a valid Email.</p>
            )}
            <input
              type="password"
              placeholder="password"
              onChange={this.handlePassword}
              required
            />
            <br />

            {validator.isEmpty(
              this.state.password
            ) ? null : this.state.password.match(password_validator) ? null : (
              <p className="error-message">
                Password must be minimum 8 character <br />
                (one Number, special character, uppercase, lowercase)
              </p>
            )}
            <input
              type="password"
              placeholder="confirm password"
              onChange={this.handlePassword2}
              required
            />
            <br />
            {validator.isEmpty(
              this.state.confirm_password
            ) ? null : this.state.confirm_password.match(
                password_validator
              ) ? null : (
              <p className="error-message">
                Password must be minimum 8 character <br />
                (one Number, special character, uppercase, lowercase)
              </p>
            )}

            <button type="submit">Sign up</button>
          </form>
        </div>
      </>
    );
  }
}

export default SignupForm;
