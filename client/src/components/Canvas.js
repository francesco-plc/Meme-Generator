import React, { useRef, useEffect } from 'react';

function Canvas(props) {

    const canvasRef = useRef(null);
    const { temp, capt, count, color } = props;
    const meme = new Image();

    useEffect(() => {

        meme.src = temp;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        setTimeout(() => {
            ctx.drawImage(meme, 0, 0, window.innerWidth, window.innerHeight);
        }, 350);
        
    }, [temp]);

    useEffect(() =>{

        meme.src = temp;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        ctx.font = "40px Comic Sans MS"
        ctx.fillStyle = color
        ctx.textAlign = "center"
        ctx.drawImage(meme, 0, 0, window.innerWidth, window.innerHeight);
        switch(count){
            case 0:
                ctx.fillText(capt[0], 430, 150);
                ctx.fillText(capt[1], 1150, 200);
                break;
            case 1:
                ctx.fillText(capt[0], 570, 30);              
                ctx.fillText(capt[1], 1150, 321);
                ctx.fillText(capt[2], 570, 680);
                ctx.fillText(capt[3], 1150, 680);
                break;
            case 2:
                ctx.fillText(capt[0], 1100, 505);
                break;
            case 3:
                ctx.fillText(capt[0], 750, 50);
                ctx.fillText(capt[1], 750, 700);
                break;
            case 4:
                ctx.fillText(capt[0], 750, 100);
                ctx.fillText(capt[1], 500, 300);               
                ctx.fillText(capt[2], 1025, 350);
                break;
            case 5:
                ctx.fillText(capt[0], 670, 190);
                break;
            case 6:
                ctx.fillText(capt[0], 350, 340);              
                ctx.fillText(capt[1], 1150, 340)
                ctx.fillText(capt[2], 350, 700);
                ctx.fillText(capt[3], 1150, 700);
                break;
        };

    }, [capt, color]);


    return <canvas ref={canvasRef} className="canvas" />
}


export default Canvas;