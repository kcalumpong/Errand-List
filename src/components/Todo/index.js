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

    taskCompleted = (complete, id, index, value) => {
        const todoItems = {
            id: id,
            value: value,
            complete: !complete,
            children: []
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
            complete: false,
            children: []
        };

        const todos = JSON.parse(localStorage.getItem("todos"))
        todos.splice(index, 1, todoItems)
        localStorage.setItem("todos", JSON.stringify(todos))

        this.setState({
            todos: JSON.parse(localStorage.getItem("todos"))
        })
    };

    addChild = (id, value, complete) => {

    //     {this.state.todos.map((item, index) => {
    //         return (
    //             <div>{item.id}</div>
    //         )
    //     })
    //    }


        const childList = {
            id: id,
            value: value,
            complete: complete,
            children: [
                {
                    id: shortid.generate(),
                    value: this.input.current.value,
                    complete: false,
                }
            ]
        }
        console.log(childList)

        if (localStorage.getItem("children") === null) {
            const children = []
            children.push(childList);
            console.log(children)
            localStorage.setItem("children", JSON.stringify(children))
        } else {
            const children = JSON.parse(localStorage.getItem("todos"))
            children.push(childList)
            localStorage.setItem("children", JSON.stringify(children))
        }
        this.setState({
            todos: JSON.parse(localStorage.getItem("children")),
        })
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
                                    <input type="checkbox" id="checked" checked={item.complete} className="checkbox" onClick={() => this.taskCompleted(item.complete, item.id, index, item.value)}></input>
                                    <input style={{ textDecoration: item.complete ? "line-through" : "" }} className="current-value" name="text" id={item.id} onBlur={event => this.updateTodo(event.target.value, item.id, index)} defaultValue={item.value} />

                                    {/*  */}
                                    <button onClick={() => this.addChild()} className="child-button">+</button>

                                    {this.state.todos.map((child, index) => {
                                        return (
                                            <div className="child" key={child.id}>
                                            <p>{child.children.id}</p>
                                                {/* <input type="checkbox"></input> */}
                                                <input placeholder="add child task" data-key={index}></input>
                                            </div>
                                        )
                                    }
                                    )}


                                    {/*  */}

                                    <button onClick={this.deleteTodo} className="delete-button" value="delete" data-key={index}>DELETE</button>

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









