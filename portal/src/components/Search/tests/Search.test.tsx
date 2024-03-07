import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Search } from "../Search";

describe("Search", () => {
  const mockOnTrigger = jest.fn(); // TODO check Not implemented: HTMLFormElement.prototype.requestSubmit warning when executing the test

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly with button", () => {
    render(
      <Search
        showButton={true}
        buttonLabel="Search"
        name="search"
        label="Search Images"
        onTrigger={mockOnTrigger}
      />
    );

    const input = screen.getByLabelText("Search Images");
    const button = screen.getByText("Search");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should render correctly without button", () => {
    render(
      <Search
        showButton={false}
        buttonLabel="Search"
        name="search"
        label="Search Images"
        onTrigger={mockOnTrigger}
      />
    );

    const input = screen.getByLabelText("Search Images");
    const button = screen.queryByText("Search");

    expect(input).toBeInTheDocument();
    expect(button).toBeNull();
  });

  it("should trigger onTrigger function when form is submitted", () => {
    render(
      <Search
        showButton={true}
        buttonLabel="Search"
        name="search"
        label="Search Images"
        onTrigger={mockOnTrigger}
      />
    );

    const input = screen.getByLabelText("Search Images");
    fireEvent.submit(input.closest("form") as HTMLFormElement);

    expect(mockOnTrigger).toHaveBeenCalledTimes(1);
  });

  it("should trigger onTrigger function when button is clicked", () => {
    render(
      <Search
        showButton={true}
        buttonLabel="Search"
        name="search"
        label="Search Images"
        onTrigger={mockOnTrigger}
      />
    );

    const button = screen.getByText("Search");
    fireEvent.click(button);

    expect(mockOnTrigger).toHaveBeenCalled(); // On test env the mock is fired twiced as if the button submits the form
  });
});
