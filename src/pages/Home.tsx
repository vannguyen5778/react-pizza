import React, { useEffect, useState } from "react";
import Plus from "@/assets/img/plus.svg";
import Categories from "@/components/Categories";
import Sort from "@/components/Sort";
import Pizza from "@/components/Pizza";
import Skeleton from "@/components/Pizza/Skeleton";
import { useSearching } from "@/context/SearchingContext";
import axios from "axios";
import { SORT_MAP } from "../components/Sort";
type Props = {
  // isLoading: boolean;
  // items: any[];
};
function Home() {
  const { sortID, clickedCategory } = useSearching();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getParams = (clickedCategory: number, sortID: number) => {
    return( clickedCategory === 0
      ? { sortBy: SORT_MAP.get(sortID) }
      : { sortBy: SORT_MAP.get(sortID), category: clickedCategory.toString() })
  };

  useEffect(() => {
    setIsLoading(true);
    console.log(SORT_MAP.get(sortID));
    axios
      .get("https://65559a0b84b36e3a431dfcd7.mockapi.io/items", {
        params: getParams(clickedCategory, sortID),
      })
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [clickedCategory, sortID]);

  return (
    <>
      <div className="top-section">
        <Categories />
        <Sort />
      </div>

      <div className="pizza-block">
        <h1>Пиццы</h1>
        {items.length === 0 ? (
          <div className="pizzas__error">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить питсы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        ) : (
          <div className="pizzas">
            {isLoading
              ? Array(10)
                  .fill(null)
                  .map((_, index) => <Skeleton key={index} />)
              : items.map((pizza, index) => (
                  <Pizza pizzaData={pizza} key={index} />
                ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
