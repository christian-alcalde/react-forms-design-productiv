import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import TopTodo from "./TopTodo";
import EditableTodoList from "./EditableTodoList";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

/** App for managing a todo list.
 *
 * Props:
 * - initialTodos: possible array of [ todo, ... ]
 *
 * State:
 * - todos: array of [ todo, ... ]
 *
 * App -> TodoApp -> { TodoForm, EditableTodoList }
 */

function TodoApp() {
  const [todos, setTodos] = useState([]);

  /** add a new todo to list */
  function create(newTodo) {
    let todo = { ...newTodo, id: uuid() };
    setTodos((todos) => [...todos, todo]);
  }

  /** update a todo with updatedTodo */
  function update(updatedTodo) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === updatedTodo.id ? { ...updatedTodo } : todo
      )
    );
  }

  /** delete a todo by id */
  function remove(id) {
    setTodos((todos) => todos.filter((todo) => id !== todo.id));
  }

  return (
    <main className="TodoApp">
      <div className="row">
        <div className="col-md-6">
          <h3>Todos</h3>
          {!todos.length ? (
            <span className="text-muted">You have no todos.</span>
          ) : (
            <EditableTodoList todos={todos} update={update} remove={remove} />
          )}
        </div>
        <div className="col-md-6">
          <h3>Top Todo</h3>
          {!todos.length ? (
            <div className="mb-4">
            <span className="text-muted">No todos yet!</span>
            <br />
            </div>
          ) : (
            <section className="mb-4">
              <TopTodo todos={todos} />
            </section>
          )}
          <section>
            <h3 className="mb-3">Add Nü</h3>
            <TodoForm handleSave={create} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default TodoApp;
