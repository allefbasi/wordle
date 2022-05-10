import './index.css';

export function Square(props) {

    return (
        <div onKeyDown={props.onKeyDown} tabIndex={0} className='square' autofocus={'autofocus'}>
            {props.value}
        </div>
    )
}
