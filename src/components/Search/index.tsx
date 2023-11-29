import { useCallback, useEffect, useState } from "react";
import styles from "./Search.module.scss";
import SearchIcon from "@/assets/img/magnifying-glass.svg";
import CloseIcon from "@/assets/img/close.svg";
import { useRef } from "react";
import { debounce } from "lodash";
import { setSearchedValue } from "@/redux/slices/filter/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "@/redux/slices/filter/selectors";
import { useMediaQuery } from "react-responsive";

const Search = () => {
  const isDesktop = useMediaQuery({ minWidth: 1094 });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { searchedValue } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [isExpanded, setExpand] = useState<boolean>(true);
  const searchRef = useRef<HTMLDivElement>(null);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchValue(e.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchedValue(str));
    }, 250),
    []
  );

  const onClickClear = () => {
    dispatch(setSearchedValue(""));
    inputRef.current?.focus();
  };

  useEffect(() => {
    isDesktop ? setExpand(true) : setExpand(false);
  }, [isDesktop]);
  const handleExpand = () => {
    setExpand((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !event
          .composedPath()
          .some(
            (element: EventTarget | HTMLElement) =>
              element === searchRef.current
          )
      ) {
        setExpand(false);
      }
    };
    if (!isDesktop) {
      document.body.addEventListener("click", handleClickOutside);
      return () => {
        document.body.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isDesktop]);

  return (
    <>
      <div className={styles.root} ref={searchRef}>
        <span className={styles.glass} onClick={() => handleExpand()}>
          <img src={SearchIcon} className="glass" alt="magnifying glass icon" />
        </span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Поиск пиццы..."
          value={searchedValue}
          onChange={(e) => onChangeInput(e)}
          className={`${isExpanded ? styles.expanded : styles.notExpanded}`}
        />
        {searchedValue.length > 0 && (
          <span className={styles.close} onClick={() => onClickClear()}>
            <img className="close" src={CloseIcon} alt="close icon" />
          </span>
        )}
      </div>
    </>
  );
};

export default Search;
