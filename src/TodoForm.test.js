import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";

const testFormData = {
  id: "1",
  title: "test1",
  description: "testDescription",
  priority: 2,
}


it("renders without crashing", function () {
  render(<TodoForm initialFormData={testFormData} handleSave={jest.fn} />);
});

it("matches snapshot", function () {
  const { container } = render(
    <TodoForm initialFormData={testFormData} handleSave={jest.fn} />
  );
  expect(container).toMatchSnapshot();
});

it("form populates default values when no prop given", function () {
  const { getByLabelText } = render(
    <TodoForm handleSave={jest.fn} />
  );

  const titleInput = getByLabelText("Title");
  const descriptionInput = getByLabelText("Description");
  const priorityInput = getByLabelText("Priority:");


  expect(titleInput).toContainHTML("");
  expect(descriptionInput).toHaveTextContent("");
  expect(priorityInput).toHaveTextContent("Ultra-Über");

});

it("form populates with initial values passed in as prop", function () {
  const { getByLabelText, debug } = render(
    <TodoForm initialFormData={testFormData} handleSave={jest.fn} />
  );

  const titleInput = getByLabelText("Title");
  const descriptionInput = getByLabelText("Description");
  const priorityInput = getByLabelText("Priority:");

  debug();
  expect(titleInput).toContainHTML("test1");
  expect(descriptionInput).toHaveTextContent("testDescription");
  expect(priorityInput).toHaveTextContent("Über");

});

it("form submission calls handleSave", function () {

  const handleSave = jest.fn();

  const { container } = render(
    <TodoForm initialFormData={testFormData} handleSave={handleSave} />
  );
  const submitBtn = container.querySelector(".NewTodoForm-addBtn")

  fireEvent.click(submitBtn);
  expect(handleSave).toHaveBeenCalledTimes(1);
});

it("handles form changes", function () {
  const { getByLabelText } = render(
    <TodoForm handleSave={jest.fn} />
  );

  const titleInput = getByLabelText("Title");
  fireEvent.change(titleInput, { target: { value: "hello" } });

  expect(titleInput).toContainHTML("hello");
});