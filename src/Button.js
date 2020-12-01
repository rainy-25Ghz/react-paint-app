import React, { useState } from "react";
import './App.css';
export const Button = (props) => {
    //const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        //setClicked(!clicked)
        props.onClick();
    }
    //{props.children}嵌套的子组件
    return (
        <div onClick={handleClick} className={props.clicked ? "toolbar-btn-clicked" : "toolbar-btn"}>
            {props.children}
        </div>
    )
}
