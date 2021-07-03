import {Row, Col, Card, Container, Button, CardColumns} from 'react-bootstrap';
import {Templates} from '../models/Templates';
import { iconSteal } from './Icons';

function DashBoard (props){

    const {memes, setMemes} = props;
    const i = memes.lenght;

    return(
/*         <Container fluid className='dashboard'>
            <Row xs={1} md={2} className="g-4 vheight-100 width-100 mx-auto">
                {memes.map((m, idx) => (
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Img variant="top" src={m.image} />
                            <Card.Body>
                                <Card.Title>{m.title}</Card.Title>
                                <Card.Text>
                                    Posted by: {m.user} 
                                    <br></br>
                                    Privacy: {m.isProtected}
                                </Card.Text>
                                <Button variant="danger" className="float-right"> {iconSteal} Steal?  </Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                ))}
            </Row>
        </Container> */
        

        /* <Container fluid className='dashboard'>
            <Row xs={1} md={2} className="g-4 vheight-100 width-100 mx-auto justify-content-center">
                {memes.map((m, idx) => (
                    <Col md={4} xs={10} key={idx}>
                        <Card bg="light" border="info" key={idx}>
                            <Card.Img variant="top" src={m.image}/>
                            <Card.Body>
                                <Card.Title>{m.title}</Card.Title>
                                <Card.Text>
                                    Posted by: {m.user} 
                                    <br></br>
                                    Privacy: {m.isProtected}
                                </Card.Text>
                                <Button  variant="danger" className="float-right"> {iconSteal} Steal?  </Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                ))}
            </Row>
        </Container> */

        /* <Container fluid className='dashboard'>
            <CardColumns>
                {memes.map((m, idx) => (
                    <Card key="idx">
                        <Card.Img variant="top" src={m.image} />
                        <Card.Body>
                            <Card.Title>{m.title}</Card.Title>
                                <Card.Text>
                                    Posted by: {m.user} 
                                    <br></br>
                                    Privacy: {m.isProtected}
                                </Card.Text>
                            <Button variant="danger" className="float-right"> {iconSteal} Steal?  </Button>
                        </Card.Body>
                    </Card>
                ))}
            </CardColumns>
        </Container> */

        <Container fluid className='dashboard'>
        <Row xs={1} md={2} className="g-4 vheight-100 width-100 mx-auto">
            {memes.map((m, idx) => (
                idx % 2 === 0 ? (
                    <Col md={{ span: 6, offset: 2 }}>
                        <Card>
                            <Card.Img variant="top" src={m.image} />
                            <Card.Body>
                                <Card.Title>{m.title}</Card.Title>
                                <Card.Text>
                                    Posted by: {m.user} 
                                    <br></br>
                                    Privacy: {m.isProtected}
                                </Card.Text>
                                <Button variant="danger" className="float-right"> {iconSteal} Steal?  </Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                ) : (
                        <Col md={{ span: 6, offset: 4 }}>
                        <Card>
                            <Card.Img variant="top" src={m.image} />
                            <Card.Body>
                                <Card.Title>{m.title}</Card.Title>
                                <Card.Text>
                                    Posted by: {m.user} 
                                    <br></br>
                                    Privacy: {m.isProtected}
                                </Card.Text>
                                <Button variant="danger" className="float-right"> {iconSteal} Steal?  </Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>)               
            ))}
        </Row>
    </Container>
        
    );
}

export default DashBoard;