import { Character } from "../../types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import CharacterThumbnail from "./CharacterThumbnail";

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

describe("CharacterThumbnail", () => {
  test("renders character thumbnail with popover on hover", async () => {
    render(<CharacterThumbnail data={character} />);
    const characterThumbnail = screen.getByRole("img", {
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
});
