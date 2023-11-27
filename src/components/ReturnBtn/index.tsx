import React from "react";
import { Link } from "react-router-dom";
import ArrowLeft from "@/assets/img/grey-arrow-left.svg";
import styles from './ReturnBtn.module.scss';

const ReturnBtn = () => {
  return (
    <Link to="/">
      <div className={styles.root}>
        <button>
          <img src={ArrowLeft} alt="" />
          Вернуться назад
        </button>
      </div>
    </Link>
  );
};

export default ReturnBtn;
