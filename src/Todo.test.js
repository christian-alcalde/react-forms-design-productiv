import React from "react";
import { render } from "@testing-library/react";
import Todo from "./Todo";

const testTodo = {
  id: "1",
  title: "test",
  description: "testDescription",
  priority: 1,
};

it("renders without crashing", function () {
  render(<Todo todo={testTodo} />);
});

it("matches snapshot", function () {
  const { container } = render(<Todo todo={testTodo} />);
  expect(container).toMatchSnapshot();
});
