import React from 'react'
import ArrowUp from "@/assets/img/arrow-top.svg";
import Plus from "@/assets/img/plus.svg";
type Props = {}

function Home({}: Props) {
    const category = ["All", "Vegeterian", "Protein"];

  return (
    <>
    <div className="top-section">
        <ul className="categories">
          {category.map((el) => (
            <li className="categories-btn" key={el}>
              {el}
            </li>
          ))}
        </ul>

        <div className="sort-wrapper">
          <div className="sort">
            <img src={ArrowUp} alt="arrow up" />
            <span className="sort__text">Сортировка по: </span>
            <span className="sort__choice">популярности</span>
          </div>
          <div className="sort-popup">
            <ul>
              <li>dsfsf</li>
              <li>dsfsf</li>
              <li>dsfsf</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pizza-block">
        <h1>Pizzas</h1>
        <div className="pizzas">
          <div className="pizzas__error">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить питсы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
          <div className="pizza">
            <img className="pizza__image" src="" alt="" />
            <p className="pizza__name">Cheeseburger</p>
            <div className="options-wrapper">
              <ul className="thickness">
                <li>thin</li>
                <li className="active">thick</li>
              </ul>
              <ul className="size">
                <li>26cm</li>
                <li className="disabled">30cm</li>
                <li className="active">40cm</li>
              </ul>
            </div>
            <div className="bottom">
              <p className="price">ot 395 P</p>
              <button className="add-to-cart-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                  />
                </svg>
                <span>Dobavich</span>
                {/* <div className="quantity">2</div> */}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Home