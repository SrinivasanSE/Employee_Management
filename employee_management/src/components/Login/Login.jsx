import React, { Component } from 'react'
import LayoutWrapper from "../Navbar/Navbar";
import "./login.css";
import { setItem } from "../../helpers/auth";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('/authenticate_user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(result => result.json())
            .then(res => {
                if (res.msg === "email doesn't exist" || res.msg === "Wrong password") {
                    alert(res.msg);
                }
                else if (res.msg === "User is authenticated") {
                    setItem("isLoggedIn", true);
                    window.location.href = "/dashboard"
                }

            }).catch((err) => console.log(err))
    }

    render() {
        return (
            <LayoutWrapper isLoggedIn={false}>
                <div className="login_container">
                    <div className="login_content">
                        <h3 className="login_text">Login</h3>
                        <form className="login_form" onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <label className="label_color">Email address</label>
                                <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleInput} />
                            </div>
                            <div className="form-group">
                                <label className="label_color">Password</label>
                                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleInput} />
                            </div>
                            <div className="text-center" >
                                <button type="submit" className="btn btn-primary">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </LayoutWrapper>
        )
    }
}
