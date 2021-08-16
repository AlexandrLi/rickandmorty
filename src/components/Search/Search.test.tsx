import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Search from "./Search";

describe("Search", () => {
  test("should call fetchMock if search value length greater than 1", () => {
    const fetchMock = jest.fn();
    render(<Search onChange={fetchMock} />);
    const inputElement = screen.getByRole("textbox");
    userEvent.type(inputElement, "r");
    expect(fetchMock).not.toBeCalled();
    userEvent.type(inputElement, "i");
    expect(fetchMock).toBeCalledWith("ri");
  });
});
