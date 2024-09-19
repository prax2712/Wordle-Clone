import React from 'react';
import Cells from './Cells';

function Row(props) {
    const cells = Array.from({ length: 5 }, (_, index) => (
        <Cells
            key={index}
            className='Cells'
            isCurrentRow={props.isCurrentRow}
            rowIndex={props.rowIndex}
            colIndex={index.toString()}
            onValueChange={props.passData}
            boardColor={props.boardColor}
        />
    ));

    return (
        <div className='Row'>
            {cells}
        </div>
    );
}

export default Row;