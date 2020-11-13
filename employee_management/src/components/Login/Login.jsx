import React, { Component } from 'react'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <div>
                Login
            </div>
        )
    }
}
