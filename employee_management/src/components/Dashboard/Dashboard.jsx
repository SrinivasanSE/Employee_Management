import React, { Component } from 'react';
import LayoutWrapper from "../Navbar/Navbar";
import "./dashboard.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdClear } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { isUserAuthenticated } from '../../helpers/auth';
import swal from 'sweetalert';
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
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
            deleteId: '',
            filterErrors: {
                id: '',
                name: '',
                location: '',
                age: '',

            },
            loading: false,
            showDetailModal: false,
            employeeDetails: {

            }
        }
    }

    getAllEmployees = () => {
        this.setState({ loading: true })
        fetch('/get_all_employees', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(result => result.json())
            .then(res => {
                this.setState({ allEmployees: res.data })
                setTimeout(() => this.setState({ loading: false }), 3000)
            })
    }

    componentDidMount() {
        this.getAllEmployees();
    }

    handleModal = () => {
        this.setState({ show: !this.state.show })
    }

    handleDetailModal = () => {
        this.setState({ showDetailModal: !this.state.showDetailModal })
    }

    handleFilterModal = () => {
        let error = this.state.filterErrors
        error["common"] = ""
        this.setState({ showFilterModal: !this.state.showFilterModal, filterErrors: { ...error } })
    }

    handleDelete = () => {
        this.handleModal();
        const ajaxRequestHeaders = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        });
        let body = {
            method: 'DELETE',
            headers: ajaxRequestHeaders,
        }
        fetch(`/employee/${this.state.deleteId}`, body).then((res) => res.json()).then((res) => {
            if (res.msg === "Employee deleted successfully") {
                this.getAllEmployees()
                swal("Success", res.msg, "success");
            }
            else {
                swal("Error", res.msg, "error");
            }
        })
        this.setState({ deleteId: '' })
    }

    handleFilterValues = (e) => {
        let filterValues = this.state.filterValues;
        let errors = this.state.filterErrors;
        if (e.target.value) {
            errors[e.target.name] = ""
        }
        errors["common"] = ""
        filterValues[e.target.name] = e.target.value;
        this.setState({
            filterValues: { ...filterValues },
            filterErrors: { ...errors }
        })
    }


    handleCheckbox = (e) => {
        let filter = this.state.filter;
        let filterValues = this.state.filterValues
        let errors = this.state.filterErrors;
        errors = {
            id: '',
            name: '',
            location: '',
            age: '',
        }
        if (e.target.name === "id") {
            filterValues["name"] = ""
            filter["name"] = false;
            filterValues["location"] = ""
            filter["location"] = false;
            filterValues["age"] = ""
            filter["age"] = false;
        }

        filter[e.target.name] = e.target.checked;
        if (!e.target.checked) {
            filterValues[e.target.name] = "";
        }
        this.setState({ filter: { ...filter }, filterValues: { ...filterValues }, filterErrors: { ...errors } })

    }

    validateFilterValues = () => {
        let error = this.state.filterErrors;
        let flag = true;
        if (this.state.filter.id === true && !this.state.filterValues.id) {
            flag = false
            error["id"] = "Enter employee id or remove filter"
        }
        if (this.state.filter.name === true && !this.state.filterValues.name) {
            flag = false
            error["name"] = "Enter employee name or remove filter"
        }
        if (this.state.filter.location === true && !this.state.filterValues.location) {
            flag = false
            error["location"] = "Enter employee location or remove filter"
        }
        if (this.state.filter.age === true && !this.state.filterValues.age) {
            flag = false
            error["age"] = "Enter employee age or remove filter"
        }
        if (this.state.filter.age === false && this.state.filter.id === false && this.state.filter.name === false && this.state.filter.location === false) {
            flag = false
            error["common"] = "Add some filters to filter"
        }
        if (this.state.filterValues.id) {
            let isnum = /^\d+$/.test(this.state.filterValues.id);
            if (!isnum || this.state.filterValues.id.length !== 7) {
                flag = false
                error["id"] = "Enter 7 digit no only"
            }
        }
        if (this.state.filterValues.name && !(/^[a-zA-Z ]+$/.test(this.state.filterValues.name))) {
            flag = false
            error["name"] = "Enter a valid name"
        }
        if ((!parseInt(this.state.filterValues.age) >= 21 && parseInt(this.state.filterValues.age) <= 60)) {
            error["age"] = "Age should be between 21 and 60"
        }
        this.setState({ filterErrors: { ...error } })
        return flag

    }

    filterEmployees = () => {
        let isValid = this.validateFilterValues();
        if (isValid) {
            this.setState({ loading: true })
            let data = { ...this.state.filterValues, status: this.state.filter }
            this.handleFilterModal();
            fetch('/filter_employees', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .then(res => {
                    this.setState({ allEmployees: res.data || [] })
                    setTimeout(() => this.setState({ loading: false }), 3000)
                })
        }
    }

    handleRemoveFilters = () => {
        this.setState({
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
        })
        this.getAllEmployees();
    }
    render() {
        const isFilter = this.state.filterValues.id || this.state.filterValues.name || this.state.filterValues.location || this.state.filterValues.age
        const { employeeDetails } = this.state
        return (
            <LayoutWrapper isLoggedIn={isUserAuthenticated()}>
                <div className="container dashboard_content" >
                    <div className="d-flex flex-wrap justify-content-between mb-4">
                        <Link to="/employee/add" className="btn btn-outline-primary">Add employee <HiUserAdd /></Link>
                        <div className="total_employees.txt">Total Employees:{!this.state.loading ? (<span className="badge badge-pill badge-primary">{this.state.allEmployees.length}</span>) : (<span> Loading...</span>)}</div>
                        <div><button className="btn btn-primary" onClick={this.handleFilterModal} disabled={this.state.allEmployees.length === 0 && !isFilter}>Filter </button>{isFilter && (<span className="remove_filter_btn" role="button"><MdClear onClick={this.handleRemoveFilters} title="remove filters" /></span>)}</div>
                    </div>
                    {this.state.loading ? (
                        <HashLoader
                            css={override}
                            size={100}
                            color={"#0069d9"}
                            loading={this.state.loading}
                        />
                    ) : (
                            this.state.allEmployees.length !== 0 ? (
                                <div>
                                    <table className="table table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Employee Id</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Mobile No</th>
                                                <th scope="col">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.allEmployees.map((emp, id) => (
                                                <tr key={emp.emp_id}>
                                                    <td>{emp.emp_id}</td>
                                                    <td>{emp.name}</td>
                                                    <td>{emp.email}</td>
                                                    <td>{emp.mobile}</td>
                                                    <td><Link className="edit_button mr-2" to={`/employee/edit/${emp.emp_id}`}><FaEdit title="edit" /></Link><span title="view details" onClick={() => { this.setState({ employeeDetails: emp }); this.handleDetailModal() }} className="delete_button mr-2" to="/employee/delete"><GrView /></span><span title="delete" onClick={() => { this.setState({ deleteId: emp.emp_id }); this.handleModal() }} className="delete_button"><MdDelete /></span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                    <div className="d-flex justify-content-center align-items-center helper_text">No employees found!</div>
                                ))}

                </div>
                <Modal show={this.state.show} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete?</Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-outline-danger" onClick={this.handleDelete}>Delete</button>
                        <button className="btn btn-primary" onClick={this.handleModal}>Cancel</button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showDetailModal} onHide={this.handleDetailModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Employee Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-between align-items-center details">
                            <div className="title">Employee Id</div>
                            <div className="address_text">{employeeDetails.emp_id}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center details">
                            <div className="title">Name</div>
                            <div className="address_text">{employeeDetails.name}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center details">
                            <div className="title">Email Id</div>
                            <div className="address_text">{employeeDetails.email}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center details">
                            <div className="title">Date of Birth</div>
                            <div className="address_text">{employeeDetails.dob}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center details">
                            <div className="title">Role</div>
                            <div className="address_text">{employeeDetails.role}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center details">
                            <div className="title">Gender</div>
                            <div className="address_text">{employeeDetails.gender || "-"}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center details">
                            <div className="title">Mobile No</div>
                            <div className="address_text">{employeeDetails.mobile}</div>
                        </div>
                        <div className="details">
                            <div className="title mb-1">Address</div>
                            <div className="address_text">{employeeDetails.address?.replaceAll("|", ",")}</div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.handleDetailModal}>Close</button>
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
                                <span className="text-danger">{this.state.filterErrors.id}</span>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="name" checked={this.state.filter.name} disabled={this.state.filter.id} onChange={this.handleCheckbox} />
                                    <span className="ml-2">Name</span>
                                </label>
                                {this.state.filter.name && (
                                    <input type="text" name="name" value={this.state.filterValues.name} disabled={this.state.filter.id} className="form-control" onChange={this.handleFilterValues} placeholder="Enter name..." />)}
                                <span className="text-danger">{this.state.filterErrors.name}</span>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="location" checked={this.state.filter.location} disabled={this.state.filter.id} onChange={this.handleCheckbox} />
                                    <span className="ml-2">Location</span>
                                </label>
                                {this.state.filter.location && (
                                    <input type="text" name="location" value={this.state.filterValues.location} className="form-control" disabled={this.state.filter.id} onChange={this.handleFilterValues} placeholder="Enter city,state..." />)}
                                <span className="text-danger">{this.state.filterErrors.location}</span>
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="age" checked={this.state.filter.age} disabled={this.state.filter.id} onChange={this.handleCheckbox} />
                                    <span className="ml-2">Age</span>
                                </label>
                                {this.state.filter.age && (
                                    <input type="Number" name="age" min="1" value={this.state.filterValues.age} disabled={this.state.filter.id} className="form-control" onChange={this.handleFilterValues} placeholder="Enter age in number..." />)}
                                <span className="text-danger">{this.state.filterErrors.age}</span>
                            </div>
                            <div className="text-danger">{this.state.filterErrors.common}</div>
                            <span className="alert-primary">*If you like to filter by employee id, others filters can't be applied!</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={() => this.filterEmployees()}>Filter</button>
                        <button className="btn btn-outline-secondary" onClick={this.handleFilterModal}>Cancel</button>
                    </Modal.Footer>
                </Modal>
            </LayoutWrapper>
        )
    }
}
