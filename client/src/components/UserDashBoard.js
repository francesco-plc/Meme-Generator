import {Row, Col, Card, Container, Button } from 'react-bootstrap';
import { iconDelete, iconProtected, iconPublic } from './Icons';

function UserDashBoard (props){

    const {userMemes, deleteMeme, changePrivacy} = props;

    return(
        <Container fluid>
            <Row xs={1} md={2} className="g-4 width-100 mx-auto">
                {userMemes.map((m, idx) => (
                    <Col md={{ span: 6, offset: 3 }} key={idx}>
                        <Card /* bg="light" */ className="my-2 dashcard">
                            <Card.Header>
                                <Row>
                                    <Col xs={10} className="text-left">
                                        <Card.Title>{m.title}</Card.Title>
                                    </Col>
                                    <Col xs={2} className="text-right">
                                        <Button variant="danger" className="btn-sm button" onClick={() => deleteMeme(m.id)}> {iconDelete} </Button>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Row>
                                <Col xs={10} className="mx-auto mt-3 mb-0">
                                    <Card.Img variant="bottom"  src={m.image} className="meme"/>
                                </Col>
                            </Row>                            
                            <Card.Body>
                                <Row>
                                    <Col xs={6} className="text-left">
                                        
                                    </Col>
                                    <Col>
                                        {m.isProtected ?
                                            (
                                                <Card.Text xs={6} className="text-right">
                                                    <Button className="button btn-sm" variant="outline-dark" onClick={() => changePrivacy(m.id)} >Privacy: {iconProtected}</Button>
                                                </Card.Text>
                                            ) : (
                                                <Card.Text xs={6} className="text-right">
                                                    <Button className="button btn-sm" variant="outline-dark" onClick={() => changePrivacy(m.id)}>Privacy: {iconPublic}</Button>
                                                </Card.Text>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                    </Card>
                    <br/>
                    </Col>
                ))}
            </Row>
        </Container>        
    );
}

export default UserDashBoard;