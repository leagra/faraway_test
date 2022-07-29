import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useIntl, defineMessages } from "react-intl";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import CharacterEntity from "../../entity/character";
import { CharacterContext } from "../../provider/character";

const messages = defineMessages({
  characterPageName: {
    id: "characterPageName",
    defaultMessage: "Name",
  },
  characterPageBirthYear: {
    id: "characterPageBirthYear",
    defaultMessage: "Birth year",
  },
  characterPageGender: {
    id: "characterPageGender",
    defaultMessage: "Gender",
  },
  characterPageHeight: {
    id: "characterPageHeight",
    defaultMessage: "Height",
  },
  characterPageMass: {
    id: "characterPageMass",
    defaultMessage: "Mass",
  },
  characterPageHairColor: {
    id: "characterPageHairColor",
    defaultMessage: "Hair Color",
  },
  characterPageSkinColor: {
    id: "characterPageSkinColor",
    defaultMessage: "Skin Color",
  },
  characterPageEyeColor: {
    id: "characterPageEyeColor",
    defaultMessage: "Eye Color",
  },
  characterPageHomeworld: {
    id: "characterPageHomeworld",
    defaultMessage: "Homeworld",
  },
  characterPageFilms: {
    id: "characterPageFilms",
    defaultMessage: "Films",
  },
  characterPageVehicles: {
    id: "characterPageVehicles",
    defaultMessage: "Vehicles",
  },
  characterPageStarships: {
    id: "characterPageStarships",
    defaultMessage: "Starships",
  },
});

const Character: FC = () => {
  const intl = useIntl();
  const params = useParams<{ characterId?: string }>();

  const { isLoading, getCharacter } = useContext(CharacterContext);
  const [character, setCharacter] = useState<CharacterEntity | undefined>();

  useEffect(() => {
    if (params.characterId) {
      getCharacter(params.characterId).then(setCharacter);
    }
  }, [params]);

  return (
    <Box
      component="section"
      sx={{ height: "100%", paddingTop: 4, paddingBottom: 4 }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5">
            {intl.formatMessage(messages.characterPageName)}:{" "}
            <b>{character?.name}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageBirthYear)}:{" "}
            <b>{character?.birthYear}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageGender)}:{" "}
            <b>{character?.gender}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageHeight)}:{" "}
            <b>{character?.height}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageMass)}:{" "}
            <b>{character?.mass}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageHairColor)}:{" "}
            <b>{character?.hairColor}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageSkinColor)}:{" "}
            <b>{character?.skinColor}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageEyeColor)}:{" "}
            <b>{character?.eyeColor}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageHomeworld)}:{" "}
            <b>{character?.homeworld}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageStarships)}:{" "}
            <b>{character?.starships}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageVehicles)}:{" "}
            <b>{character?.vehicles}</b>
          </Typography>
          <Typography>
            {intl.formatMessage(messages.characterPageFilms)}:{" "}
            <b>{character?.films}</b>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Character;
