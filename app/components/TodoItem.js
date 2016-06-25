import React from "react";
import ReactDOM from "react-dom";

import classNames from 'classnames/bind';

export default class TodoItem extends React.Component {
  handleTaskBodyChange(e) {
    let taskBody = e.target.value;
    let key = e.target.attributes['data-id'].value;

    this.props.updateTaskBody(key, taskBody);
  }

  handleCompletedStatus(e) {
    let status = e.target.checked;
    let key = e.target.attributes['data-id'].value;

    this.props.updateCompletedStatus(key, status);
  }

  handleDelete(e) {
    let key = e.target.attributes['data-id'].value;

    this.props.deleteTask(key, status);
  }

  render() {
    let className = classNames({
      completed: this.props.completed
    });

    return (
      <li class="item" id={this.props.id} class={className}>
        <input type="checkbox"
                checked={this.props.completed}
                name="completed"
                data-id={this.props.id}
                onChange={this.handleCompletedStatus.bind(this)} />
        <input type="text"
                name="task"
                value={this.props.body}
                data-id={this.props.id}
                onChange={this.handleTaskBodyChange.bind(this)} />
        <button name="delete"
                data-id={this.props.id}
                onClick={this.handleDelete.bind(this)}>X</button>
      </li>
    );
  }
}
