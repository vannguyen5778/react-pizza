import { useEffect } from "react";
import "axios";
import axios from "axios";
import { useSorting } from "@/context/SearchingContext";

import React from "react";

const fetchData = () => {
  const { clickedCategory } = useSorting();

  axios
    .get("https://65559a0b84b36e3a431dfcd7.mockapi.io/items")
    .then((res) => console.log(res));
};

export default fetchData;
