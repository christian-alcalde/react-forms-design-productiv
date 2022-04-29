import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoApp from "./TodoApp";

const testTodos = [
  {
    id: "1",
    title: "laundry",
    description: "testDescription",
    priority: 3,
  },
  {
    id: "2",
    title: "water plants",
    description: "testDescription2",
    priority: 1,
  },
  {
    id: "3",
    title: "fix bike",
    description: "testDescription3",
    priority: 2,
  },
];

it("renders without crashing", function () {
  render(<TodoApp todos={testTodos} />);
});

it("matches snapshot", function () {
  const { container } = render(<TodoApp todos={testTodos} />);
  expect(container).toMatchSnapshot();
});

it("shows message if no todos", function () {
  const { container } = render(<TodoApp todos={[]} />);

  expect(container).toHaveTextContent("No todos yet!");
  expect(container).toHaveTextContent("You have no todos.");
});

it("create function adds new todo", function () {
  let todos = [];
  const { container, getByLabelText } = render(<TodoApp todos={todos} />);

  const titleInput = getByLabelText("Title");
  const descriptionInput = getByLabelText("Description");
  const priorityInput = getByLabelText("Priority:");

  fireEvent.change(titleInput, { target: { value: "hello" } });
  fireEvent.change(descriptionInput, { target: { value: "hi" } });
  fireEvent.change(priorityInput, { target: { value: 1 } });

  const submitBtn = container.querySelector(".NewTodoForm-addBtn");
  fireEvent.click(submitBtn);

  expect(container.querySelector("li")).toBeInTheDocument();

  // testing if inputs are empty
  expect(titleInput).toContainHTML("");
  expect(descriptionInput).toHaveTextContent("");
  expect(priorityInput).toHaveTextContent("Ultra-Über");
  // expect(queryByText("ice cream: 100")).toBeInTheDocument();

  // expect(container).toHaveTextContent("No todos yet!");
  // expect(container).toHaveTextContent("You have no todos.");
});
