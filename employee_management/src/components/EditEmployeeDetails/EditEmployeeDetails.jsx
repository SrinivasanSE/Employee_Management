import React, { Component } from 'react'
import LayoutWrapper from "../Navbar/Navbar";
import { isUserAuthenticated } from "../../helpers/auth";
import "./editEmployeeDetails.css";
import "../AddEmployee/addEmployee.css";
export default class EditEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            gender: '',
            dob: '',
            addressLine1: '',
            addressLine2: '',
            country: '',
            state: '',
            city: '',
            pinCode: '',
            address: '',
            mobileNo: '',
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ id })
        const ajaxRequestHeaders = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        });
        let body = {
            method: 'GET',
            headers: ajaxRequestHeaders,
        }
        fetch(`/update_employee/${id}`, body).then((res) => res.json()).then((res) => console.log(res))
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {

        const data = {

        }
        const ajaxRequestHeaders = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        });
        let body = {
            method: 'PUT',
            headers: ajaxRequestHeaders,
            body: JSON.stringify({
                name: "srinivasan",
                gender: "Male",
                address: "tcs chennai",
                mobile: "8278738437"
            })
        }
        fetch(`/update_employee/${this.state.id}`, body).then((res) => res.json()).then((res) => console.log(res))
    }
    render() {
        return (
            <LayoutWrapper isLoggedIn={isUserAuthenticated()}>
                <div className="add_employee_container">
                    <div className="form_container">
                        <h3 className="add_employee_text">Update Employee Details</h3>
                        <form className="form_content_add" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="label_color">Firstname</label>
                                <input type="text" name="firstName" className="form-control" value={this.state.firstName} onChange={this.handleInput} />
                            </div>
                            <div className="form-group">
                                <label className="label_color">Lastname</label>
                                <input type="text" name="lastName" className="form-control" value={this.state.lastName} onChange={this.handleInput} />
                            </div>
                            <div className="row d-flex justify-content-between align-items-center w-100 pb-3">
                                <div className="col-12 col-md-2 label_color">Gender:</div>
                                <div className="col-12 col-md-10 mt-2">
                                    <div className="d-flex flex-wrap justify-content-between align-items-center w-100">
                                        <label className="col-12 col-md-4 radio-block">
                                            <input
                                                id="male"
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={this.state.gender === "Male"}
                                                onChange={this.handleInput}
                                            />
                                            <span className="ml-3">Male</span>
                                        </label>

                                        <label className="col-12 col-md-4 radio-block">
                                            <input
                                                id="female"
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={this.state.gender === "Female"}
                                                onChange={this.handleInput}
                                            />
                                            <span className="ml-3">Female</span>
                                        </label>
                                        <label className="col-12 col-md-4 radio-block">
                                            <input
                                                id="others"
                                                type="radio"
                                                name="gender"
                                                value="Others"
                                                checked={this.state.gender === "Others"}
                                                onChange={this.handleInput}
                                            />
                                            <span className="ml-3">Others</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label_color">Date of birth(dd/mm/yyyy)</label>
                                <input type="text" value={this.state.dob} className="form-control" placeholder="Example: 20/04/2020" onChange={this.handleInput} />
                            </div>
                            <div className="address_field">
                                <div>
                                    <label className="label_color">Address Line 1</label>
                                    <input type="text" name="addressLine1" className="form-control" value={this.state.addressLine1} onChange={this.handleInput} />
                                    <label className="label_color">Address Line 2</label>
                                    <input type="text" name="addressLine2" className="form-control" value={this.state.addressLine2} onChange={this.handleInput} />
                                    <label className="label_color">City</label>
                                    <input type="text" name="city" className="form-control" value={this.state.city} onChange={this.handleInput} />
                                    <label className="label_color">State</label>
                                    <input type="text" name="state" className="form-control" value={this.state.state} onChange={this.handleInput} />
                                    <label className="label_color" >Country</label>
                                    <input type="text" name="country" className="form-control" value={this.state.country} onChange={this.handleInput} />
                                    <label className="label_color">Pincode</label>
                                    <input type="no" name="pinCode" className="form-control" value={this.state.pinCode} onChange={this.handleInput} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label_color">Mobile No:</label>
                                <input type="tel" name="mobileNumber" className="form-control" value={this.state.mobileNumber} onChange={this.handleInput} />
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </LayoutWrapper>
        )
    }
}
