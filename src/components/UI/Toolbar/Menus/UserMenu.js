import React, {Fragment} from 'react';
import {Nav, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import MenuItem from "react-bootstrap/es/MenuItem";

const UserMenu = ({user, logout}) => {
    const navTitle = (
        <Fragment>
            Hello, <b>{user.username}</b>
        </Fragment>
    );

    return (
        <Nav pullRight>
            <NavDropdown title={navTitle} id="user-menu">
                <LinkContainer to={`/photos/${user._id}`} exact>
                    <MenuItem>My photos</MenuItem>
                </LinkContainer>
                <MenuItem divider/>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </NavDropdown>
        </Nav>
    )
};

export default UserMenu;