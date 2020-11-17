import React, { Component } from 'react'
import LayoutWrapper from "../Navbar/Navbar";
import { isUserAuthenticated } from "../../helpers/auth";
import "../AddEmployee/addEmployee.css";
import swal from 'sweetalert';
import moment from "moment";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default class AddEmployee extends Component {

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
            email: '',
            errors: {},
        }
    }

    componentDidMount() {

    }

    validateValues = () => {
        let errors = this.state.errors;
        let flag = 1;
        if (!this.state.firstName) {
            flag = 0;
            errors.firstName = "FirstName is required"
        }
        if (this.state.firstName && !(/^[a-zA-Z ]+$/.test(this.state.firstName))) {
            flag = 0;
            errors.firstName = "Enter a valid FirstName"

        }
        if (!this.state.lastName) {
            flag = 0;
            errors.lastName = "LastName is required"
        }
        if (this.state.lastName && !(/^[a-zA-Z ]+$/.test(this.state.lastName))) {
            flag = 0;
            errors.lastName = "Enter a valid LastName"

        }
        if (!this.state.email) {
            flag = 0;
            errors.email = "email is required"
        }
        if (this.state.email) {
            const isValid = validateEmail(this.state.email)
            if (!isValid) {
                flag = 0;
                errors.email = "Enter valid email"
            }
        }
        if (!this.state.dob) {
            flag = 0;
            errors.dob = "Date of birth is required"
        }
        // if (this.state.dob) {
        //     let date = this.state.dob.split("/");
        //     if (date.length !== 3) {
        //         flag = 0;
        //         errors.dob = "Enter valid date"
        //     }
        //     let day = parseInt(date[0]);
        //     let month = parseInt(date[1]);
        //     let year = parseInt(date[2]);
        //     if (!(day >= 1 && day <= 31) || !(month >= 1 && month <= 12) || !(year >= 1920 && year < new Date().getFullYear())) {
        //         errors.dob = "Enter valid date"
        //         flag = 0;
        //     }
        // }
        if (!this.state.addressLine1) {
            flag = 0;
            errors.addressLine1 = "Address is required"
        }
        if (!this.state.addressLine2) {
            flag = 0;
            errors.addressLine2 = "Area is required"
        }
        if (!this.state.city) {
            flag = 0;
            errors.city = "City is required"
        }
        if (!this.state.state) {
            flag = 0;
            errors.state = "State is required"
        }
        if (!this.state.country) {
            flag = 0;
            errors.country = "country is required"
        }
        if (!this.state.pinCode) {
            flag = 0;
            errors.pinCode = "pincode is required"
        }
        if (!this.state.mobileNo) {
            flag = 0;
            errors.mobileNo = "Mobile No is required"
        }
        if (this.state.mobileNo) {
            let isnum = /^\d+$/.test(this.state.mobileNo);
            if (!isnum) {
                flag = 0
                errors.mobileNo = "Enter a valid mobile number"
            }
        }
        this.setState({ errors: { ...errors } });
        return flag;

    }

    handleInput = (e) => {
        let errors = this.state.errors;
        if (e.target.value) {
            errors[e.target.name] = ""
        }
        this.setState({
            [e.target.name]: e.target.value,
            errors: { ...errors }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const isValid = this.validateValues();
        console.log(isValid)
        if (isValid === 0) {
            return
        }
        console.log(moment(this.state.dob, "YYYY-MM-DD").format("DD/MM/YYYY"),)
        let address = this.state.addressLine1 + '|' + this.state.addressLine2 + '|' + this.state.city + '|' + this.state.state + '|' + this.state.pinCode + '|' + this.state.country
        const data = {
            name: this.state.firstName + " " + this.state.lastName,
            gender: this.state.gender,
            address: address,
            dob: moment(this.state.dob, "YYYY-MM-DD").format("DD/MM/YYYY"),
            mobile: this.state.mobileNo,
            email: this.state.email,

        }
        const ajaxRequestHeaders = new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        });
        let body = {
            method: 'PUT',
            headers: ajaxRequestHeaders,
            body: JSON.stringify(data)
        }
        fetch(`/employee/${this.state.id}`, body).then((res) => res.json()).then((res) => {
            if (res.msg === "Employee details updated successfully") {
                swal("Success", res.msg, "success").then(() => this.props.history.push("/dashboard"));
            }
            else {
                swal("Error", res.msg, "error");
            }
        })
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
                                {this.state.errors.firstName && (<span className="text-danger">{this.state.errors.firstName}</span>)}
                            </div>
                            <div className="form-group">
                                <label className="label_color">Lastname</label>
                                <input type="text" name="lastName" className="form-control" value={this.state.lastName} onChange={this.handleInput} />
                                {this.state.errors.lastName && (<span className="text-danger">{this.state.errors.lastName}</span>)}
                            </div>
                            <div className="form-group">
                                <label className="label_color">Email Id</label>
                                <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleInput} />
                                {this.state.errors.email && (<span className="text-danger">{this.state.errors.email}</span>)}
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
                                <input type="date" value={this.state.dob} min={`${new Date().getFullYear() - 60}-01-01`} max={`${new Date().getFullYear() - 20}-01-01`} name="dob" className="form-control" placeholder="Example: 20/04/2020" onChange={this.handleInput} />
                                {this.state.errors.dob && (<span className="text-danger">{this.state.errors.dob}</span>)}
                            </div>
                            <div className="address_field">
                                <div>
                                    <label className="label_color">Address Line 1</label>
                                    <input type="text" name="addressLine1" className="form-control" value={this.state.addressLine1} onChange={this.handleInput} />
                                    {this.state.errors.addressLine1 && (<div className="text-danger">{this.state.errors.addressLine1}</div>)}
                                    <label className="label_color">Address Line 2</label>
                                    <input type="text" name="addressLine2" className="form-control" value={this.state.addressLine2} onChange={this.handleInput} />
                                    {this.state.errors.addressLine2 && (<div className="text-danger">{this.state.errors.addressLine2}</div>)}
                                    <label className="label_color">City</label>
                                    <input type="text" name="city" className="form-control" value={this.state.city} onChange={this.handleInput} />
                                    {this.state.errors.city && (<div className="text-danger">{this.state.errors.city}</div>)}
                                    <label className="label_color">State</label>
                                    <input type="text" name="state" className="form-control" value={this.state.state} onChange={this.handleInput} />
                                    {this.state.errors.state && (<div className="text-danger">{this.state.errors.state}</div>)}
                                    <label className="label_color" >Country</label>
                                    <input type="text" name="country" className="form-control" value={this.state.country} onChange={this.handleInput} />
                                    {this.state.errors.country && (<div className="text-danger">{this.state.errors.country}</div>)}
                                    <label className="label_color">Pincode</label>
                                    <input type="no" name="pinCode" className="form-control" value={this.state.pinCode} onChange={this.handleInput} />
                                    {this.state.errors.pinCode && (<div className="text-danger">{this.state.errors.pinCode}</div>)}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label_color">Mobile No:</label>
                                <input type="tel" name="mobileNo" className="form-control" value={this.state.mobileNumber} placeholder="Enter number only" onChange={this.handleInput} />
                                {this.state.errors.mobileNo && (<span className="text-danger">{this.state.errors.mobileNo}</span>)}
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

