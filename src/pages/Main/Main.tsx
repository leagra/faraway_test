import React, { FC, ReactElement, useContext, useEffect } from "react";
import { useIntl, defineMessages } from "react-intl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { CharacterContext } from "../../provider/character";
import Character from "../../entity/character";
import TablePreloader from "./TablePreloader";

const messages = defineMessages({
  name: {
    id: "name",
    defaultMessage: "Name",
  },
  birthYear: {
    id: "birthYear",
    defaultMessage: "Birth year",
  },
  gender: {
    id: "gender",
    defaultMessage: "Gender",
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

  console.log(characters);

  const handlePageChange = (_: unknown, page: number) => {
    listCharacter(page + 1);
  };

  const renderTableRow = (character: Character): ReactElement => (
    <TableRow key={character.name} hover={true}>
      <TableCell>{character.name}</TableCell>
      <TableCell>{character.birthYear}</TableCell>
      <TableCell>{character.gender}</TableCell>
    </TableRow>
  );

  const renderTableHead = (): ReactElement => (
    <TableHead>
      <TableRow>
        <TableCell>{intl.formatMessage(messages.name)}</TableCell>
        <TableCell>{intl.formatMessage(messages.birthYear)}</TableCell>
        <TableCell>{intl.formatMessage(messages.gender)}</TableCell>
      </TableRow>
    </TableHead>
  );

  const renderPagination = (): ReactElement => (
    <TablePagination
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={currentPage - 1}
      onPageChange={handlePageChange}
    />
  );

  return (
    <Paper component="section" sx={{ height: "100%", position: "relative" }}>
      <TableContainer sx={{ height: "100%" }}>
        {isLoading && <TablePreloader />}
        <Table>
          {renderTableHead()}
          <TableBody>{characters.map(renderTableRow)}</TableBody>
          {renderPagination()}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Main;
