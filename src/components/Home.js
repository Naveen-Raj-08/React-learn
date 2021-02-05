import React, {Component} from "react";
import {Redirect} from "react-router-dom";


class Home extends Component {

    handleLogout = () => {
        var login = localStorage.removeItem('isLoggedIn');
        if (login) {
            <Redirect to={{pathname: "/home"}} />
        }else{
            this.props.history.push("/login")
        }
    }
    handleHome2 = () => {
        this.props.history.push("/home2");
    }
    render(){
        return(
            <div>
                <h1>Welcome to Home..!</h1>
                <button onClick={this.handleHome2} className="btn btn-secondary">For Home 2</button>
                <br/>
                <br/>
                <button onClick={this.handleLogout} className="btn btn-primary" type="button" >Logout</button>
            </div>
        )
    }
}

export class Home2 extends Component{

}

export default Home;