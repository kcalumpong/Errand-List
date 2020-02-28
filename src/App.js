import React, { Component } from 'react';
import './App.css';
import Todo from './components/Todo';

class App extends Component {

    state = {}

  render() {
    return (
      <div>
        <Todo />
      </div>
    )
  }
}

export default App;
