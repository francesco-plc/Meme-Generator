import {Row, Col, Card, Container, Button, CardColumns} from 'react-bootstrap';
import {Templates} from '../models/Templates';
import { iconSteal } from './Icons';

function DashBoard (props){

    const {memes, setMemes} = props;

    return(
/*         <Container fluid className='dashboard'>
            <Row xs={1} md={2} className="g-4 vheight-100 width-100 mx-auto">
                {Templates.map((e, idx) => (
                    <Col md={{ span: 4, offset: 4 }}>
                        <Card>
                            <Card.Img variant="top" src={e.img} />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                                <Button variant="danger" className="float-right"> {iconSteal} Steal?  </Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                ))}
            </Row>
        </Container> */
        

        <Container fluid className='dashboard'>
            <Row xs={1} md={2} className="g-4 vheight-100 width-100 mx-auto justify-content-center">
                {memes.map((m, idx) => (
                    <Col md={4} xs={10} >
                        <Card bg="light" border="info" key={idx}>
                            <Card.Img variant="top" src={`data:${m.image.mimetype};base64,${Buffer.from(m.image.data).toString('base64')}`} />
                            <Card.Body>
                                <Card.Title>{m.title}</Card.Title>
                                <Card.Text>
                                    Posted by user {m.user}
                                </Card.Text>
                                <Button  variant="danger" className="float-right"> {iconSteal} Steal?  </Button>
                            </Card.Body>
                        </Card>
                        <br />
                    </Col>
                ))}
            </Row>
        </Container>

/*         <Container fluid className="dashboard">
            <CardColumns>
                {Templates.map((e, idx) => (
                    <Card key="idx">
                        <Card.Img variant="top" src={e.img} />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.
                            </Card.Text>
                            <Button variant="danger" className="float-right"> {iconSteal} Steal?  </Button>
                        </Card.Body>
                    </Card>
                ))}
            </CardColumns>
        </Container> */
        
    );
}

export default DashBoard;