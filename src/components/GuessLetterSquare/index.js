import './index.css'
export function LetterSquare(props) {

    return (
        <>
            <div style={props.style} className={props.className}>{props.value}</div>
        </>
    )
}
