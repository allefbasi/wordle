export function LetterSquare(props){
    return (
        <div style={props.style} className={props.className} onClick={props.onClick}>
            {props.value}
        </div>
    )
}
