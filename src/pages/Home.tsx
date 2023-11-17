import React, { useEffect, useState } from "react";
import Plus from "@/assets/img/plus.svg";
import Categories from "@/components/Categories";
import Sort from "@/components/Sort";
import Pizza from "@/components/Pizza";
import Skeleton from "@/components/Pizza/Skeleton";

function Home() {
 

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
