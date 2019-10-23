import React from 'react';

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.id}</button>
    )
}

 
export default Button;