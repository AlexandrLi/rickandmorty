import Popover from "react-bootstrap/Popover";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import React from "react";
import { Character } from "../../types";

type CharacterThumbnailProps = {
  data: Character;
};

const CharacterThumbnail = ({ data }: CharacterThumbnailProps) => {
  const { id, name, status, species, image } = data;
  return (
    <OverlayTrigger
      placement="bottom-start"
      overlay={
        <Popover id={id.toString()} className="shadow">
          <Popover.Content>
            <p className="m-0 font-weight-bold">Name: {name}</p>
            <p className="m-0 font-weight-bold">Status: {status}</p>
            <p className="m-0 font-weight-bold">Species: {species}</p>
          </Popover.Content>
        </Popover>
      }
    >
      <Image src={image} alt={name} thumbnail />
    </OverlayTrigger>
  );
};
export default CharacterThumbnail;
