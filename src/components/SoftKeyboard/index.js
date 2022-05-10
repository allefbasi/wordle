import './index.css';
import {LetterSquare} from "../LetterSquare";


export function SoftKeyboard(props) {
    const lettersInfo = props.lettersInfo;
    const keyboardItems = [
        ['E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Ğ', 'Ü'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ş', 'İ'],
        ['ENTER', 'Z', 'C', 'V', 'B', 'N', 'M', 'Ö', 'Ç', '<'],
    ];

    const keyColor = (item) => {
        for (const [letter,color] of Object.entries(lettersInfo)) {
            if (item === letter) {
                return color;
            }
        }
    }

    return (
        <div className='keyboard-container'>
            {
                // keyboardItems.map((item) => <div key={item} className='key'
                //                                  onClick={() => props.onClickLetter(item)}>{item}</div>)
                keyboardItems.map((row, rowCount) =>
                    <div className='keyboard-row-container' key={rowCount}>{row.map((item) =>
                        rowCount === 1 ?
                            <LetterSquare key={item} className='key-second-row'
                                          onClick={() => props.onClickLetter(item)}
                                          value={item}
                                          style={{backgroundColor: keyColor(item)}}
                            /> :
                            rowCount === 2 ?
                                <LetterSquare key={item} className='key'
                                              style={item === 'ENTER' || item === '<' ? {
                                                  width: '58px',
                                                  backgroundColor: keyColor(item)
                                              } : {width: '39px', backgroundColor: keyColor(item)}}
                                              onClick={() => props.onClickLetter(item)} value={item}/> :
                                <LetterSquare key={item} className='key'
                                              onClick={() => props.onClickLetter(item)}
                                              value={item}
                                              style={{backgroundColor: keyColor(item)}}
                                />)}</div>)
            }

        </div>
    )

}
