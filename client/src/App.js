import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {
  state = {
    tasks: [],
  }

  removeTask(taskIndex) {
    const newTasks = this.state.tasks;
    this.setState({task: newTasks.splice(taskIndex, 1)});
  }

  componentDidMount() {
    this.socket = io('localhost:8000');
  }

  render() {
    return (
      <div className="App">

      <header>
        <h1>ToDoList.app</h1>
      </header>
  
      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>
  
        <ul className="tasks-section__list" id="tasks-list">
          {this.state.tasks.map(task => (
            <li className="task" key={this.state.tasks.indexOf(task)}>{task} 
              <button className="btn btn--red" onClick={() => this.removeTask(this.state.tasks.indexOf(task)) }>Remove</button>
            </li>
          ))}
        </ul>
  
        <form id="add-task-form">
          <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" />
          <button className="btn" type="submit">Add</button>
        </form>
  
      </section>
    </div>
    );
  };

};

export default App;
