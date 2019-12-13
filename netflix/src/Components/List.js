import React from 'react';
import './App.css';

const List = (props) => {

    return (
        <div>
            <font color="white">{props.name}</font>
            <ul>
                {props.list.map(item => {
                    return (
                        <li key={item.id} >
                            <font color='white'>{item.title}</font>
                            <div className='img-btn-container'>
                                <img src={item.img} alt={item.title}></img>
                                <button className='button' onClick={() => props.click(item.id)}>{props.btnName}</button>
                            </div>
                        </li>

                    )
                })
                }
            </ul>
        </div>
    );
}
export default List;