import {SoftKeyboard} from "../SoftKeyboard";
import {useEffect, useState} from "react";
import {GuessStage} from "../GuessStage";
import {compareWords} from "../../compareWords";
import {COLOR_GREY, COLOR_GREEN, COLOR_YELLOW} from "../../consts/colors";

export function Game() {
    const [secret, setSecret] = useState(null);
    const [letterArray, setLetterArray] = useState([]);
    const [previousGuessList, setPreviousGuessList] = useState([]);
    const [lettersInfo, setLettersInfo] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/word`)
            .then((response) => {
                response.json().then((body) => setSecret(body.word))
            })
            .catch(() => (alert('Error! Unable to connect backend.')))
    }, [])

    // useEffect(() => {
    //     fetch('http://localhost:5999/session',
    //         {
    //             method: 'POST',
    //             body: JSON.stringify({username: 'sueda', password: '123456'}),
    //             headers: {'content-type': 'application/json'}
    //         })
    //         .then((response) => console.log(response))
    //         .catch((error) => console.log('hata', {error}))
    // }, [])


    const onEnterClick = () => {
        if (letterArray.length === 5) {
            const newColorArray = compareWords(letterArray, secret);
            const currentGuess = [];
            for (let i = 0; i < letterArray.length; i++) {
                const letterObject = {value: letterArray[i], color: newColorArray[i]};
                currentGuess.push(letterObject);
                for (const guess of currentGuess) {
                    const prevColor = lettersInfo[guess.value];
                    if (!prevColor) {
                        lettersInfo[guess.value] = guess.color;
                    } else if (prevColor === COLOR_GREY) {
                        lettersInfo[guess.value] = guess.color;
                    } else if (prevColor === COLOR_YELLOW) {
                        if (guess.color === COLOR_GREEN) {
                            lettersInfo[guess.value] = guess.color;
                        }
                    } else if (prevColor === COLOR_GREEN) {
                        // do nothing
                    }
                }
            }
            setLettersInfo(lettersInfo);
            setPreviousGuessList([...previousGuessList, currentGuess]);
            setLetterArray([]);
        }
    }

    const onClickLetter = (letter) => {
        if (letter === 'DEL') {
            const newArray = [...letterArray];
            newArray.pop();
            setLetterArray(newArray);
            return;
        }
        if (letter === 'ENTER') {
            onEnterClick();
            return;
        }

        if (letterArray.length >= 5) {
            return;
        }
        const newArray = [...letterArray, letter];
        setLetterArray(newArray);
    }

    if (!secret) {
        return (
            <div>LOADING...</div>
        )
    }
    return (
        <>
            <div style={{height: '70vh'}}>
                {/*<GuessStage value={letter}/>*/}
                {/*<GuessStage previousGuessList={previousGuessList} value={letterArray}/>*/}
                <GuessStage previousGuessList={previousGuessList} letterArray={letterArray}/>
            </div>
            <div style={{height: '30vh'}}>
                <SoftKeyboard lettersInfo={lettersInfo} onClickLetter={(letter) => onClickLetter(letter)}/>
            </div>
        </>

    )
}
