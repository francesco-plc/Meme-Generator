import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import {Templates, Colors} from '../models/Templates';
import {iconLeft, iconRight, iconCheck} from './Icons';
import { useEffect, useState, useRef } from 'react';
import { CirclePicker } from 'react-color';
import FontPicker from "font-picker-react";
import Canvas from './Canvas';
import Meme from '../models/Meme'

function Generator(props) {

    //const {copy} = props;
    const {addMeme, routerHistory} = props;
    
    const [count, setCount] = useState(0);                                              // templates array index
    const [title, setTitle] = useState('');                                             // title set
    const [capt, setCapt] = useState(Array(Templates[count].box_count).fill(''));       // captions array 
    const [temp, setTemp] = useState(Templates[count].img);                             // template set
    const [color, setColor] = useState(Colors[0]);                                      // color set
    const [font, setFont] = useState("Open Sans");                                      // font set
    const [size, setSize] = useState(50);                                               // font size set
    const [isProtected, setIsProtected] = useState(false);                              // public/protected attribute
    const canvasRef = useRef(null);

    const[isTitleInvalid, setIsTitleInvalid] = useState(false);                         // variable to check if title is filled
    const[isCaptInvalid, setIsCaptInvalid] = useState(false);

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

    const handleTitle = (event)=>{
        setTitle(event.target.value);
        setIsTitleInvalid(false);
    };

    const updateCapt = (e, idx) =>{
        const text = e.target.value || '';
        setCapt(
            capt.map((c, i) => {
                if(idx === i){
                    return text
                }else{
                    return c;
                }
            })
        );
        setIsCaptInvalid(false);
    };

    const handleChangeComplete = (color, event) => {
        setColor(color.hex);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const id =  Date.now();
        const image = canvasRef.current.toDataURL();
        console.log(image);
        if((title !== '') && capt.some(text => text !== '')){
            addMeme(
                new Meme(
                    id,
                    count,
                    title,
                    capt[0],
                    capt[1],
                    capt[2],
                    capt[3],
                    color,
                    font,
                    size,
                    isProtected,
                    image,
                    0
                )
            );
            routerHistory.push('/');
        } else {
            setIsTitleInvalid(true);
            setIsCaptInvalid(true);
        }
    }

    useEffect(() => {
        console.log(Templates[count]);
        setTemp(Templates[count].img);
        setCapt(Array(Templates[count].box_count).fill(''));
    }, [count]);

    useEffect(() =>{
        console.log(capt);
    }, [capt]);



    console.log(isProtected);
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
                                size={size}
                                canvasRef={canvasRef}
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
                                <Form.Control type="text" placeholder="Insert a title" isInvalid={isTitleInvalid} onChange={handleTitle/* (e)=>setTitle(e.target.value) */}/>
                                <Form.Control.Feedback type="invalid">Title must be provided.</Form.Control.Feedback>
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
                                        <Form.Control rows={2} as="textarea" placeholder="Insert text"  
                                            isInvalid={isCaptInvalid} onChange={(e)=>updateCapt(e, idx)}
                                        />
                                        <Form.Control.Feedback type="invalid">At least a caption must be provided.</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            ))
                        }
                        <Form.Group as={Row} controlId="colorPicker" >
                            <Form.Label column xs={4}>
                                Color:
                            </Form.Label>
                            <Col xs={8} className="mt-1">
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
                                Font:
                            </Form.Label>
                            <Col xs={8}>
                                {/* <FontPicker
                                    id="fontPicker"
                                    apiKey="AIzaSyAFwi_TzGkfslfTV8Fo35Evk3PQ3UAOG18"
                                    activeFontFamily={font}
                                    onChange={(nextFont) => (setFont(nextFont.family))}
                                /> */}
                                <Form.Control as="select">
                                    <option selected id="o1">Arial</option>
                                    <option value="1" id="o2">Lucida Handwriting</option>
                                    <option value="2" id="o3">Copperplate</option>
                                    <option value="3" id="o4">Courier New</option>
                                    <option value="4" id="o5">Lucida Console</option>
                                    <option value="5" id="o6">Times New Roman</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} controlId="textRange">
                            <Form.Label column xs={4}>Size:</Form.Label>
                            <Col md={4} sm={4} xs={6} className="mt-2">
                               <input type="range" className="custom-range" id="customRange1" 
                                min="10" max="120" step="2"
                                value={size}
                                onChange={(event) => setSize(event.target.value)}
                               />
                            </Col>
                        </Form.Group>

                        {/* protected switch */}
                        <Form.Group as={Row}>
                            <Col xs={1}>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    name="formSwitch" 
                                    onClick={() => setIsProtected(!isProtected)}
                                    label={isProtected ? 'Protected' : 'Public'}
                                //checked={isPrivate}
                                //onChange={handleChange}
                                />
                            </Col>{/* 
                            <Col xs={10} className="text-left">Set as protected</Col> */}
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col className="text-center">
                                <Button type="submit" variant="danger" id="doneButton" onClick={handleSubmit}> Done {iconCheck} </Button>
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Generator;