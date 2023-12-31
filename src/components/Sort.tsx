import React, { useState, useRef, useEffect } from "react";
import ArrowUp from "@/assets/img/arrow-top.svg";
import { setSortID } from "@/redux/slices/filter/slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "@/redux/store";
import { selectFilter } from "@/redux/slices/filter/selectors";

export const SORT_MAP = new Map();
SORT_MAP.set(0, "rating");
SORT_MAP.set(1, "price");
SORT_MAP.set(2, "title");

const Sort: React.FC = React.memo(() => {
  const sortChoices = ["популярности", "цене", "алфавиту"];
  const sortRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { sortID } = useTypedSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChoice = (index: number) => {
    dispatch(setSortID(index));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
});
export default Sort;
