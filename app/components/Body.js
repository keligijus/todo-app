import React from "react";
import ReactDOM from "react-dom";

import TodoList from "./TodoList";

export default class Body extends React.Component {
  render() {
    console.log('process: ',process);
    return (
      <TodoList/>
    );
  }
}
