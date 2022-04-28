import React from "react";
import EditableTodo from "./EditableTodo";

/** Show list of editable todos.
 *
 * Props:
 * - todos: array of [ todo, ... ]
 * - update(): fn to call to update a todo
 * - remove(): fn to call to remove a todo
 *
 * TodoApp -> EditableTodoList -> [ EditableTodo, ... ]
 */

function EditableTodoList({ todos, update, remove }) {
  function renderTodoList() {
    return todos.map((todo) => (
      <li>
        <EditableTodo todo={todo} update={update} remove={remove} />
      </li>
    ));
  }

  return <ul>{renderTodoList()}</ul>;
}

export default EditableTodoList;
