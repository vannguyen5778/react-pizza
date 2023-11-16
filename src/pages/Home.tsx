import React, { useEffect, useState } from "react";
import Plus from "@/assets/img/plus.svg";
import Categories from "@/components/Categories";
import Sort from "@/components/Sort";
import Pizza from "@/components/Pizza";
import Skeleton from "@/components/Pizza/Skeleton";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://65559a0b84b36e3a431dfcd7.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setTimeout(() => {
          setItems(arr);
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <>
      <div className="top-section">
        <Categories />
        <Sort />
      </div>

      <div className="pizza-block">
        <h1>Пиццы</h1>
        <div className="pizzas">
        {/* items.length === 0 ? (
            <div className="pizzas__error">
              <h2>Произошла ошибка 😕</h2>
              <p>
                К сожалению, не удалось получить питсы. Попробуйте повторить
                попытку позже.
              </p>
            </div>
          )  */}
          {isLoading ? (
            Array(10)
              .fill(null)
              .map((_, index) => <Skeleton key={index} />)
          ) : (
            items.map((pizza, index) => <Pizza pizzaData={pizza} key={index} />)
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
