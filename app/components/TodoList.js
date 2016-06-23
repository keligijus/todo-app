import React from "react";
import ReactDOM from "react-dom";

import _ from "lodash";
import $ from "jquery";

import TodoItem from "./TodoItem";

export default class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {tasks: []}

    // this.state = {
    //   tasks: [
    //     {
    //       _id: '1',
    //       createdAt: 1466581504989,
    //       body: 'Remember to feed Cactus',
    //       completed: false,
    //       archived: false
    //     },
    //     {
    //       _id: '2',
    //       createdAt: 1466581326545,
    //       body: 'Your new cat\'s name is Cactus',
    //       completed: true,
    //       archived: false
    //     }
    //   ]
    // }
  }

  componentDidMount() {
    this.serverRequest = $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/tasks',
      crossDomain: true
    });

    this.serverRequest.done((result) => this.setState({ tasks: result }))
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
      url:'http://localhost:3000/api/v1/tasks/' + key,
      dataType: 'json',
      data: {body: newTaskBody}
    }).done((msg) => console.log(msg));

    return this.setState({tasks: state.tasks});
  }

  updateCompletedStatus(key, status) {
    let state = this.state;
    let updatedTask = _.find(state.tasks, {'_id': key});
    let indexOfUpdated = _.indexOf(state.tasks, updatedTask);

    state.tasks[indexOfUpdated].completed = status;

    $.ajax({
      method: 'Put',
      url:'http://localhost:3000/api/v1/tasks/' + key,
      dataType: 'json',
      data: {completed: status}
    }).done((msg) => console.log(msg));

    return this.setState({tasks: state.tasks});
  }

  render() {
    let that = this;

    return (
      <ul class="todo-list">
        {
          this.state.tasks.map(function(task) {
            return <TodoItem  key={task._id}
                              id={task._id}
                              body={task.body}
                              completed={task.completed}
                              archived={task.archived}
                              updateTaskBody={that.updateTaskBody.bind(that)}
                              updateCompletedStatus={that.updateCompletedStatus.bind(that)} />
          })
        }
      </ul>
    );
  }
}
