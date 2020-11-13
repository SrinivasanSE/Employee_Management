import React, { Component } from 'react'

export default class Login extends Component {

    componentDidMount() {
        fetch('http://localhost:5000/getemployees', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(result => result.json())
            .then(item => console.log(item))
    }
    render() {
        return (
            <div>
                Dashboard
            </div>
        )
    }
}
