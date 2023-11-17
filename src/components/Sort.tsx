import React, { useState } from "react";
import ArrowUp from "@/assets/img/arrow-top.svg";
import { useSearching } from "@/context/SearchingContext";

export const SORT_MAP = new Map();
  SORT_MAP.set(0, "rating");
  SORT_MAP.set(1, "price");
  SORT_MAP.set(2, "title");

const Sort = () => {
  const sortChoices = ["популярности", "цене", "алфавиту"];
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const { sortID, setSortID } = useSearching();
  const handleChoice = (index: number) => {
    setSortID(index);
    setPopupOpen(false);
  };
  return (
    <div className="sort-wrapper">
      <div className="sort">
        <img src={ArrowUp} alt="arrow up" />
        <span className="sort__text">Сортировка по: </span>
        <span
          className="sort__choice"
          onClick={() => setPopupOpen(!isPopupOpen)}
        >
          {sortChoices[sortID]}
        </span>
      </div>
      {isPopupOpen && (
        <div className="sort-popup">
          <ul>
            {sortChoices.map((choice, index) => (
              <li key={index} onClick={() => handleChoice(index)}>{choice}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
