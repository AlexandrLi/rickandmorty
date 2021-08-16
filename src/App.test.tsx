import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import { Character } from "./types";
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
  test('renders "Fetching..." text', async () => {
    (axios.get as Mock).mockResolvedValueOnce({
      results: [character],
    });
    render(<App />);
    expect(await screen.findByText(/Fetching/)).toBeInTheDocument();
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
