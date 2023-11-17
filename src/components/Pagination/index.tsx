import React, { useState } from "react";
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type Props = {
  totalItems: number;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#fe5f1e",
    },
    text: {
      primary: "#fe5f1e",
    },
  },
});

const PaginationComponent = ({ totalItems, page, setPage, itemsPerPage }: Props) => {
  

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(value);
    setPage(value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Pagination
        count={Math.ceil(totalItems / itemsPerPage)}
        variant="outlined"
        color="primary"
        page={page}
        onChange={handlePaginationChange}
      />
    </ThemeProvider>
  );
};

export default PaginationComponent;
