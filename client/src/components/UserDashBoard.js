import {Row, Col, Card, Container, Button} from 'react-bootstrap';
import { iconDelete, iconProtected, iconPublic } from './Icons';

function UserDashBoard (props){

    const {userMemes, deleteMeme} = props;

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
                                        {/* <Card.Text>
                                            Created by: {m.user}
                                        </Card.Text> */}
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
                    <br/>
                    </Col>
                ))}
            </Row>
        </Container>
        

        /* <Container fluid className='dashboard'>
            <Row xs={1} md={2} className="g-4 vheight-100 width-100 mx-auto justify-content-center">
                {userMemes.map((m, idx) => (
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
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button variant="danger" className="btn-sm"  onClick={() => deleteMeme(m.id)}> {iconDelete} Delete  </Button>
                        </Card.Footer>
                    </Card>
                        <br />
                    </Col>
                ))}
            </Row>
        </Container> */

        /* <Container fluid className='dashboard'>
            <CardColumns>
                {userMemes.map((m, idx) => (
                    <Card key={idx}>
                        <Card.Img variant="top" src={m.image} />
                        <Card.Body>
                            <Card.Title>{m.title}</Card.Title>
                                <Card.Text>
                                    Posted by: {m.username} 
                                    <br></br>
                                    Privacy: {m.isProtected}
                                </Card.Text>                                
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button variant="danger" className="btn-sm"  onClick={() => deleteMeme(m.id)}> {iconDelete} Delete  </Button>
                        </Card.Footer>
                    </Card>
                ))}
            </CardColumns>
        </Container> */

        /* <Container fluid className='dashboard'>
            <Row xs={1} md={2} className="g-4 vheight-100 width-100 mx-auto">
                {userMemes.map((m, idx) => (
                    idx % 2 === 0 ? (
                        <Col md={{ span: 6, offset: 2 }} key="idx">
                            <Card>
                                <Card.Img variant="top" src={m.image} />
                                <Card.Body>
                                    <Card.Title>{m.title}</Card.Title>
                                    <Card.Text>
                                        Posted by: {m.user}
                                        <br></br>
                                        Privacy: {m.isProtected}
                                    </Card.Text>                                
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button variant="danger" className="btn-sm"  onClick={() => deleteMeme(m.id)}> {iconDelete} Delete  </Button>
                        </Card.Footer>
                    </Card>
                            <br />
                        </Col>
                    ) : (
                        <Col md={{ span: 6, offset: 4 }} key="idx">
                            <Card>
                                <Card.Img variant="top" src={m.image} />
                                <Card.Body>
                                    <Card.Title>{m.title}</Card.Title>
                                    <Card.Text>
                                        Posted by: {m.user}
                                        <br></br>
                                        Privacy: {m.isProtected}
                                    </Card.Text>                                
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button variant="danger" className="btn-sm"  onClick={() => deleteMeme(m.id)}> {iconDelete} Delete  </Button>
                        </Card.Footer>
                    </Card>
                            <br />
                        </Col>)
                ))}
            </Row>
        </Container> */
        
    );
}

export default UserDashBoard;