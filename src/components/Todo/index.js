import React from 'react';
import './style.css';

const Todo = (props) => {
    return (
        <li
            style={{
                textDecoration: props.todo.complete ? "line-through" : ""
            }}
        >
            <input
                className='form-checkbox'
                type="checkbox"
                onClick={props.parentComplete} />
            {props.todo.text}
            <button className="addChild" onClick={props.addChild}>+</button>
            <ul>
                {props.todo.children.map(child => (
                    <li
                        style={{
                            textDecoration: child.complete ? "line-through" : ""
                        }}
                    >
                        <input
                            className='form-checkbox'
                            type="checkbox"
                            onClick={props.childComplete} />
                        {child.text}
                    </li>
                ))}
            </ul>
        </li>
    )
}

export default Todo;