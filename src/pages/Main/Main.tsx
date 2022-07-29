import React, { FC, ReactElement, useContext, useEffect, useMemo } from "react";
import { Link as BaseLink } from "react-router-dom";
import { useIntl, defineMessages } from "react-intl";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

import { paths } from "../../routes";
import { CharacterContext } from "../../provider/character";
import Character from "../../entity/character";

const Link = styled(BaseLink)({
  textDecoration: "none",
});

const messages = defineMessages({
  mainPageName: {
    id: "mainPageName",
    defaultMessage: "Name",
  },
  mainPageBirthYear: {
    id: "mainPageBirthYear",
    defaultMessage: "Birth year",
  },
  mainPageGender: {
    id: "mainPageGender",
    defaultMessage: "Gender",
  },
  mainPageMore: {
    id: "mainPageMore",
    defaultMessage: "More",
  },
  mainPageLoadMore: {
    id: "mainPageLoadMore",
    defaultMessage: "Load More",
  },
});

const Main: FC = () => {
  const intl = useIntl();

  const {
    characters,
    count,
    currentPage,
    rowsPerPage,
    isLoading,
    listCharacter,
  } = useContext(CharacterContext);

  useEffect(() => {
    listCharacter();
  }, []);

  const showLoadMoreButton = useMemo(
    () => !isLoading && Math.ceil(count / rowsPerPage) >= currentPage,
    [isLoading, count, rowsPerPage, currentPage]
  );

  const handleLoadMore = () => {
    listCharacter();
  };

  const renderLoadMoreButton = (): ReactElement => (
    <Grid item={true} xs={4}>
      <Card>
        <CardActions>
          <Button onClick={handleLoadMore}>
            {intl.formatMessage(messages.mainPageLoadMore)}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  const renderCard = (character: Character): ReactElement => (
    <Grid key={character.name} item={true} xs={4}>
      <Card>
        <CardContent>
          <Typography variant="h5">{character.name}</Typography>
          <Typography variant="body2">
            {intl.formatMessage(messages.mainPageBirthYear)}:{" "}
            {character.birthYear}
          </Typography>
          <Typography variant="body2">
            {intl.formatMessage(messages.mainPageGender)}: {character.gender}
          </Typography>
        </CardContent>
        <CardActions>
          <Button>
            <Link to={paths.toCharacter(character.id)}>
              {intl.formatMessage(messages.mainPageMore)}
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  const renderPreloaderCard = (): ReactElement => (
    <Grid item={true} xs={4}>
      <Card>
        <CardContent>
          <Typography variant="h5">
            <Skeleton />
          </Typography>
          <Typography variant="body2">
            <Skeleton />
          </Typography>
          <Typography variant="body2">
            <Skeleton />
          </Typography>
        </CardContent>
        <CardActions>
          <Button>
            <Skeleton sx={{ width: "100%" }} />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  const renderPreloader = (): ReactElement => (
    <>
      {renderPreloaderCard()}
      {renderPreloaderCard()}
      {renderPreloaderCard()}
    </>
  );

  return (
    <Box
      component="section"
      sx={{
        height: "100%",
        position: "relative",
      }}
    >
      <Grid
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
        }}
        container={true}
        spacing={2}
      >
        {characters.map(renderCard)}
        {isLoading && renderPreloader()}
        {showLoadMoreButton && renderLoadMoreButton()}
      </Grid>
    </Box>
  );
};

export default Main;
