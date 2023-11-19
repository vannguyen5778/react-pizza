import React, { useState } from "react";
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSearching } from "@/context/SearchingContext";

type Props = {
  totalItems: number;
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
  spacing: 10,
});

const PaginationComponent = ({ totalItems, itemsPerPage }: Props) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const { page, setPage } = useSearching();
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
        count={3}
        variant="outlined"
        color="primary"
        page={page}
        onChange={handlePaginationChange}
        sx={{ mx: 'auto', pl: 7, py: 2, width: '300px'}}
      />
    </ThemeProvider>
  );
};

export default PaginationComponent;
