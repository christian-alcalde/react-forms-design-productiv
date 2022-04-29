import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditableTodoList from "./EditableTodoList";


const testTodos = [{
  id: "1",
  title: "test",
  description: "testDescription",
  priority: 1,
}, {
  id: "2",
  title: "test2",
  description: "testDescription2",
  priority: 2,
}];


it("renders without crashing", function () {
  render(<EditableTodoList todos={testTodos} update={jest.fn} remove={jest.fn} />);
});

it("matches snapshot", function () {
  const { container } = render(
    <EditableTodoList todos={testTodos} update={jest.fn} remove={jest.fn} />
  );
  expect(container).toMatchSnapshot();
});

it("two items rendered in list", function () {
  const { container } = render(
    <EditableTodoList todos={testTodos} update={jest.fn} remove={jest.fn} />
  );

  expect(container).toContainHTML("test")
  expect(container).toContainHTML("test2")
});
