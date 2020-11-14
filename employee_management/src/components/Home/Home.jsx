import React, { Component } from "react";
import LayoutWrapper from "../Navbar/Navbar";
import "./home.css";
import { Link } from "react-router-dom"

class Home extends Component {
    render() {
        return (

            <LayoutWrapper>
                <div className="main-content_home">
                    <div>
                        <h1>Welcome User!</h1>
                        <div className="text-center">
                            <p>Login to Continue</p>
                            <Link className="btn btn-outline-primary text-center" to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </LayoutWrapper>

        )
    }
}

export default Home;