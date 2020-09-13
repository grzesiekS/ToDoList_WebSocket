import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {
  state = {
    tasks: [],
    taskName: '',
  }

  componentDidMount() {
    this.socket = io('localhost:8000');
    this.socket.emit('updateData');
    this.socket.on('addTask', task => this.addTask(task));
    this.socket.on('removeTask', (taskIndex) => this.removeTask(taskIndex));
    this.socket.on('updateData', tasksServer => this.setState({ tasks: tasksServer }));
  }

  removeTask(taskIndex) {
    this.socket.emit('removeTask', taskIndex);
    this.setState({tasks: this.state.tasks.filter(task => this.state.tasks.indexOf(task) !== taskIndex)});
  }

  updateTaskName(value) {
    this.setState({ taskName: value })
  }

  addTask(task) {
    this.setState({ tasks: [...this.state.tasks, task] })
  }

  submitForm(event) {
    event.preventDefault();
    this.socket.emit('addTask', this.state.taskName);
    this.addTask(this.state.taskName);
    this.updateTaskName('');
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
  
        <form id="add-task-form" onSubmit={event => this.submitForm(event)}>
          <input className="text-input" value={this.state.taskName} onChange={event => this.updateTaskName(event.currentTarget.value)} autoComplete="off" type="text" placeholder="Type your description" id="task-name" />
          <button className="btn" type="submit">Add</button>
        </form>
  
      </section>
    </div>
    );
  };

};

export default App;
