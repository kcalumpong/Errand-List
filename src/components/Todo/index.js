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
            complete: false,
            children: []
        };
        if (localStorage.getItem("todos") === null) {
            const todos = []
            todos.push(todoItems);
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

    addChild = (index) => {
        const child = {
            id: shortid.generate(),
            value: this.input.current.value,
            complete: false,
        }

        if (localStorage.getItem("todos") === null) {
            const todos = []
            todos[0].children.push(child);
            localStorage.setItem("todos", JSON.stringify(todos))
        } else {
            const todos = JSON.parse(localStorage.getItem("todos"))
            todos[index].children.push(child)
            localStorage.setItem("todos", JSON.stringify(todos))
        }
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos")),
        })
    }

    updateTodo = (event, index) => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        let updatedTodo = event

        todos[index].value = updatedTodo
        localStorage.setItem("todos", JSON.stringify(todos))
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
    }

    updateChild = (event, index, childIndex) => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        const updatedChildTodo = event

        const childItems = {
            id: todos[index].children[childIndex].id,
            value: updatedChildTodo,
            complete: false
        }

        todos[index].children[childIndex] = childItems;
        localStorage.setItem("todos", JSON.stringify(todos))
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
    }

    taskCompleted = (complete, index) => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        todos[index].complete = !complete;
        localStorage.setItem("todos", JSON.stringify(todos))
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
    };

    childTaskCompleted = (complete, index, childIndex) => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        todos[index].children[childIndex].complete = !complete;
        localStorage.setItem("todos", JSON.stringify(todos))
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
    };

    parentChildCompleted = () => {
        // need to add this function
    }

    deleteTodo = (event) => {
        let index = event.target.getAttribute("data-key")
        let todoValue = JSON.parse(localStorage.getItem("todos"));
        todoValue.splice(index, 1)
        this.setState({
            todos: todoValue
        });
        localStorage.setItem("todos", JSON.stringify(todoValue))
    }

    deleteChild = (index, childIndex) => {

        console.log(childIndex)

        let todo = JSON.parse(localStorage.getItem("todos"));
        // console.log(childValue)
        todo[index].children.splice(childIndex, 1)
        this.setState({
            todos: todo
        });
        localStorage.setItem("todos", JSON.stringify(todo))
    }

    render() {
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
                                    <input type="checkbox" id="checked" checked={item.complete} className="checkbox" onChange={() => this.taskCompleted(item.complete, index)} />
                                    <input style={{ textDecoration: item.complete ? "line-through" : "" }} className="current-value" name="text" id={item.id} onBlur={event => this.updateTodo(event.target.value, index)} defaultValue={item.value} />
                                    <button onClick={this.addChild.bind(this, index)} className="child-button">+</button>
                                    <button onClick={this.deleteTodo} className="delete-button" value="delete" data-key={index}>X</button>
                                    {item.children.map((child, childIndex) => {
                                        return (
                                            <div className="child" key={child.id}>
                                                <input type="checkbox" id="checked" checked={child.complete} className="checkbox" onChange={() => this.childTaskCompleted(child.complete, index, childIndex)} />
                                                <input style={{ textDecoration: child.complete ? "line-through" : "" }} className="childInput" id={child.id} onBlur={event => this.updateChild(event.target.value, index, childIndex)} data-key={childIndex} defaultValue={child.value} />
                                                <button onClick={this.deleteChild.bind(this, index, childIndex)} className="delete-button" value="delete" data-key={childIndex}>X</button>
                                            </div>
                                        )
                                    }
                                    )}
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