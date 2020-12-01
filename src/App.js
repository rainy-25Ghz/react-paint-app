
import { ToolBar } from "./ToolBar";
import { Canvas } from "./Canvas";
import React, { useState } from 'react';
const Palette = ({ colors, onColorChange }) => {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const handleClick = (color) => {
        setSelectedColor(color);
        onColorChange(color);
    }
    return (
        <div className="panel" >
            {
                colors.map((color, index) => {
                    if (selectedColor === color) {
                        return (
                            <div className="selected" key={index}>
                                <div
                                    onClick={() => handleClick(color)}
                                    className="div-color"
                                    style={{ backgroundColor: color }}>
                                </div>
                            </div>

                        )
                    }
                    return (
                        <div key={index}
                            onClick={() => handleClick(color)}
                            className="div-color"
                            style={{ backgroundColor: color }}>
                        </div>
                    )
                })
            }
        </div>
    )
}
const App = () => {
    const [color, setColor] = useState("rgb(255, 133, 119)");
    const [mode, setMode] = useState(0);
    const handleColorChange = (color) => {
        setColor(color);
    }
    const handleModeChange = (mode) => {
        setMode(mode);
    }
    return (
        <div>
            <ToolBar onModeChange={handleModeChange}></ToolBar>
            <Canvas mode={mode} color={color}>
            </Canvas>
            <Palette colors={["rgb(255, 133, 119)"/**red */,
                "rgb(27 196 125)"/*green */,
                "rgba(24,160,251,1)"/*blue */,
                "rgb(255, 199, 0)"/**yellow */,
                "rgb(44 44 44)"/**black */
            ]} onColorChange={handleColorChange}></Palette>
        </div>
    )
}


export default App;
