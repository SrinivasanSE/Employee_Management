import React, { Component } from 'react';
import LayoutWrapper from "../Navbar/Navbar";
import "./dashboard.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { isUserAuthenticated } from '../../helpers/auth';
export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            allEmployees: [],
            show: false,
            filter: {
                id: false,
                name: false,
                location: false,
                age: false,
            },
            filterValues: {
                id: '',
                name: '',
                location: '',
                age: '',
            },
            showFilterModal: false,
            fields: [],
        }
    }

    componentDidMount() {
        fetch('/show_employee', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(result => result.json())
            .then(item => console.log(item))
    }

    handleModal = () => {
        this.setState({ show: !this.state.show })
    }

    handleFilterModal = () => {
        this.setState({ showFilterModal: !this.state.showFilterModal })
    }

    handleDelete = () => {

    }

    handleFilterValues = (e) => {
        let filterValues = this.state.filterValues;
        filterValues[e.target.name] = e.target.value;
        this.setState({
            filterValues: { ...filterValues }
        })
    }


    handleCheckbox = (e) => {
        let filter = this.state.filter;
        filter[e.target.name] = e.target.checked;
        let filterValues = this.state.filterValues;
        if (!e.target.checked) {
            filterValues[e.target.name] = "";
        }
        this.setState({ filter: { ...filter }, filterValues: { ...filterValues } })

    }
    render() {
        return (
            <LayoutWrapper isLoggedIn={isUserAuthenticated()}>
                <div className="container dashboard_content" >
                    <div className="d-flex justify-content-between mb-4">
                        <Link to="/employee/add" className="btn btn-outline-primary">Add employee <HiUserAdd /></Link>
                        <button className="btn btn-primary" onClick={this.handleFilterModal}>Filter</button>
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
                                <th scope="col">Action</th>

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
                                <td><span className="mr-5"><FaEdit /></span><MdDelete /></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>19/07/2020</td>
                                <td>7092104848</td>
                                <td><Link className="edit_button mr-5" to="/employee/edit"><FaEdit /></Link><span onClick={() => this.handleModal()} className="delete_button" to="/employee/delete"><MdDelete /></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Modal show={this.state.show} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete?</Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-outline-secondary" onClick={this.handleDelete}>Delete</button>
                        <button className="btn btn-primary" onClick={this.handleModal}>Cancel</button>
                    </Modal.Footer>
                </Modal>
                <Modal size="md" show={this.state.showFilterModal} onHide={this.handleFilterModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter Employees</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-2">Filter by</div>
                        <div>
                            <div>
                                <label>
                                    <input type="checkbox" name="id" checked={this.state.filter.id} onChange={this.handleCheckbox} />
                                    <span className="ml-2">Employee Id</span>
                                </label>
                                {this.state.filter.id && (
                                    <input type="text" name="id" value={this.state.filterValues.id} className="form-control" onChange={this.handleFilterValues} placeholder="Enter id..." />)}
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="name" checked={this.state.filter.name} onChange={this.handleCheckbox} />
                                    <span className="ml-2">Name</span>
                                </label>
                                {this.state.filter.name && (
                                    <input type="text" name="name" value={this.state.filterValues.name} className="form-control" onChange={this.handleFilterValues} placeholder="Enter name..." />)}
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="location" checked={this.state.filter.location} onChange={this.handleCheckbox} />
                                    <span className="ml-2">Location</span>
                                </label>
                                {this.state.filter.location && (
                                    <input type="text" name="location" value={this.state.filterValues.location} className="form-control" onChange={this.handleFilterValues} placeholder="Enter city,state..." />)}
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="age" checked={this.state.filter.age} onChange={this.handleCheckbox} />
                                    <span className="ml-2">Age</span>
                                </label>
                                {this.state.filter.age && (
                                    <input type="Number" name="age" min="1" value={this.state.filterValues.age} className="form-control" onChange={this.handleFilterValues} placeholder="Enter age in number..." />)}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.handleDelete}>Filter</button>
                        <button className="btn btn-outline-secondary" onClick={this.handleFilterModal}>Cancel</button>
                    </Modal.Footer>
                </Modal>
            </LayoutWrapper>
        )
    }
}
