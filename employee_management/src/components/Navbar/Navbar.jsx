import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./navbar.css"

const LayoutWrapper = (props) => {

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/home"
    }
    const page = window.location.href.split('/')
    return (
        <div className="content-container">
            <Navbar collapseOnSelect expand="lg" bg="dark" fixed="top" variant="dark">
                <Navbar.Brand href="/home">EMS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {!props.isLoggedIn ? (
                            <NavLink
                                activeClassName="activeHeader"
                                className="nav-link"
                                to={"/home"}
                            >
                                Home
                            </NavLink>) : (
                                <NavLink
                                    activeClassName="activeHeader"
                                    className="nav-link"
                                    to={"/dashboard"}
                                >
                                    Dashboard
                                </NavLink>
                            )}
                        {!props.isLoggedIn ? (
                            <NavLink
                                activeClassName="activeHeader"
                                className="nav-link"
                                to={"/login"}
                            >
                                Login
                            </NavLink>) : (
                                <div
                                    id="dashboard_link"
                                    onClick={handleLogout}
                                    className="nav-link logout_button"
                                >
                                    Log out
                                </div>
                            )}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className={page[4] === "add" || page[4] === "edit" ? "main-content" : "main-content-default"}>
                {props.children}
            </div>
            <div className="footer">&copy; Copyrights {new Date().getFullYear()} All rights reserved</div>
        </div>
    )

}

export default LayoutWrapper;