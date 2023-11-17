import React, { useState } from "react";
import ArrowUp from "@/assets/img/arrow-top.svg";
import { useSearching } from "@/context/SearchingContext";

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
              <li onClick={() => handleChoice(index)}>{choice}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
