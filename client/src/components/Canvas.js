import React, { useEffect } from 'react';
import {Templates} from '../models/Templates';

function Canvas(props) {

    const { temp, capt, count, color, font, size, canvasRef, copy, meme, ready, setReady } = props;

    //to fill the canvas area with the selected template + to fill the template with captions when copying
    useEffect(() => {
        if (ready) {
            setReady(false);
            meme.src = Templates[count].img;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;

            setTimeout(() => {
                ctx.drawImage(meme, 0, 0, window.innerWidth, window.innerHeight);

                if (copy) {
                    switch (count) {
                        case 0:
                            ctx.fillText(capt[0], ctx.canvas.width * 0.3, ctx.canvas.height * 0.2);
                            ctx.fillText(capt[1], ctx.canvas.width * 0.8, ctx.canvas.height * 0.3);
                            ctx.fillText(capt[2], ctx.canvas.width * 0.66, ctx.canvas.height * 0.87);
                            break;
                        case 1:
                            ctx.fillText(capt[0], ctx.canvas.width * 0.37, ctx.canvas.height * 0.08);
                            ctx.fillText(capt[1], ctx.canvas.width * 0.75, ctx.canvas.height * 0.48);
                            ctx.fillText(capt[2], ctx.canvas.width * 0.35, ctx.canvas.height * 0.98);
                            ctx.fillText(capt[3], ctx.canvas.width * 0.73, ctx.canvas.height * 0.92);
                            break;
                        case 2:
                            ctx.fillText(capt[0], ctx.canvas.width * 0.72, ctx.canvas.height * 0.69);
                            break;
                        case 3:
                            ctx.fillText(capt[0], ctx.canvas.width * 0.5, ctx.canvas.height * 0.09);
                            ctx.fillText(capt[1], ctx.canvas.width * 0.5, ctx.canvas.height * 0.97);
                            break;
                        case 4:
                            ctx.fillText(capt[0], ctx.canvas.width * 0.5, ctx.canvas.height * 0.13);
                            ctx.fillText(capt[1], ctx.canvas.width * 0.33, ctx.canvas.height * 0.4);
                            ctx.fillText(capt[2], ctx.canvas.width * 0.68, ctx.canvas.height * 0.5);
                            break;
                        case 5:
                            ctx.fillText(capt[0], ctx.canvas.width * 0.43, ctx.canvas.height * 0.27);
                            break;
                        case 6:
                            ctx.fillText(capt[0], ctx.canvas.width * 0.25, ctx.canvas.height * 0.48);
                            ctx.fillText(capt[1], ctx.canvas.width * 0.75, ctx.canvas.height * 0.48);
                            ctx.fillText(capt[2], ctx.canvas.width * 0.25, ctx.canvas.height * 0.98);
                            ctx.fillText(capt[3], ctx.canvas.width * 0.75, ctx.canvas.height * 0.98);
                            break;
                        case 7:
                            ctx.fillText(capt[0], ctx.canvas.width * 0.5, ctx.canvas.height * 0.09);
                            ctx.fillText(capt[1], ctx.canvas.width * 0.5, ctx.canvas.height * 0.33);
                            break;
                        default:
                            break;
                    };
                };
            }, 500);
        }

    }, [temp, meme, canvasRef, capt, count, copy, ready, setReady]);

    //to update canvas area every time a captions or captions attributes(font/size/color) are updated.
    useEffect((meme=new Image()) => {

        meme.src = Templates[count].img;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.font = `${size}px ${font}` 
        ctx.fillStyle = color
        ctx.textAlign = "center"
        ctx.drawImage(meme, 0, 0, window.innerWidth, window.innerHeight);

        if (capt) {
            switch (count) {
                case 0:
                    ctx.fillText(capt[0], ctx.canvas.width * 0.3, ctx.canvas.height * 0.2);
                    ctx.fillText(capt[1], ctx.canvas.width * 0.8, ctx.canvas.height * 0.3);               
                    ctx.fillText(capt[2], ctx.canvas.width * 0.66, ctx.canvas.height * 0.87);
                    break;
                case 1:
                    ctx.fillText(capt[0], ctx.canvas.width * 0.37, ctx.canvas.height * 0.08);
                    ctx.fillText(capt[1], ctx.canvas.width * 0.75, ctx.canvas.height * 0.48);
                    ctx.fillText(capt[2], ctx.canvas.width * 0.35, ctx.canvas.height * 0.98);
                    ctx.fillText(capt[3], ctx.canvas.width * 0.73, ctx.canvas.height * 0.92);
                    break;
                case 2:
                    ctx.fillText(capt[0], ctx.canvas.width * 0.72, ctx.canvas.height * 0.69);
                    break;
                case 3:
                    ctx.fillText(capt[0], ctx.canvas.width * 0.5, ctx.canvas.height * 0.09);
                    ctx.fillText(capt[1], ctx.canvas.width * 0.5, ctx.canvas.height * 0.97);
                    break;
                case 4:
                    ctx.fillText(capt[0], ctx.canvas.width * 0.5, ctx.canvas.height * 0.13);
                    ctx.fillText(capt[1], ctx.canvas.width * 0.33, ctx.canvas.height * 0.4);
                    ctx.fillText(capt[2], ctx.canvas.width * 0.68, ctx.canvas.height * 0.5);
                    break;
                case 5:
                    ctx.fillText(capt[0], ctx.canvas.width * 0.43, ctx.canvas.height * 0.27);
                    break;
                case 6:
                    ctx.fillText(capt[0], ctx.canvas.width * 0.25, ctx.canvas.height * 0.48);
                    ctx.fillText(capt[1], ctx.canvas.width * 0.75, ctx.canvas.height * 0.48);
                    ctx.fillText(capt[2], ctx.canvas.width * 0.25, ctx.canvas.height * 0.98);
                    ctx.fillText(capt[3], ctx.canvas.width * 0.75, ctx.canvas.height * 0.98);
                    break;
                case 7:
                    ctx.fillText(capt[0], ctx.canvas.width * 0.5, ctx.canvas.height * 0.09);
                    ctx.fillText(capt[1], ctx.canvas.width * 0.5, ctx.canvas.height * 0.33);
                    break;
                default:
                    break;
            };
        };
    }, [capt, color, font, size, temp, canvasRef, count, meme]);


    return <canvas ref={canvasRef} className="canvas" />
}


export default Canvas;