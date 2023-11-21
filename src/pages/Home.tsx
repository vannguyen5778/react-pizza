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

import axios from "axios";
import qs from "qs";

function Home() {
  const itemsPerPage = 4;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);

  const { searchedValue } = useSearching();

  const { clickedCategory, sortID, currentPage } = useSelector(
    (state) => state.filter
  );

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getParams = (clickedCategory: number, sortID: number) => {
    return clickedCategory === 0
      ? { sortBy: SORT_MAP.get(sortID) }
      : { sortBy: SORT_MAP.get(sortID), category: clickedCategory.toString() };
  };

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
    console.log("locationSearch", window.location.search);
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log("params", params);
      // const sort = SORT_MAP.get(sortID)
      dispatch(setFilters(params));
    }
    isSearch.current = true;
  }, [dispatch]);

  useEffect(() => {
    function fetchPizzas() {
      setIsLoading(true);
      axios
        .get("https://65559a0b84b36e3a431dfcd7.mockapi.io/items", {
          params: {
            ...getParams(clickedCategory, sortID),
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
          },
        })
        .then((res) => {
          searchedValue !== ""
            ? setItems(
                res.data.filter((pizza: ItemProps) =>
                  pizza.title
                    .toLocaleLowerCase()
                    .includes(searchedValue.toLocaleLowerCase())
                )
              )
            : setItems(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [clickedCategory, sortID, searchedValue, currentPage]);

  return (
    <>
      <div className="top-section">
        <Categories />
        <Sort />
      </div>

      <div className="pizza-block">
        <h1>Пиццы</h1>
        {items.length === 0 && !isLoading ? (
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
              {isLoading
                ? Array(10)
                    .fill(null)
                    .map((_, index) => <Skeleton key={index} />)
                : items.map((pizza, index) => (
                    <Pizza pizzaData={pizza} key={index} />
                  ))}
            </div>
            <PaginationComponent
              totalItems={items.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
