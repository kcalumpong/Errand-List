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
            complete: false,
            children: []
        });
        this.setState({
            text: ""
        });
    };

    render() {
        return (
            <div className="todoForm">
                <h1>Errand List</h1>
                <form onSubmit={this.handleSubmit}>
                    <button className="addTask">+</button>
                    <input
                        name="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                        placeholder="Add Task">
                    </input>
                </form>
            </div>
        )
    }
}

export default TodoForm;