import React from "react";
import ReactDOM from "react-dom";

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

  render() {
    return (
      <li class="item" id={this.props.id}>
        <input type="text"
                name="task"
                value={this.props.body}
                data-id={this.props.id}
                onChange={this.handleTaskBodyChange.bind(this)} />
        <input type="checkbox"
                checked={this.props.completed}
                name="completed"
                data-id={this.props.id}
                onChange={this.handleCompletedStatus.bind(this)} />
      </li>
    );
  }
}
