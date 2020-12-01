import React, { useState, useEffect, useRef } from 'react';
import "./App.css";
const redrawPath = (ctx, path) => {
    ctx.beginPath();
    ctx.strokeStyle = path.color;
    ctx.lineWidth = 1;
    ctx.moveTo(path.pts[0], path.pts[0]);
    for (const pt of path.pts) {
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
    }
}
const canvasEffectForRectangle = (canvas, mode, color) => {

}
const canvasEffectForPenCil = (canvas, mode, color, setPath, setPaths, paths) => {
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let path = { pts: [], color: color, minX: 10000, minY: 10000, maxX: -1, maxY: -1 };
    const handleMouseDown = (e) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.moveTo(e.offsetX, e.offsetY);

        isDrawing = true;
    }
    const handleMouseUp = () => {
        isDrawing = false;
        console.log(path);
        const path_ = { pts: [...path.pts], color: color, minX: path.minX, minY: path.minY, maxX: path.maxX, maxY: path.maxY };
        setPath(path_);
        setPaths([...paths, path_]);
        //redrawPath(ctx, path_);
        path.pts = [];
    }
    const handleMouseLeave = () => {
        isDrawing = false;
    }
    const handleMouseMove = (e) => {
        if (isDrawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            path.pts.push({ x: e.offsetX, y: e.offsetY });
            if (e.offsetX > path.maxX) {
                path.maxX = e.offsetX;
            }
            if (e.offsetY > path.maxY) {
                path.maxY = e.offsetY;
            }
            if (e.offsetX < path.minX) {
                path.minX = e.offsetX;
            }
            if (e.offsetY < path.minY) {
                path.minY = e.offsetY;
            }
        }
    }
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    return () => {
        console.log("cleared");
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
    }
}
export const Canvas = ({ mode, color }) => {
    const canvasRef = useRef(null);
    const [path, setPath] = useState({ pts: [], color: color, minX: 10000, minY: 10000, maxX: -1, maxY: -1 });
    const [paths, setPaths] = useState([]);
    useEffect(() => {
        return canvasEffectForPenCil(canvasRef.current, mode, color, setPath, setPaths, paths);
    }, [mode, color, path, paths]);
    return (
        <div className="back-div" >
            <canvas
                ref={canvasRef}
                width="1000px"
                height="500px"
                id="canvas1"
                className="paint-canvas"
            >
            </canvas>
        </div>
    )
}
