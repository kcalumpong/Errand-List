import React from 'react';
import './style.css';

const Todo = (props) => {
    return (
        // <div>
        <div
            id={props.todo.id}
            style={{
                width: "500px",
                textDecoration: props.todo.complete ? "line-through" : "",
                borderBottom: "solid .8px grey",
                padding: "10px"
            }}
        >

            <input
                className='form-checkbox'
                type="checkbox"
                onClick={props.toggleComplete} />
            {props.todo.text}

            <button className="addChild" onClick={props.addChild}>+</button>
            </div>
    )
}

export default Todo;