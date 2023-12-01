import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "@/redux/slices/filter/slice";
import { selectFilter } from "@/redux/slices/filter/selectors";



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

const PaginationComponent = () => {
  const { currentPage } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handlePaginationChange = (
    value: number
  ) => {
    console.log(value);
    dispatch(setCurrentPage(value));
  };
  return (
    <ThemeProvider theme={theme}>
      <Pagination
        count={3}
        color="primary"
        page={currentPage}
        onChange={(_event, value) => handlePaginationChange(value)} 
        sx={{ mx: "auto", pl: 7, py: 2, width: "300px" }}
      />
    </ThemeProvider>
  );
};

export default PaginationComponent;
