import React from 'react';
import data from '../data';
import Row from './Row';
function Board() {
    let len = data.length
    let [currentWord, setCurrentWord] = React.useState(data[Math.floor(Math.random() * len)])
    React.useEffect(() => setCurrentWord(currentWord), [currentWord])
    let [boardColor, setBoardColor] = React.useState(Array.from({ length: 6 }, () => Array(5).fill(-1)))
    let [disableRow, setDisableRow] = React.useState([true, false, false, false, false, false])
    let [boardData, setBoardData] = React.useState(Array.from({ length: 6 }, () => Array(5).fill("")))
    let [message, setMessage] = React.useState("")
    let rows = disableRow.map((row, index) => {
        return (
            <Row
                key={index}
                rowIndex={index}
                isCurrentRow={row}
                passData={handleData}
                boardColor={boardColor} />
        )
    })

    function handleData(rowIndex, colIndex, guess) {
        setBoardData((prev) => {
            let newBoard = [...prev]
            newBoard[rowIndex][colIndex] = guess
            return newBoard
        })
    }

    function recolorboard(currentGuess, remainingLetters, currentRow) {
        for (let i = 0; i < 6; i++) {
            if (currentGuess[i] === currentWord[i]) {
                setBoardColor((prev) => {
                    let newColor = [...prev]
                    newColor[currentRow][i] = 2;
                    return newColor
                })
                remainingLetters[i] = null;
            }
        }
        //for grey and yellow
        for (let i = 0; i < 6; i++) {
            if (currentGuess[i] !== currentWord[i]) {
                if (remainingLetters.includes(currentGuess[i])) {
                    setBoardColor((prev) => {
                        let newColor = [...prev];
                        newColor[currentRow][i] = 1;
                        return newColor;
                    });
                    const index = remainingLetters.indexOf(currentGuess[i]);
                    remainingLetters[index] = null;
                } else {
                    setBoardColor((prev) => {
                        let newColor = [...prev];
                        newColor[currentRow][i] = 0;
                        return newColor;
                    });
                }
            }
        }

    }

    function checkWord(word, target) {

        let left = 0;
        let right = len - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (data[mid] === target) {
                return true;
            } else if (data[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return false;
    }
    function displayMessage(gameOver, mess) {
        if (gameOver) {
            setMessage(
                <>
                    {mess} <br />
                    <button className='refresh' onClick={handleRestart}>Restart</button>
                </>
            );
        } else {
            setMessage(mess);
        }
    }
    function handleRestart() {
        window.location.reload(false);
    }
    function handleSubmit() {
        let guess = ''
        let currentRow = -1;

        for (let i = 0; i < 6; i++) {
            if (disableRow[i] === true) currentRow = i;
        }
        let currentGuess = boardData[currentRow]

        for (let i in currentGuess) guess += currentGuess[i]
        if (currentRow !== -1) {
            if (checkWord(currentGuess, guess)) {
                let remainingLetters = currentWord.split('');

                recolorboard(currentGuess, remainingLetters, currentRow);
                if (guess === currentWord) {
                    for (let i = 0; i < 6; i++) {
                        if (disableRow[i] === true) {
                            setDisableRow((prev) => {
                                let newdr = [...prev]
                                newdr[i] = false;
                                return newdr
                            })
                        }
                    }
                    displayMessage(true, 'You guessed the right word')
                    return;
                }
                for (let i = 0; i < 6; i++) {
                    if (disableRow[i] === true) {
                        setDisableRow((prev) => {
                            let newdr = [...prev]
                            newdr[i] = false;
                            return newdr
                        })
                        if (i === 5) {
                            displayMessage(true, `The answer is ${currentWord}`)
                            return
                        }
                        else {
                            setDisableRow((prev) => {
                                let newdr = [...prev]
                                newdr[i + 1] = true;
                                return newdr
                            })
                        }
                    }
                }
                displayMessage(false, '')
            }
            else {
                displayMessage(false, 'Enter correct dictionary word')
                return;
            }
        }
    }




    return (
        <div className='Board'>
            <h1 className='title'>Wordle</h1>
            {rows}
            <button className='submit' onClick={handleSubmit}>Submit</button>
            <div className='message'>{message}</div>
        </div>

    );
}

export default Board;
