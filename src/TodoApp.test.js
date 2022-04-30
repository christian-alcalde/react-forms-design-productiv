import React from "react";
import { render, fireEvent, getByDisplayValue } from "@testing-library/react";
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
  render(<TodoApp initialTodos={testTodos} />);
});

it("matches snapshot", function () {
  const { container } = render(<TodoApp initialTodos={testTodos} />);
  expect(container).toMatchSnapshot();
});

it("shows message if no todos", function () {
  const { container } = render(<TodoApp initialTodos={[]} />);

  expect(container).toHaveTextContent("No todos yet!");
  expect(container).toHaveTextContent("You have no todos.");
});

it("create function adds new todo", function () {
  const { container, getByLabelText, screen, debug } = render(
    <TodoApp initialTodos={[]} />
  );

  expect(container).toHaveTextContent("No todos yet!");
  expect(container).toHaveTextContent("You have no todos.");

  const titleInput = getByLabelText("Title");
  const descriptionInput = getByLabelText("Description");
  const priorityInput = getByLabelText("Priority:");

  fireEvent.change(titleInput, { target: { value: "hello" } });
  fireEvent.change(descriptionInput, { target: { value: "hi" } });
  fireEvent.change(priorityInput, { target: { value: 1 } });

  const submitBtn = container.querySelector(".NewTodoForm-addBtn");
  fireEvent.click(submitBtn);
  debug(screen);
  // expect(screen.getByTestId("laundry")).toBeInTheDocument();
  expect(container.querySelectorAll("li").length).toEqual(1);

  // testing if inputs are empty
  expect(titleInput).toContainHTML("");
  expect(descriptionInput).toHaveTextContent("");
  expect(priorityInput).toHaveTextContent("Ultra-Über");

  expect(container).not.toHaveTextContent("No todos yet!");
  expect(container).not.toHaveTextContent("You have no todos.");
});

it("updates a todo", function () {
  const { container, getByDisplayValue } = render(
    <TodoApp initialTodos={testTodos} />
  );

  expect(container).toHaveTextContent("laundry");

  const editButton = container.querySelector(".EditableTodo-toggle");
  fireEvent.click(editButton);

  const titleInput = getByDisplayValue("laundry");
  const descriptionInput = getByDisplayValue("testDescription");
  const priorityInput = getByDisplayValue("Ultra-Über");

  fireEvent.change(titleInput, { target: { value: "hello" } });
  fireEvent.change(descriptionInput, { target: { value: "hi" } });
  fireEvent.change(priorityInput, { target: { value: 1 } });

  const submitBtn = container.querySelector(".NewTodoForm-addBtn");
  fireEvent.click(submitBtn);

  expect(container).not.toHaveTextContent("laundry");
  expect(container).toHaveTextContent("hello");
  expect(container).toHaveTextContent("hi");
});
