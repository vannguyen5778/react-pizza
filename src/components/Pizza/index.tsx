import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import { addItem, setItems } from '@/redux/slices/cartSlice'
type Props = {
  pizzaData: object;
};
const Pizza = ({ pizzaData }: Props) => {
  const { id, imageUrl, title, types, sizes, price, category, rating } =
    pizzaData;
  const [size, setSize] = useState<number>(sizes[0]);
  const [thickness, setThickness] = useState<number>(types[0]);
  const [quantity, setQuantity] = useState<number>(0);

  const dispatch = useDispatch();
//  const { items } = useSelector(state => state.cart)

  const TYPES_MAP = new Map();
  TYPES_MAP.set(0, "тонкое");
  TYPES_MAP.set(1, "традиционное");

  const sizeOptions = [26, 30, 40];

  const handleOnClickAddItem = () => {
    setQuantity((prevQty) => prevQty + 1); 
    const item = {
          id,
          imageUrl,
          title,
          type: TYPES_MAP.get(thickness),
          size,
          price,
        };
    dispatch(addItem(item))
    
  }

  
  return (
    <div className="pizza">
      <img className="pizza__image" src={imageUrl} alt="" />
      <p className="pizza__name">{title}</p>
      <div className="options-wrapper">
        {types.length === 1 ? (
          <ul className="thickness">
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <li
                key={index}
                  className={`${types.includes(index) ? "active" : "disabled"}`}
                >
                  {TYPES_MAP.get(index)}
                </li>
              ))}
          </ul>
        ) : (
          <ul className="thickness">
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <li
                  className={`${thickness === index ? "active" : ""}`}
                  onClick={() => setThickness(index)}
                >
                  {TYPES_MAP.get(index)}
                </li>
              ))}
          </ul>
        )}
        
        <ul className="size">
          {sizeOptions.map((option) =>
            sizes.includes(option) ? (
              <li
              key={uuidv4()}
                className={`${size === option ? "active" : ""}`}
                onClick={() => setSize(option)}
              >
                {option}cм.
              </li>
            ) : (

              <li className="disabled">
                {option}cм.
              </li>
            )
          )}


        </ul>
      </div>
      <div className="bottom">
        <p className="price">от {price} ₽</p>
        <button className={`add-to-cart-btn ${quantity === 0 ? "" : "white"}`} onClick={handleOnClickAddItem}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill={`${quantity === 0 ? "white" : "#EB5A1E"}`}
            
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill={`${quantity === 0 ? "white" : "#EB5A1E"}`}
            />
          </svg>
          <span
            className={`${quantity === 0 ? "" : "orange"}`}
            
          >
            Добавить
          </span>
          {quantity > 1 && <div className="quantity">{quantity}</div>}
        </button>
      </div>
    </div>
  );
};

export default Pizza;
