import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink} from 'react-router-dom';
import { useState } from 'react';
import { iconLogo, iconUser } from './Icons';

function NavBar(props){
    return(
        <Navbar bg="dark" variant="dark" fixed="top" className="nav">
            {/* NavBar Logo & Title */}
            <Link to="/">
                <Navbar.Brand>
                    {/* {iconLogo}
                    {' '} */}
                    Memes Generator
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="mx-auto">
                    <Link to="/create" >
                        <Navbar.Text>Generator</Navbar.Text>
                    </Link>
                </Nav>
                <Navbar.Text className="mr-2">
                    <small>Welcome! <a href="#login">Mark Otto</a></small> 
                </Navbar.Text>                 
                {/* Account Button */}
                <NavLink to="/Account" className="text-info">{iconUser}</NavLink>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;