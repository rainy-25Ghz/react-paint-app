import React, { useState } from 'react';
export const CursorContext = React.createContext();
const CursorContextProvider = (props) => {
    const [cursor, setCursor] = useState({ isPen: false, isPencil: false });
    return (
        <CursorContext.Provider value={[cursor, setCursor]}>
            {props.children}
        </CursorContext.Provider>
    )
}
export default CursorContextProvider;