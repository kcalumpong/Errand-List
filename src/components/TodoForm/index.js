import React, { Component } from 'react';
import "./style.css";
import shortid from 'shortid';

class TodoForm extends Component {

    state = {
        text: ""
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit({
            id: shortid.generate(),
            text: this.state.text,
            complete: false
        }); 
        this.setState({
            text: ""
        });
    };

    render() {
        return (

            <div className="todoForm">
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                        placeholder="Task Name">
                    </input>

                <button onSubmit={this.handleSubmit} className="saveButton">Add Task</button>
                </form>
            </div>
        )
    }

}


export default TodoForm;
