import React from "react";
import ReactDOM from "react-dom";

import _ from "lodash";
import $ from "jquery";

import TodoItem from "./TodoItem";

import classNames from 'classnames/bind';

export default class TodoList extends React.Component {
  constructor() {
    super();

    let hideCompleted = window.localStorage.hideCompleted === 'true' ? true : false;

    this.state = {
      tasks: [],
      hideCompleted: hideCompleted
    }
  }

  componentDidMount() {
    this.serverRequest = $.ajax({
      method: 'GET',
      url: 'http://todoapp-keligijus.rhcloud.com/api/v1/tasks',
      crossDomain: true
    });

    this.serverRequest.done((result) => this.setState({ tasks: result}));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  updateTaskBody(key, newTaskBody) {
    let state = this.state;
    let updatedTask = _.find(state.tasks, {'_id': key});
    let indexOfUpdated = _.indexOf(state.tasks, updatedTask);

    state.tasks[indexOfUpdated].body = newTaskBody;

    $.ajax({
      method: 'Put',
      url:'http://todoapp-keligijus.rhcloud.com/api/v1/tasks/' + key,
      dataType: 'json',
      data: {body: newTaskBody}
    }).done(msg => {
      // console.log(msg)
      return this.setState({tasks: state.tasks});
    });
  }

  updateCompletedStatus(key, status) {
    let state = this.state;
    let updatedTask = _.find(state.tasks, {'_id': key});
    let indexOfUpdated = _.indexOf(state.tasks, updatedTask);

    state.tasks[indexOfUpdated].completed = status;

    $.ajax({
      method: 'PUT',
      url:'http://todoapp-keligijus.rhcloud.com/api/v1/tasks/' + key,
      dataType: 'json',
      data: {completed: status}
    }).done(msg => {
      // console.log(msg)
      return this.setState({tasks: state.tasks});
    });
  }

  addNewTask(e) {
    let that = this;
    let target = e.target.children[0];
    let taskBody = target.value;

    e.preventDefault();

    if (!taskBody) { return; }

    $.ajax({
      method: 'POST',
      url:'http://todoapp-keligijus.rhcloud.com/api/v1/tasks',
      dataType: 'json',
      data: {body: taskBody}
    }).done(response => {
      let tasks = that.state.tasks;

      target.value = '';
      tasks.unshift(response);

      return that.setState({tasks: tasks});
    });
  }

  deleteTask(key) {
    let that = this;

    $.ajax({
      method: 'DELETE',
      url:'http://todoapp-keligijus.rhcloud.com/api/v1/tasks/' + key,
      dataType: 'json'
    }).done(response => {
      let tasks = that.state.tasks;
      let deletedTask = _.find(tasks, {'_id': key});
      let indexOfDeleted = _.indexOf(tasks, deletedTask);

      tasks.splice(indexOfDeleted, 1);

      return that.setState({tasks: tasks});
    })
  }

  toggleCompleted(e) {
    let isChecked = e.target.checked;

    window.localStorage.hideCompleted = isChecked;

    return this.setState({hideCompleted: isChecked});
  }


  render() {
    let that = this;
    let className = classNames({
      "hide-completed": this.state.hideCompleted
    });

    return (
      <ul class={"todo-list " + className}>
        <li>
          <form onSubmit={this.addNewTask.bind(this)} class="full-width">
            <input type="text"
                  placeholder="add new task"/>
          </form>
        </li>
        {
          this.state.tasks.map(function(task) {
            return <TodoItem  key={task._id}
                              id={task._id}
                              body={task.body}
                              completed={task.completed}
                              updateTaskBody={that.updateTaskBody.bind(that)}
                              updateCompletedStatus={that.updateCompletedStatus.bind(that)}
                              deleteTask={that.deleteTask.bind(that)} />
          })
        }
        <li class="toggle-hide-completed">
          <label for="hideCompleted">Hide Completed
            <input type="checkbox"
                  checked={this.state.hideCompleted}
                  name="hideCompleted"
                  id="hideCompleted"
                  onChange={this.toggleCompleted.bind(this)} />
          </label>
        </li>
      </ul>
    );
  }
}
