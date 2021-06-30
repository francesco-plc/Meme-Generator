import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import {Templates, Colors} from '../models/Templates';
import {iconLeft, iconRight, iconCheck} from './Icons';
import { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import FontPicker from "font-picker-react";
import Canvas from './Canvas';

function Generator(props) {

    //const {copy} = props;
    
    const [count, setCount] = useState(0);
    const [capt, setCapt] = useState(Array(Templates[count].box_count).fill(''));
    const [temp, setTemp] = useState(Templates[count].img);
    const [color, setColor] = useState(Colors[0]);
    const [font, setFont] = useState("Open Sans");

    const changeIndex = (event) => {
        event.preventDefault();
        if(event.target.id === "prev"){
            if(count === 0){
                setCount(Templates.length - 1)
            }else{
                setCount(prevCount => prevCount - 1);
            }
        }else{
            if(count === Templates.length - 1){
                setCount(0);
            }else{
                setCount(prevCount => prevCount + 1);
            }
        }
    };

    const updateCapt = (e, idx) =>{
        const text = e.target.value || '';
        setCapt(
            capt.map((c, i) => {
                if(idx ===i){
                    return text
                }else{
                    return c;
                }
            })
        );
    };

    const handleChangeComplete = (color, event) => {
        setColor(color.hex);
    };

    useEffect(() => {
        console.log(Templates[count]);
        setTemp(Templates[count].img);
        setCapt(Array(Templates[count].box_count).fill(''));
    }, [count]);

    useEffect(() =>{
        console.log(capt);
    }, [capt]);




    return(
        <Container fluid className='below-nav width-100 generator'>
            <Row className="justify-content-center vheight-100">
                {/* image space*/}
                <Col xs={12} sm={12} md={5} className="text-center">
                    <Card className="genCard">
                        <Card.Body>
                            <Canvas
                                count={count}
                                temp={temp}
                                capt={capt}
                                color={color}
                                font={font}
                            />
                        </Card.Body>
                        {/* previous/Next button */}
                        <Card.Footer>
                            <Button variant="warning" size="lg" id="prev" /* className="float-left" */ onClick={changeIndex}>{iconLeft}</Button>
                            {" "}
                            <Button variant="warning" size="lg" id="next" /* className="float-right" */ onClick={changeIndex}>{iconRight}</Button>
                        </Card.Footer>
                    </Card>
                </Col>
                {/* image editor space */}
                <Col xs={12} sm={12} md={6} lg={6} >
                    <Form className='toolbar below-img width-100'>
                        {/* Title */}
                        <Form.Group as={Row} controlId="title">
                            <Form.Label column xs={4}>
                                Title
                            </Form.Label>
                            <Col xs={8}>
                                <Form.Control type="text" placeholder="Insert a title" />
                            </Col>
                        </Form.Group>
                        {/* Caption boxes */}
                        {
                            capt.map((_c, idx) => (
                                <Form.Group key={idx} as={Row} controlId={`caption-${idx}`}>
                                    <Form.Label column xs={4}>
                                        {`Caption ${idx+1}`}
                                    </Form.Label>
                                    <Col xs={8}>
                                        <Form.Control type="text" as="textarea" placeholder="Insert text" onChange={(e)=>updateCapt(e, idx)}/>
                                    </Col>
                                </Form.Group>
                            ))
                        }
                        <Form.Group as={Row} controlId="colorPicker" >
                            <Form.Label column xs={4}>
                                Choose a color:
                            </Form.Label>
                            <Col xs={8}>
                                <CirclePicker 
                                    width="294px" 
                                    circleSize={28}
                                    colors={Colors} 
                                    color={color} 
                                    onChangeComplete={handleChangeComplete} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="colorPicker" >
                            <Form.Label column xs={4}>
                                Choose a font:
                            </Form.Label>
                            <Col xs={8}>
                                <FontPicker
                                    id="fontPicker"
                                    apiKey="AIzaSyAFwi_TzGkfslfTV8Fo35Evk3PQ3UAOG18"
                                    activeFontFamily={font}
                                    onChange={(nextFont) => (setFont(nextFont.family))}
                                />
                            </Col>
                        </Form.Group>

                        {/* protected switch */}
                        <Form.Group as={Row}>
                            <Col xs={1}>
                                <Form.Check
                                    type="switch"
                                    //label="Set as protected"
                                    name="formSwitch"
                                    id="private"
                                //checked={isPrivate}
                                //onChange={handleChange}
                                />
                            </Col>
                            <Col xs={11}>Set as protected</Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col className="text-center">
                                <Button type="submit" variant="danger" id="doneButton">Done {iconCheck} </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
                
            </Row>
        </Container>
    );
}

export default Generator;