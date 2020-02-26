import React, { Component } from 'react';
import TodoForm from '../TodoForm';
import Todo from '../Todo';
import shortid from 'shortid';

class TodoList extends Component {

    state = {
        todos: [
            {
                id: shortid.generate(),
                text: "Todo 1",
                complete: false,
                children: []
            },
            {
                id: shortid.generate(),
                text: "Todo 2",
                complete: false,
                children: []
            },
            {
                id: shortid.generate(),
                text: "Todo 3",
                complete: false,
                children: [
                    {
                        id: shortid.generate(),
                        text: "Child 1",
                        complete: false,
                    },
                    {
                        id: shortid.generate(),
                        text: "Child 2",
                        complete: false,
                    },
                    {
                        id: shortid.generate(),
                        text: "Child 3",
                        complete: false,
                    }
                ]
            }
        ]
    };

    addTodo = todo => {
        this.setState(state => ({
            todos: [todo, ...state.todos]
        }));
        console.log("Hey", this.state)
    };

    addChild = () => {
        console.log("Why do I suck")
        return (
            <div></div>
        )
    }

    parentComplete = (parentId) => {
        console.log("Parent", parentId);
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === parentId) {
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

    childComplete = (childId) => {
        console.log("hitting");
        this.setState({
            todos: this.state.todos.map(child => {
                if (child.children.id === childId) {
                    return {
                        ...child,
                        complete: !child.children.complete
                    }
                } else {
                    return child;
                }
            })
        })
    }

    render() {
        return (

            <div className="todo-header">
                <TodoForm onSubmit={this.addTodo} />
                <ul>
                    {this.state.todos.map((todo, i) => (
                        <Todo
                            key={todo.id}
                            className={i}
                            parentComplete={() => this.parentComplete(todo.id)}
                            childComplete={() => this.childComplete(todo.id)}
                            todo={todo}
                            addChild={this.addChild}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}
export default TodoList;