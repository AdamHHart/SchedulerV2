import React from "react";

import { getByPlaceholderText, getByAltText, getAllByTestId, prettyDOM, getByText, render, cleanup, fireEvent, waitForElement } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


//using async/await syntax instead of raw promises
it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});


// The asynchronous function has been defined as one using the async keyword.
// The Promise chain can be hidden by using the await keyword.

describe("Form", () => {
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    console.log(prettyDOM(appointment));
  });
  
})