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
      <li key={todo.id}>
        <EditableTodo todo={todo} update={update} remove={remove} />
      </li>
    ));
  }

  return (
    <div>
      <ul>{renderTodoList()}</ul>
    </div>
  )
}

export default EditableTodoList;
