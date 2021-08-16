import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import { Character } from "./types";
import userEvent from "@testing-library/user-event";
import Search from "./components/Search";
import Mock = jest.Mock;

jest.mock("axios");
const character: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Earth (Replacement Dimension)",
    url: "https://rickandmortyapi.com/api/location/20",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

describe("App", () => {
  test("renders character thumbnail with popover on hover", async () => {
    (axios.get as Mock).mockResolvedValueOnce({
      data: { info: {}, results: [character] },
    });
    render(<App />);
    const characterThumbnail = await screen.findByRole("img", {
      name: character.name,
    });
    expect(characterThumbnail).toBeInTheDocument();
    userEvent.hover(characterThumbnail);
    expect(
      await screen.findByText(new RegExp(character.name))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(character.status))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(character.species))).toBeInTheDocument();
  });

  test('renders "There is nothing here" error message', async () => {
    const errorMessage = "There is nothing here";
    (axios.get as Mock).mockRejectedValueOnce({
      response: {
        status: 404,
        data: { error: errorMessage },
      },
    });
    render(<App />);
    expect(
      await screen.findByText(new RegExp(errorMessage))
    ).toBeInTheDocument();
  });
});

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
