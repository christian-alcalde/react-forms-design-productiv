import React from "react";
import { render } from "@testing-library/react";
import TopTodo from "./TopTodo";

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
  render(<TopTodo todos={testTodos} />);
});

it("matches snapshot", function () {
  const { container } = render(<TopTodo todos={testTodos} />);
  expect(container).toMatchSnapshot();
});

it("shows oldest todo with highest priority", function () {
  const { container } = render(<TopTodo todos={testTodos} />);

  expect(container).toHaveTextContent("water plants");
  expect(container).not.toHaveTextContent("laundry");
  expect(container).not.toHaveTextContent("fix bike");
});
