import React, { Component } from 'react';
import TodoForm from '../TodoForm';
import Todo from '../Todo';

class TodoList extends Component {

    state = {
        todos: [],
    };


    addTodo = todo => {
        this.setState(state => ({
            todos: [todo, ...state.todos]
        }));
    };

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                    ...todo,
                    complete: !todo.complete
                  }
                } else {
                    return todo;
                }
            })
        })
    }


    render() {
        return (
            <div className="todo-header">
                <TodoForm onSubmit={this.addTodo} />
                {this.state.todos.map(todo => (
                
                <Todo 
                key={todo.id} 
                toggleComplete={() => this.toggleComplete(todo.id)} 
                todo={todo}
                />
                ))}
            </div>
        );
    }
}




export default TodoList;