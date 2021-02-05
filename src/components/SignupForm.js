import React, {Component} from "react";
import validator from 'validator';
import {Redirect} from "react-router-dom";

import NavBar from "./NavBar";

class SignupForm extends Component {

    userData;

    constructor(props){
        super(props);
        this.state = {
            name: "",
            phone: "",
            mail: "",
            password: "",
            confirm_password: "",
            isTypedPassword: false,
            error: false,
        }
    }
    handleUsername = e => {
        let validate_name = e.target.value;
        this.setState({
            name: validate_name.trim(),
        });
    }
    handleUsernumber = e => {
        let phone_numer = e.target.value;
        this.setState({
            phone: phone_numer.trim(),
        });
    }
    handleUsermail = e => {
        this.setState({
            mail: e.target.value,
        });
    }
    handlePassword = e => {
        this.setState({
            password: e.target.value,
            isTypedPassword:true,
        });
    }
    handlePassword2 = e => {
        this.setState({
            confirm_password: e.target.value,
           
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        //password validation before submitting 
        const password_validator = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let pwd = this.state.password.match(password_validator);
        let confirm_pwd = this.state.confirm_password.match(password_validator);

        if (this.state.name !== '' && this.state.password !== ''){
            if (validator.isMobilePhone(this.state.phone) && this.state.phone.length > 9 && pwd.input === confirm_pwd.input){
                this.props.history.push("/login");
                localStorage.setItem('user', JSON.stringify(this.state));
            }else{
                this.setState({
                    error: true,
                })
            }
        }else {
            alert("Please provide credentials for sign up.");
        }
    }

    render(){
        const password_validator = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return(
            <>
            <NavBar />
            <div className="form">
            {
                this.state.error
                ? <p className="error-message">Please check your details.</p>
                : null
            }
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="username" onChange={this.handleUsername} required/><br/>
                    {
                        this.state.name === null ? <p className="error-message">Please Provide any name</p> : null
                     }
                    <input type="text" placeholder="Phone number" onChange={this.handleUsernumber} required/><br/>
                    {
                        validator.isEmpty(this.state.phone)? null 
                        : validator.isMobilePhone(this.state.phone)
                        ? this.state.phone.length > 9 
                        ? null
                        : <p className="error-message">Minimum 10 digit</p>
                        : <p className="error-message">Error with type</p>
                    }
                    <input type="email" placeholder="email" onChange={this.handleUsermail} required/><br/>
                    {
                        validator.isEmpty(this.state.mail) ? null 
                        : validator.isEmail(this.state.mail) ?  null 
                        : <p className="error-message">Please provide a valid Email.</p> 
                    }
                    <input type="password" placeholder="password"  onChange={this.handlePassword} required/><br/>
                        
                    {   
                        validator.isEmpty(this.state.password) ? null 
                        : this.state.password.match(password_validator) ? null 
                        : <p className="error-message">Password must be minimum 8 character <br/>(one Number, special character, uppercase, lowercase)</p>
                    }
                    <input type="password" placeholder="confirm password" onChange={this.handlePassword2} required/><br/>
                    {
                        validator.isEmpty(this.state.confirm_password) 
                        ? null
                        : this.state.confirm_password.match(password_validator)
                        ? null
                        : <p className="error-message">Password must be minimum 8 character <br/>(one Number, special character, uppercase, lowercase)</p>
                    }

                    <button type="submit">Sign up</button>
                </form>
            </div>
            </>
        )
    }
}

export default SignupForm;