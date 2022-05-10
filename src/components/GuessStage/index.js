import './index.css'
import {LetterSquare} from "../GuessLetterSquare";

export function GuessStage(props) {
    const letterOfGuess = Array(5).fill('');
    const guesses = Array(6).fill(null);
    const previousGuessList = props.previousGuessList;
    const letterArray = props.letterArray;

    return (
        <div className='guess-stage-container'>
            {
                guesses.map((guess, guessIndex) => (
                    previousGuessList.length > guessIndex ?
                        <div key={`row${guessIndex}`} className='guess-row-container'>
                            {previousGuessList[guessIndex].map((letter, letterIndex) =>
                                <LetterSquare key={`row${guessIndex}letter${letterIndex}`}
                                              style={{backgroundColor:letter.color}}
                                              className='letter-container' value={letter.value}/>
                            )}
                        </div> :
                        previousGuessList.length === guessIndex ?
                            <div key={`row${guessIndex}`} className='guess-row-container'>
                                {letterOfGuess.map((letter, letterIndex) =>
                                    <LetterSquare key={`letter${letterIndex}`}
                                                  className='letter-container' value={letterArray[letterIndex]}/>
                                )}
                            </div> :
                            <div key={`row${guessIndex}`} className='guess-row-container'>
                                {letterOfGuess.map((letter, letterIndex) =>
                                    <LetterSquare key={`letter${letterIndex}`}
                                                  className='letter-container'/>
                                )}
                            </div>
                ))
            }
        </div>

    )
}
