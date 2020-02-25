import React from 'react';
import './style.css';

const Todo = (props) => {
    return (
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
                className='checkbox-color'
                type="checkbox"
                onClick={props.toggleComplete} />
            {props.todo.text}
        </div>
    )
}

export default Todo;