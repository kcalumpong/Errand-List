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

    addTodo = () => {
        console.log(this.state.todos);
        const todoItems = {
            id: shortid.generate(),
            value: this.input.current.value,
            complete: false
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
            todos: JSON.parse(localStorage.getItem("todos"))
        })

    }

    updateTodo = (event) => {
        let updatedTodo = event
         
        const todoItems = {
             id: shortid.generate(),
             value: updatedTodo,
             complete: false
         };
 
         if (localStorage.getItem("todos") === null) {
             const todos = []
             todos.push(todoItems);
             localStorage.setItem("todos", JSON.stringify(todos))
         } else {
             const todos = JSON.parse(localStorage.getItem("todos"))
             todos.push(updatedTodo, todoItems)
             localStorage.setItem("todos", JSON.stringify(todos))
         }
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
        return (
            <div className="main-container">
                <h1>Errand List</h1>
                <div className="todo-container">
                    {console.log(this.state)}
                    <button onClick={this.addTodo} className="add-button" >+</button>
                    <input className="input-box" type="text" placeholder="Add Task" ref={this.input}></input>
                    <div>
                        {this.state.todos.map((item, index) => {
                            return (
                                <div
                                    className="items" key={item.id}>
                                    <input type="checkbox" className="checkbox"></input>

                                    <input className="current-value" name="text" onBlur={event => this.updateTodo(event.target.value, item.key)} defaultValue={item.value}></input>



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









