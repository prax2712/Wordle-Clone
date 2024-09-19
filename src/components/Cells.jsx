

import React, { useRef } from 'react';

function Cells(props) {
    const inputRef = useRef(null);

    function renderColor() {
        let cno = props.boardColor[props.rowIndex][props.colIndex];
        if (cno === -1) return 'lightgray';
        else if (cno === 0) return 'darkgray';
        else if (cno === 1) return 'yellow';
        else if (cno === 2) return 'lightgreen';
    }

    const [value, setValue] = React.useState("");

    function takeInput(e) {
        const newValue = e.target.value.toLowerCase();
        if (/[a-z]/.test(newValue)) {
            setValue(newValue);
            props.onValueChange(props.rowIndex, props.colIndex, newValue);
            const nextSibling = inputRef.current.nextElementSibling;
            if (nextSibling) {
                nextSibling.focus();
            }
        }
    }

    return (
        <input
            ref={inputRef}
            type="text"
            maxLength="1"
            onChange={takeInput}
            disabled={!props.isCurrentRow}
            style={{
                width: '40px',
                height: '40px',
                border: '2px solid darkgray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px',
                color: 'black',
                backgroundColor: renderColor(),
                textAlign: 'center',
            }}
        />
    );
}

export default Cells;