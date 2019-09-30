import React from 'react';

function Button(props) {
    return (
        <button onClick={props.onClick}>{props.id}</button>
    )
}



export default Button;