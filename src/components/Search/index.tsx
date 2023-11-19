import React from "react";
import styles from "./Search.module.scss";
import SearchIcon from "@/assets/img/magnifying-glass.svg";
import CloseIcon from "@/assets/img/close.svg";
import { useSearching } from "@/context/SearchingContext";

const Search = () => {
  const { searchedValue, setSearchedValue } = useSearching();
 
  return (
    <div className={styles.root}>
      <span className={styles.glass}>
        <img src={SearchIcon} className="glass" alt="magnifying glass icon" />
      </span>
      <input
        type="text"
        placeholder="Поиск пиццы..."
        value={searchedValue}
        onChange={(e) => {
          setSearchedValue(e.target.value);
        }}
      />
      {searchedValue.length > 0 && (
        <span className={styles.close}
        onClick={() => {setSearchedValue(""); console.log(searchedValue)}}
        >
          <img className="close" src={CloseIcon} alt="close icon" />
        </span>
       )} 
    </div>
  );
};

export default Search;
