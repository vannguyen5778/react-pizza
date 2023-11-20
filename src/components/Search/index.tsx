import React, { useCallback, useState } from "react";
import styles from "./Search.module.scss";
import SearchIcon from "@/assets/img/magnifying-glass.svg";
import CloseIcon from "@/assets/img/close.svg";
import { useSearching } from "@/context/SearchingContext";
import { useRef } from "react";
import { debounce } from "lodash";

const Search = () => {
  const { setSearchedValue } = useSearching();
  const inputRef = useRef();
  const [value, setValue] = useState<string>("");

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchedValue(str);
    }, 250),
    []
  );

  const onClickClear = () => {
    setSearchedValue("");
    setValue("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <span className={styles.glass}>
        <img src={SearchIcon} className="glass" alt="magnifying glass icon" />
      </span>
      <input
        type="text"
        placeholder="Поиск пиццы..."
        value={value}
        onChange={(e) => onChangeInput(e)}
      />
      {value.length > 0 && (
        <span className={styles.close} onClick={() => onClickClear()}>
          <img className="close" src={CloseIcon} alt="close icon" />
        </span>
      )}
    </div>
  );
};

export default Search;
