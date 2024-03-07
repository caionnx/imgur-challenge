import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "../Select";

describe("Select", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("should render select component with options", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ];
    const label = "Select an option";
    const name = "selectOption";

    render(<Select options={options} label={label} name={name} />);

    const selectElement = screen.getByRole("combobox");

    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveAttribute("id", name);

    options.forEach(({ value, label }) => {
      const optionElement = screen.getByText(label);
      expect(optionElement).toBeInTheDocument();
      expect(optionElement).toHaveAttribute("value", value);
    });
  });

  it("should calls onChange handler when an option is selected", async () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ];
    const label = "Select an option";
    const name = "selectOption";
    const handleChange = jest.fn();

    render(
      <Select
        options={options}
        label={label}
        name={name}
        onChange={handleChange}
      />,
    );

    const selectElement = screen.getByRole("combobox");

    await waitFor(() => {
      userEvent.selectOptions(selectElement, "2");
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "2" }),
        }),
      );
    });
  });
});
