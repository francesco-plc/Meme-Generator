import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink} from 'react-router-dom';
import { useState } from 'react';
import { iconLogo, iconUser } from './Icons';

function NavBar(props){

    const { loggedIn, userName } = props;

    return(
        <Navbar bg="dark" variant="dark" fixed="top" className="nav">
            {/* NavBar Logo & Title */}
            <Link to="/">
                <Navbar.Brand>
                    {/* {iconLogo}
                    {' '} */}
                    Memes Generator
                    {/* <small>Your Cheap<br></br>Memes Generator</small> */}
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="mx-auto">
                    <Link to="/create" >
                        <Navbar.Text >Generator</Navbar.Text>
                    </Link>
                </Nav>
                <Navbar.Text className="mr-2">
                    {loggedIn ? (
                        <small>Welcome! <Link to="/account"><a>{userName}</a></Link></small>
                        ) : (<Link to="/login">
                                <a>Login</a>   
                        </Link>)
                    }                  
                </Navbar.Text>                 
                {/* Account Button */}
                <NavLink to="/account" className="text-info">{iconUser}</NavLink>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;