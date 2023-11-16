import React from "react";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="pizzas__error">
      <h2>Ничего не найдено 😕</h2>
      <p>
        К сожалению, данная страница отсутсвует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotFound;
