import React, {Component} from "react";
import NavBar from "./NavBar";
import validator from "validator";
import {Redirect, Route} from "react-router-dom";

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            password: "",
            validate_name: "",
            validate_password: '',
            error: false,
            error2: false,
        }
    }
    handleUsername = e =>{
        this.setState({
            name: e.target.value,
        });
    }
    handlePassword = e => {
        this.setState({
            password: e.target.value,
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        var user_details = JSON.parse(localStorage.getItem('user'));
        if (user_details === null){
            this.setState({
                error: true,
            });
            <Redirect to={{pathname: "/login"}} />
        }else{
            if (this.state.name.length === 0 && this.state.password.length === 0)
                {
                    this.setState({
                    error2: true,
                    })
                }
            else{
                    if (this.state.name === user_details.name && this.state.password === user_details.password)
                    {
                        this.props.history.push("/home")
                        return  localStorage.setItem('isLoggedIn', true);
                    }
                    else{
                            <Redirect to={{pathname: "/login"}} />
                            this.setState({
                                error2: true,
                            })
                        }
            }   
    }
}
    render(){
        var userData = JSON.parse(localStorage.getItem('user'));
        return(
            <>
            <NavBar />
            <div className="form p-5">
            <h1>Welcome to Login..</h1>
            {
                this.state.error
                ? <p className="error-message">Sorry we dont' have any user like this.</p>
                : null
            }
            {
                this.state.error2
                ? <p className="error-message">Sorry wrong username and password</p>
                : null
            }
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="username" onChange={this.handleUsername}/><br/>
                    {
                      validator.isEmpty(this.state.name) 
                        ? null 
                        : userData === null 
                            ? <p className="error-message">username is not available</p>
                            : null             
                    }
                    <input type="password" placeholder="password"  onChange={this.handlePassword} /><br/>
                    {
                      validator.isEmpty(this.state.password) 
                        ? null 
                        : userData === null 
                            ? <p className="error-message">password is not available</p>
                            :null              
                    }
                    <button type="submit" >Log In</button>
                </form>
            </div>
            </>
        )
    }
}

export default LoginForm;