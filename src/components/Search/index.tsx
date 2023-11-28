import React, { useCallback, useState } from "react";
import styles from "./Search.module.scss";
import SearchIcon from "@/assets/img/magnifying-glass.svg";
import CloseIcon from "@/assets/img/close.svg";
import { useRef } from "react";
import { debounce } from "lodash";
import { setSearchedValue } from "@/redux/slices/filter/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "@/redux/slices/filter/selectors";

const Search = () => {
  const inputRef = useRef();
  const { searchedValue } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onChangeInput = (e) => {
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
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <span className={styles.glass}>
        <img src={SearchIcon} className="glass" alt="magnifying glass icon" />
      </span>
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск пиццы..."
        value={searchedValue}
        onChange={(e) => onChangeInput(e)}
      />
      {searchedValue.length > 0 && (
        <span className={styles.close} onClick={() => onClickClear()}>
          <img className="close" src={CloseIcon} alt="close icon" />
        </span>
      )}
    </div>
  );
};

export default Search;
