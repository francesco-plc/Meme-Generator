import { Navbar, Button, Col } from 'react-bootstrap';
import { Link, NavLink} from 'react-router-dom';
import { /* iconLogo, */ iconUser } from './Icons';

function NavBar(props){

    const { loggedIn, userName } = props;

    return(
        <Navbar bg="dark" variant="dark" fixed="top" className="nav ">
            {/* NavBar Logo & Title */}
            <Col xs={5} className="text-left">
                <Link to="/">
                    <Navbar.Brand>
                        {/* {iconLogo}
                        {' '} */}
                        <small>Cheap Memes Generator</small>
                    </Navbar.Brand>
                </Link>
            </Col>
            <Col xs={2} className="text-center">
                        <Link to="/create" >
                            <Button className="button" variant="outline-light">Generator</Button>
                        </Link>
            </Col>
            <Col xs={5} className="text-right">
                <Navbar.Text className="mr-2">
                    {loggedIn ? (
                        <small> Hi, <Link to="/account">{userName}</Link></small>
                    ) : (<Link to="/login">
                        Login
                    </Link>)
                    }
                </Navbar.Text>
                {/* Account Button */}
                <NavLink to="/account" className="text-info">{iconUser}</NavLink>
            </Col>                
        </Navbar>
    );
}

export default NavBar;