import {SoftKeyboard} from "../SoftKeyboard";
import {useEffect, useState} from "react";
import {GuessStage} from "../GuessStage";
import {compareWords} from "../../compareWords";
import {COLOR_GREY, COLOR_GREEN, COLOR_YELLOW} from "../../consts/colors";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Game() {
    const [secret, setSecret] = useState(null);
    const [letterArray, setLetterArray] = useState([]);
    const [previousGuessList, setPreviousGuessList] = useState([]);
    const [lettersInfo, setLettersInfo] = useState({});
    const [didGameEnd, setDidGameEnd] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/word`)
            .then((response) => {
                response.json().then((body) => setSecret(body.word))
            })
            .catch(() => showToast('Bir hata oluştu. Lütfen tekrar deneyin.'))
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

    const processGuess = () => {
        let gameEnd = true;
        const newColorArray = compareWords(letterArray, secret);
        const currentGuess = [];
        for (let i = 0; i < letterArray.length; i++) {
            if (newColorArray[i] !== COLOR_GREEN) {
                gameEnd = false;
            }
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
        setDidGameEnd(gameEnd);
    }

    const showToast = (message) => {
        toast(message, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            closeButton: false,
            bodyClassName: 'toastText',
        });
    }

    const onEnterClick = () => {
        if (letterArray.length !== 5) {
            return;
        }
        const guess = letterArray.join('');
        fetch(`${process.env.REACT_APP_BASE_URL}/check-word?word=${guess}`,
            {
                method: 'GET',
            })
            .then((response) => {
                response.json().then((body) => {
                    if (body.exists !== true) {
                        showToast('Kelime listesinde yok.');
                        return;
                    }
                    processGuess();
                })
            })
            .catch(() => showToast('Bir hata oluştu. Lütfen tekrar deneyin.'))
    }

    const onClickLetter = (letter) => {
        if (didGameEnd) {
            return;
        }
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
            <ToastContainer/>
        </>

    )
}
