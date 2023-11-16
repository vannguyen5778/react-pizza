import React from 'react'
import Plus from "@/assets/img/plus.svg";
import Categories from '@/components/Categories';
import Sort from '@/components/Sort';
import Pizza from '@/components/Pizza';
import Pizzas from '@/assets/pizzas.json'



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
          {Pizzas.length === 0 ? (<div className="pizzas__error">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить питсы. Попробуйте повторить
              попытку позже.
            </p>
          </div>) : Pizzas.map((pizza) => 
          <Pizza pizzaData={pizza}/>          
          )
          }
          
          
          
        </div>
      </div>
    </>
  )
}

export default Home