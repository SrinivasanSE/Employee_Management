import React, { Component } from 'react'

export default class AddEmployee extends Component {

    componentDidMount() {
        const ajaxRequestHeaders = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        });
        let body = {
            method: 'POST',
            headers: ajaxRequestHeaders,
            body: JSON.stringify({
                emp_id: "1",
                name: "srinivasan",
                gender: "Male",
                address: "tcs chennai",
                mobile: "8278738437"
            })
        }
        fetch("/add_employee", body).then((res) => res.json()).then((res) => console.log(res))
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
