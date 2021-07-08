import {Row, Col, Card, Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { iconSteal, iconProtected, iconPublic } from './Icons';

function DashBoard (props){

    const {memes, /* setMemes, routerHistory */} = props;

    return(
        <Container fluid className='dashboard'>
            <Row xs={1} md={2} className="g-4 width-100 mx-auto">
                {memes.map((m, idx) => (
                    <Col md={{ span: 6, offset: 3 }} key={idx}>
                        <Card /* bg="light" */ className="my-2 dashcard">
                            <Card.Header>
                                <Row>
                                    <Col xs={8} className="text-left">
                                        <Card.Title>{m.title}</Card.Title>
                                    </Col>
                                    <Col xs={4} className="text-right">
                                        <Link
                                            to={{
                                                pathname: '/create',
                                                state: m
                                            }}
                                        >
                                            <Button variant="warning" className="btn-sm button"> {iconSteal} Steal?  </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Row>
                                <Col xs={10} className="mx-auto mt-3 mb-0">
                                    <Card.Img variant="bottom" src={m.image} className="meme"/>
                                </Col>
                            </Row>
                            <Card.Body>
                                <Row>
                                    <Col xs={6} className="text-left">
                                        <Card.Text>
                                            Created by: {m.username}
                                        </Card.Text>
                                    </Col>
                                    <Col>
                                        {m.isProtected ?
                                            (
                                                <Card.Text xs={6} className="text-right">
                                                    Privacy: {iconProtected}
                                                </Card.Text>
                                            ) : (
                                                <Card.Text xs={6} className="text-right">
                                                    Privacy: {iconPublic}
                                                </Card.Text>
                                            )
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                ))}
            </Row>
        </Container>
        
    );
}

export default DashBoard;