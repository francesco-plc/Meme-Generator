import { Row, Button, Form, Card, Alert, Container } from 'react-bootstrap';
import { useState } from 'react';
/* import userPlaceholder1 from '../images/pepe.jpg';
import userPlaceholder2 from '../images/joinus.jpg'; */
import userPlaceholder3 from '../images/isaid.jpg';

/* Account Info Placeholder */
function AccountInfo(props) {
  const { userName, doLogOut } = props;

  return (
      <Alert variant="info" className="alert text-center">
        <Alert.Heading>
          Hello {' '} <b>{userName}</b>! {' '} This is your personal space.
        </Alert.Heading>
        <p>
          From here you can manage all your created memes (or simply log out if you want to).
        </p>
        <hr />
        <p className="mb-0">
        <Button className="btn-sm button" variant="danger" onClick={doLogOut}>Log Out</Button>
        </p>
      </Alert>
  );
}

function LoginForm(props) {

  const { doLogIn } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      setInvalidUsername(username === '');
      setInvalidPassword(password === '');
    } else {
      doLogIn(username, password);
    }
  };

  const handleChange = (event) => {
    if (event.target.id === 'username') {
      setUsername(event.target.value);
      setInvalidUsername(event.target.value === '');
    } else if (event.target.id === 'password') {
      setPassword(event.target.value);
      setInvalidPassword(event.target.value === '');
    }
  };

  return (
    <Container className="loginPage">
      <Row className="mt-5 justify-content-center">
      <Card className="text-center logCard mt-5">
        <Card.Body>
          <Card.Img variant="info" src={userPlaceholder3} alt="imagePlaceholder3" className="logImg my-4" />
          <Form>
            <Form.Group className="text-left my-4" controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control isInvalid={invalidUsername} placeholder="Enter Username" type="email" value={username} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please insert username.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-left mb-4" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control isInvalid={invalidPassword} placeholder="Enter Password" type="password" value={password} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please insert password.</Form.Control.Feedback>
            </Form.Group>
            <Button className="btn-lg btn-block button" variant="warning" onClick={handleSubmit}>Log In</Button>
          </Form>
        </Card.Body>
      </Card>
    </Row>
    </Container>
    
  );
}

export { AccountInfo, LoginForm };
