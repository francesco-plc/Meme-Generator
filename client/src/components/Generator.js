import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import {Templates, Colors} from '../models/Templates';
import { iconLeft, iconRight, iconCheck } from './Icons';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { CirclePicker } from 'react-color';
import Canvas from './Canvas';
import Meme from '../models/Meme'

function Generator(props) {

    const {addMeme, copyMeme, routerHistory, userId, userName} = props;
   
    const copy = useLocation().state;

    const [count, setCount] = useState(copy ? copy.id_template : 0);                                 // templates array index
    const [title, setTitle] = useState(copy ? copy.title : '');                                      // title set
    const [capt, setCapt] = useState(copy ? [copy.text0, copy.text1, copy.text2, copy.text3] :
                                        Array(Templates[count].box_count).fill('')                   // captions array
                                    );                                                                                                  
    const [temp, setTemp] = useState(copy ? Templates[copy.id_template].img : Templates[count].img );// template set
    const [color, setColor] = useState(copy ? copy.color : Colors[0]);                               // color set
    const [font, setFont] = useState(copy? copy.font : "Arial");                                     // font set
    const [size, setSize] = useState(copy ? copy.size : 50);                                         // font size set
    const [isProtected, setIsProtected] = useState(copy ? copy.isProtected : false);                 // public/protected attribute
    const canvasRef = useRef(null);

    const[isTitleInvalid, setIsTitleInvalid] = useState(false);                                      // variable to check if title is filled
    const[isCaptInvalid, setIsCaptInvalid] = useState(false);                                        // variable to check if a captions is filled

    const isButtonDisabled = (copy ? true : false);
    const isSwitchDisabled = ((copy && copy.user !== userId && copy.isProtected)? true : false);

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

    const handleChangeFont = (e) => {
        setFont(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const id =  Date.now();
        const image = canvasRef.current.toDataURL();
        if((title !== '') && capt.some(text => text !== '')){
            if(isSwitchDisabled){                
                copyMeme(
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
                        1,
                        image,
                        0,
                        userName
                    )
                );
            }else{
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
                        0,
                        userName
                    )
                );
            }            
            routerHistory.push('/');
            console.log(image);
        }else if(title === ''  && capt.some(text => text !== '')){
            setIsTitleInvalid(true);
        }else if(title !== ''  && !capt.some(text => text !== '')){
            setIsCaptInvalid(true);
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
  
    console.log("userId: " + userId);
    //console.log("meme user: " + copy.user);
    console.log("title: " + title );
    console.log("capt: " + capt);
    console.log("font: " + font);
    console.log("size: " + size);
    console.log("isProtected: " + isProtected);

    return(
        <Container fluid className='below-nav width-100 generator pink'>
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
                            <Button variant="warning" size="lg"  className="button" id="prev" /* className="float-left" */ onClick={changeIndex} disabled={isButtonDisabled}>{iconLeft}</Button>
                            {" "}
                            <Button variant="warning" size="lg" className="button" id="next" /* className="float-right" */ onClick={changeIndex} disabled={isButtonDisabled}>{iconRight}</Button>
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
                                <Form.Control type="text" placeholder="Insert a title" isInvalid={isTitleInvalid} onChange={handleTitle} defaultValue={title}/>
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
                                        <Form.Control rows={2} as="textarea" placeholder="Insert text" defaultValue={capt[idx]}
                                            isInvalid={isCaptInvalid} onChange={(e)=>updateCapt(e, idx)}
                                        />
                                        <Form.Control.Feedback type="invalid">At least a caption must be provided.</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            ))
                        }
                        {/* Font selector*/}
                        <Form.Group as={Row} controlId="fontSelector" >
                            <Form.Label column xs={4}>
                                Font:
                            </Form.Label>
                            <Col xs={8}>
                                <Form.Control as="select" onChange={handleChangeFont} defaultValue={font}>
                                    <option value="Arial" id="option1">Arial</option>
                                    <option value="Lucida Handwriting" id="option2">Lucida Handwriting</option>
                                    <option value="Copperplate" id="option3">Copperplate</option>
                                    <option value="Courier New" id="option4">Courier New</option>
                                    <option value="Lucida Console" id="option5">Lucida Console</option>
                                    <option value="Times New Roman" id="option6">Times New Roman</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {/* Font size range*/}
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
                        {/* Color Picker */}
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
                        {/* Public/Protected switch */}
                        <Form.Group as={Row}>
                            <Col xs={1}>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    name="formSwitch" 
                                    onClick={() => setIsProtected(!isProtected)}
                                    label={isProtected ? 'Protected' : 'Public'}
                                    disabled={isSwitchDisabled}
                                />
                            </Col>{/* 
                            <Col xs={10} className="text-left">Set as protected</Col> */}
                        </Form.Group>
                        {/*Generate Meme Button*/}
                        <Form.Group as={Row}>
                            <Col className="text-center">
                                <Button type="submit" className="button" variant="danger" id="doneButton" onClick={handleSubmit}> Done {iconCheck} </Button>
                            </Col>
                        </Form.Group>
                        
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Generator;