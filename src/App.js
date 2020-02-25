import React, { Component } from 'react';
import './App.css';
import Navtabs from './components/Navtabs';
// import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

class App extends Component {

    state = {}

  // componentDidMount() {
  //   const task = localStorage.getItem('task');
  //   this.setState({ task })
  // }


  render() {
    return (
      <div>
        <Navtabs />
        <TodoList />
      </div>
    )
  }
}

export default App;
