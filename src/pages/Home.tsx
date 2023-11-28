import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SORT_MAP } from "@/components/Sort";

import { PaginationComponent, Skeleton, Sort, Pizza, Categories } from "@/components";

import qs from "qs";
import { fetchPizzas } from "@/redux/slices/pizza/asyncActions";
import { selectPizzaData } from "@/redux/slices/pizza/selectors";
import { setCurrentPage } from "@/redux/slices/filter/slice";
import { selectFilter } from "@/redux/slices/filter/selectors";
import { setFilters } from "@/redux/slices/filter/slice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

function Home() {
  const itemsPerPage = 4;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const thunkDispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { clickedCategory, sortID, currentPage, searchedValue } =
    useSelector(selectFilter);
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
      thunkDispatch(fetchPizzas({ sort, category, search, page }));
    };

    window.scrollTo(0, 0);
    getPizzas();
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = true;
  }, [clickedCategory, sortID, searchedValue, currentPage, thunkDispatch]);

  const previousCategoryRef = useRef(0);

  useEffect(() => {
    const categoryChanged = clickedCategory != previousCategoryRef.current;
    if (categoryChanged) {
      dispatch(setCurrentPage(1));
    }
    previousCategoryRef.current = clickedCategory;
  }, [clickedCategory, dispatch]);

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
