import React, { useState, useRef, useEffect } from "react";
import ArrowUp from "@/assets/img/arrow-top.svg";
// import { useSearching } from "@/context/SearchingContext";
import { setSortID } from "@/redux/slices/filterSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "@/redux/store";
export const SORT_MAP = new Map();
SORT_MAP.set(0, "rating");
SORT_MAP.set(1, "price");
SORT_MAP.set(2, "title");

const Sort = () => {
  const sortChoices = ["популярности", "цене", "алфавиту"];
  const sortRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { sortID } = useTypedSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleChoice = (index: number) => {
    dispatch(setSortID(index));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event
          .composedPath()
          .some(
            (element: EventTarget | HTMLElement) => element === sortRef.current
          )
      ) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort-wrapper">
      <div ref={sortRef} className="sort">
        <img src={ArrowUp} alt="arrow up" />
        <span className="sort__text">Сортировка по: </span>
        <span className="sort__choice" onClick={() => setOpen(!isOpen)}>
          {sortChoices[sortID]}
        </span>
      </div>
      {isOpen && (
        <div className="sort-popup">
          <ul>
            {sortChoices.map((choice, index) => (
              <li key={index} onClick={() => handleChoice(index)}>
                {choice}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
