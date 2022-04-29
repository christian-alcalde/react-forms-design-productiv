import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditableTodo from "./EditableTodo";


const testTodo = {
  id: "1",
  title: "test",
  description: "testDescription",
  priority: 1,
};

it("renders without crashing", function () {
  render(<EditableTodo todo={testTodo} update={jest.fn} remove={jest.fn} />);
});

it("matches snapshot", function () {
  const { container } = render(
    <EditableTodo todo={testTodo} update={jest.fn} remove={jest.fn} />
  );
  expect(container).toMatchSnapshot();
});

it("works: testing delete button on todo", function () {
  const update = jest.fn();
  const remove = jest.fn();
  const { container, debug } = render(
    <EditableTodo todo={testTodo} update={update} remove={remove} />
  );

  debug(container);

  expect(container.querySelector(".EditableTodo")).toBeInTheDocument();

  const deleteButton = container.querySelector(".EditableTodo-delBtn");
  fireEvent.click(deleteButton);

  expect(update).toHaveBeenCalledTimes(0);
  expect(remove).toHaveBeenCalledTimes(1);
});

it("works: testing edit button on todo", function () {
  const update = jest.fn();
  const remove = jest.fn();

  const { container, debug } = render(
    <EditableTodo todo={testTodo} update={update} remove={remove} />
  );

  debug(container);

  expect(container.querySelector(".EditableTodo")).toBeInTheDocument();

  const editButton = container.querySelector(".EditableTodo-toggle");
  fireEvent.click(editButton);

  expect(container.querySelector(".NewTodoForm")).toBeInTheDocument();
  expect(remove).toHaveBeenCalledTimes(0);
  expect(update).toHaveBeenCalledTimes(0);
});

it("works: testing submit when editing todo item", function () {
  const update = jest.fn();
  const remove = jest.fn();

  const { container, debug } = render(
    <EditableTodo todo={testTodo} update={update} remove={remove} />
  );

  debug(container);

  expect(container.querySelector(".EditableTodo")).toBeInTheDocument();

  const editButton = container.querySelector(".EditableTodo-toggle");
  fireEvent.click(editButton);

  expect(container.querySelector(".NewTodoForm")).toBeInTheDocument();
  const submitButton = container.querySelector(".NewTodoForm-addBtn");
  fireEvent.click(submitButton);

  expect(remove).toHaveBeenCalledTimes(0);
  expect(update).toHaveBeenCalledTimes(1);
});
