import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./home.css";


class Home extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="primary" fixed="top" variant="dark">
                    <Navbar.Brand href="/home">Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/" className="mr-5">Home</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="container main-content">
                    Hello
                </div>
            </div>
        )
    }
}

export default Home;