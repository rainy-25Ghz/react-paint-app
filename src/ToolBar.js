import { useState } from 'react';
import { Button } from "./Button";
import { PenIcon, SelectorIcon, PencilIcon, TextIcon, ImageIcon, ArrowIcon, RectangleIcon, CircleIcon, LineIcon } from "./Icons";
import "./App.css"
export const ToolBar = ({ onModeChange }) => {
    const initialState = [{ id: 0, clicked: true }, { id: 1, clicked: false }, { id: 2, clicked: false }, { id: 3, clicked: false }, { id: 4, clicked: false },
    { id: 5, clicked: false }, { id: 6, clicked: false }, { id: 7, clicked: false }];
    const [state, setState] = useState(initialState);
    const handleClick = (id) => {
        const newState = Array(8).fill({}).map((value, index) => {
            if (id === index) {
                onModeChange(id);
                return { id: index, clicked: true };
            }
            else {
                return { id: index, clicked: false };
            }

        })
        setState(newState);
    }
    return (
        <div className="toolbar">
            <Button onClick={() => handleClick(0)} clicked={state[0].clicked} id={0}>
                <PencilIcon></PencilIcon>
            </Button>
            <Button onClick={() => handleClick(1)} clicked={state[1].clicked} id={1}>
                <PenIcon></PenIcon>
            </Button>

            <Button onClick={() => handleClick(2)} clicked={state[2].clicked} id={2}>
                <TextIcon></TextIcon>
            </Button>
            <Button onClick={() => handleClick(3)} clicked={state[3].clicked} id={3}>
                <ImageIcon></ImageIcon>
            </Button>
            <Button onClick={() => handleClick(4)} clicked={state[4].clicked} id={4}>
                <ArrowIcon></ArrowIcon>
            </Button>
            <Button onClick={() => handleClick(5)} clicked={state[5].clicked} id={5}>
                <RectangleIcon />
            </Button>
            <Button onClick={() => handleClick(6)} clicked={state[6].clicked} id={6}>
                <CircleIcon />
            </Button>
            <Button onClick={() => handleClick(7)} clicked={state[7].clicked} id={7}>
                <LineIcon />
            </Button>

        </div>
    )
}