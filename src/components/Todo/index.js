import React, { Component } from "react";
import shortid from 'shortid';

class Todo extends Component {

    input = React.createRef()

    state = {
        todos: [],
    }


    componentDidMount() {
        const todos = window.localStorage.getItem("todos");
        const parsedList = JSON.parse(todos);
        if (todos === null) {
            return false
        } else {
            this.setState({ todos: parsedList })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.refs.form.reset();
    }

    addTodo = () => {
        const todoItems = {
            id: shortid.generate(),
            value: this.input.current.value,
            complete: false
        };

        if (localStorage.getItem("todos") === null) {
            const todos = []
            todos.push(todoItems);
            console.log(todos)
            localStorage.setItem("todos", JSON.stringify(todos))
        } else {
            const todos = JSON.parse(localStorage.getItem("todos"))
            todos.push(todoItems)
            localStorage.setItem("todos", JSON.stringify(todos))
        }
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos")),
        })
    }

    taskCompleted = (complete, id, index) => {

        const todoItems = {
            id: id,
            value: this.input.current.value,
            complete: !complete
        };
        console.log(todoItems)

        const todos = JSON.parse(localStorage.getItem("todos"))
        todos.splice(index, 1, todoItems)
        localStorage.setItem("todos", JSON.stringify(todos))

        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
    };

    updateTodo = (event, id, index) => {
        let updatedTodo = event

        const todoItems = {
            id: id,
            value: updatedTodo,
            complete: false
        };

        const todos = JSON.parse(localStorage.getItem("todos"))
        todos.splice(index, 1, todoItems)
        localStorage.setItem("todos", JSON.stringify(todos))

        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
    };

    deleteTodo = (event) => {
        let index = event.target.getAttribute("data-key")
        let todoValue = JSON.parse(localStorage.getItem("todos"));
        todoValue.splice(index, 1)
        this.setState({
            todos: todoValue
        });
        localStorage.setItem("todos", JSON.stringify(todoValue))
    }

    render() {
        const divStyle = {
            textDecoration: this.state.complete ? "line-through" : "", 
            color: "blue",
        };

        return (
            <div className="main-container">
                <h1>Errand List</h1>
                <div className="todo-container">
                    <form onSubmit={this.handleSubmit} ref="form">
                        <button onClick={this.addTodo} className="add-button" >+</button>
                        <input className="input-box" type="text" placeholder="Add Task" ref={this.input}></input>
                    </form>
                    <div>


                        {this.state.todos.map((item, index) => {
                            return (
                                <div
                                    className="items" key={item.id}>


                                    <input type="checkbox" id="checked" className="checkbox" onClick={() => this.taskCompleted(item.complete, item.id, index)}></input>


                                    <input for="checked" style={divStyle} className="current-value" name="text" onBlur={event => this.updateTodo(event.target.value, item.id, index)} defaultValue={item.value} />


                                    <button onClick={this.deleteTodo} className="delete-button" value="delete" data-key={index}>X</button>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default Todo;









