import React, { Component } from 'react';
import LayoutWrapper from "../Navbar/Navbar";
import "./dashboard.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            allEmployees: [],
        }
    }

    componentDidMount() {
        fetch('/getemployees', {
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
            <LayoutWrapper>
                <div className="container dashboard_content" >
                    <div className="text-center mb-4">
                        <a href="/employee/add" className="btn btn-outline-primary">Add employee <HiUserAdd /></a>
                    </div>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Mobile No</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>19/07/2020</td>
                                <td>7092104848</td>
                                <td><span className="mr-5"><FaEdit /></span></td>
                                <td><MdDelete /></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>19/07/2020</td>
                                <td>7092104848</td>
                                <td><Link className="edit_button mr-5" to="/employee/edit"><FaEdit /></Link></td>
                                <td><Link className="delete_button" to="/employee/delete"><MdDelete /></Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </LayoutWrapper>
        )
    }
}
