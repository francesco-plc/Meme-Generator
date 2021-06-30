import React, { useRef, useEffect } from 'react';

function Canvas(props) {

    const canvasRef = useRef(null);
    const { temp, capt, count } = props;
    const meme = new Image();

    useEffect(() => {

        meme.src = temp;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        setTimeout(() => {
            ctx.drawImage(meme, 0, 0, window.innerWidth, window.innerHeight);
        }, 300);
        
    }, [temp]);

    useEffect(() =>{

        meme.src = temp;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        ctx.font = "20px Comic Sans MS"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.drawImage(meme, 0, 0, window.innerWidth, window.innerHeight);
        ctx.fillText(capt[0], (400 / 2), 25)
        ctx.fillText(capt[1], (400 / 2), 256 + 40 + 25)
    }, [capt]);


    return <canvas ref={canvasRef} className="canvas" />
}


export default Canvas;