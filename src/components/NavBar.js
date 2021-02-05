import React, {Component} from "react";
import {Link} from 'react-router-dom';


class NavBar extends Component {
render(){
    return(
        <div className="header row">
                <div className="Logo col-sm-3">
                     [logo]
                </div>
                 <div className="Nav col-sm-9">
                    <nav>
                        <ul>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign up</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
    )
}
}

export default NavBar;