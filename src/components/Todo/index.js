import React, { Component } from "react";
import shortid from 'shortid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

    expand = (index, expanded) => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        todos[index].expanded = !expanded;
        localStorage.setItem("todos", JSON.stringify(todos))
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
    }

    addTodo = () => {
        const todoItems = {
            id: shortid.generate(),
            value: this.input.current.value,
            complete: false,
            expanded: true,
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
        const updatedTodo = event
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
        todos[index].children.forEach(child => child.complete = todos[index].complete)
        localStorage.setItem("todos", JSON.stringify(todos))
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
    }

    childTaskCompleted = (complete, index, childIndex) => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        todos[index].children[childIndex].complete = !complete;
        localStorage.setItem("todos", JSON.stringify(todos))
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
        if (todos[index].children.every(child => child.complete === true)) {
            todos[index].complete = true
        } else {
            todos[index].complete = false
        }
        localStorage.setItem("todos", JSON.stringify(todos))
        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
    }

    deleteTodo = (event) => {
        const index = event.target.getAttribute("data-key")
        const todoValue = JSON.parse(localStorage.getItem("todos"));
        todoValue.splice(index, 1)
        this.setState({
            todos: todoValue
        });
        localStorage.setItem("todos", JSON.stringify(todoValue))
    }

    deleteChild = (index, childIndex) => {
        const todo = JSON.parse(localStorage.getItem("todos"));
        todo[index].children.splice(childIndex, 1)
        this.setState({
            todos: todo
        });
        localStorage.setItem("todos", JSON.stringify(todo))
    }

    render() {
        console.log(this.state)
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
                                <div className="items" key={item.id}>
                                    <input type="checkbox" id="checked" checked={item.complete} className="checkbox" onChange={() => this.taskCompleted(item.complete, index)} />
                                    <FontAwesomeIcon icon={faChevronRight} size="xs" style={{ transform: item.expanded ? "rotate(90deg)" : "" }} type="button" id="expand-button" className="collapsible" data-key={index} onClick={() => this.expand(index, item.expanded)} />
                                    <input style={{ textDecoration: item.complete ? "line-through" : "" }} className="current-value" name="text" id={item.id} onBlur={event => this.updateTodo(event.target.value, index)} defaultValue={item.value} />
                                    <button onClick={this.addChild.bind(this, index)} className="child-button">+ ADD</button>
                                    <button onClick={this.deleteTodo} className="delete-button" value="delete" data-key={index}>DELETE</button>
                                    {item.children.map((child, childIndex) => {
                                        return (
                                            <div className={`child-content${this.state.todos[index].expanded ? " expanded" : ""}`}>
                                                <div key={child.id} className="child">
                                                    <input type="checkbox" id="checked" checked={child.complete} className="checkbox" onChange={() => this.childTaskCompleted(child.complete, index, childIndex)} />
                                                    <input style={{ textDecoration: child.complete ? "line-through" : "" }} className="childInput" id={child.id} onBlur={event => this.updateChild(event.target.value, index, childIndex)} data-key={childIndex} defaultValue={child.value} />
                                                    <button onClick={this.deleteChild.bind(this, index, childIndex)} className="delete-child-button" value="delete" data-key={childIndex}>X</button>
                                                </div>
                                            </div>
                                        )}
                                    )}
                                </div>
                            )})}
                    </div>
                </div>
            </div>
        )
    }
}

export default Todo;