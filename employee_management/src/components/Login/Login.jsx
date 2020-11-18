import React, { Component } from 'react'
import LayoutWrapper from "../Navbar/Navbar";
import "./login.css";
import { setItem } from "../../helpers/auth";
import swal from 'sweetalert';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {

            }
        }
    }

    handleInput = (e) => {
        let errors = this.state.errors;
        if (this.state.email) {
            errors["email"] = ""
        }
        if (this.state.password) {
            errors["password"] = ""
        }
        this.setState({
            [e.target.name]: e.target.value,
            errors: { ...errors }
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        let errors = this.state.errors;
        if (this.state.email) {
            const isValid = validateEmail(this.state.email);
            if (!isValid) {
                errors["email"] = "Enter valid email id"
            }
        }
        else {
            errors["email"] = "email id is required"
        }
        if (!this.state.password) {
            errors["password"] = "password is required"
        }
        if (errors.email || errors.password) {
            this.setState({ errors: { ...errors } });
            return;
        }
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
                if (res.msg === "User is authenticated") {
                    setItem("isLoggedIn", true);
                    window.location.href = "/dashboard"
                }
                else {
                    swal("Error!", res.msg, "error");

                }

            }).catch((err) => { })
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
                                {this.state.errors.email && (<span className="text-danger">{this.state.errors.email}</span>)}
                            </div>
                            <div className="form-group">
                                <label className="label_color">Password</label>
                                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleInput} />
                                {this.state.errors.password && (<span className="text-danger">{this.state.errors.password}</span>)}
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
