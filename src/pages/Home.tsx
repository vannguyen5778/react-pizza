import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "@/redux/slices/filterSlice";
import { useSearching, ItemProps } from "@/context/SearchingContext";
import { useNavigate } from "react-router-dom";

import Categories from "@/components/Categories";
import Sort, { SORT_MAP } from "@/components/Sort";
import Pizza from "@/components/Pizza";
import Skeleton from "@/components/Pizza/Skeleton";
import PaginationComponent from "@/components/Pagination";
import qs from "qs";
import { fetchPizzas, selectPizzaData } from "@/redux/slices/pizzaSlice";
import { setCurrentPage, selectFilter } from "@/redux/slices/filterSlice";

function Home() {
  const itemsPerPage = 4;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  // const { searchedValue } = useSearching();

  const { clickedCategory, sortID, currentPage, searchedValue } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizzaData);

  useEffect(() => {
    const sort = SORT_MAP.get(sortID);
    if (isMounted.current) {
      const queryString = qs.stringify({
        clickedCategory,
        sort,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [clickedCategory, sortID, currentPage, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters(params));
    }
    isSearch.current = true;
  }, [dispatch]);

  useEffect(() => {
    const getPizzas = async () => {
      const sort = SORT_MAP.get(sortID);
      const category = clickedCategory > 0 ? `category=${clickedCategory}` : "";
      const search = searchedValue ? `&search=${searchedValue}` : "";
      const page = currentPage.toString();
      dispatch(fetchPizzas({ sort, category, search, page }));
    };

    window.scrollTo(0, 0);
    getPizzas();
    // if (!isSearch.current) {
    //   getPizzas();
    // }
    // isSearch.current = false;
  }, [clickedCategory, sortID, searchedValue, currentPage, dispatch]);

  const previousCategoryRef = useRef(0);

  useEffect(() => {
    const categoryChanged = clickedCategory != previousCategoryRef.current;

    if (categoryChanged) {
      dispatch(setCurrentPage(1));
    }

    previousCategoryRef.current = clickedCategory;
  }, [clickedCategory]);

  return (
    <>
      <div className="top-section">
        <Categories />
        <Sort />
      </div>

      <div className="pizza-block">
        <h1>Пиццы</h1>
        {pizzas.length === 0 && status === "error" ? (
          <div className="pizzas__error">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить питсы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        ) : (
          <>
            <div className="pizzas">
              {status === "loading"
                ? Array(10)
                    .fill(null)
                    .map((_, index) => <Skeleton key={index} />)
                : pizzas.map((pizza, index) => (
                    <Pizza pizzaData={pizza} key={index} />
                  ))}
            </div>
            <PaginationComponent
              totalItems={pizzas.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Home;

// const getParams = (clickedCategory: number, sortID: number) => {
//   return clickedCategory === 0
//     ? { sortBy: SORT_MAP.get(sortID) }
//     : { sortBy: SORT_MAP.get(sortID), category: clickedCategory.toString() };
// };
//const res = await axios.get("https://65559a0b84b36e3a431dfcd7.mockapi.io/items", {
//   params: {
//     ...getParams(clickedCategory, sortID),
//     page: currentPage.toString(),
//     limit: itemsPerPage.toString(),
//   },
// })

// searchedValue !== ""
// ? setItems(
//     res.data.filter((pizza: ItemProps) =>
//       pizza.title
//         .toLocaleLowerCase()
//         .includes(searchedValue.toLocaleLowerCase())
//     )
//   )
// : setItems(res.data);
