import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./FullPizza.module.scss";
import ReturnBtn from "@/components/ReturnBtn";
import Loader from "@/components/Loader";

type PizzaData = {
  id: string;
  imageUrl: string;
  title: string;
  types: [];
  sizes: [];
  price: number;
  count?: number;
};

const FullPizza = () => {
  const TYPES_MAP = new Map();
  TYPES_MAP.set(0, "тонкое");
  TYPES_MAP.set(1, "традиционное");

  const [pizza, setPizza] = useState<PizzaData>();
  const [description, setDescription] = useState<string>("");
  const { id } = useParams();
  const defaultDescription =
    "Огонь настоящей итальянской кухни, она соблазняет своим нежным тестом, покрытым ароматным соусом из спелых помидоров. Под щедрой порцией сыра, растопившегося в золотистую корочку, скрываются разнообразные ингредиенты, приправленные тонкими специями. Одним словом, пицца - это настоящий кулинарный шедевр, который нельзя отказаться попробовать!";
  const navigate = useNavigate();

  const getData = (subject: string) => {
    const question = `напиши краткое описание пиццы ${subject} в 30 словах на русском`;

    const options = {
      method: "POST",
      url: "https://simple-chatgpt-api.p.rapidapi.com/ask",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "c6c6be8816msh9e9024388c1e342p1a05a8jsn4db5e05df3c8",
        "X-RapidAPI-Host": "simple-chatgpt-api.p.rapidapi.com",
      },
      data: {
        question,
      },
    };

   try {
  axios.request(options)
    .then(response => {
      const data = response.data;
      return data ? data.answer : defaultDescription;
    })
    .catch(error => {
      console.error(error);
      return defaultDescription;
    });
} catch (error) {
  console.error(error);
  return defaultDescription;
}
  }

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://65559a0b84b36e3a431dfcd7.mockapi.io/items/${id}`
        );
        setPizza(data);
        const descriptionData = await getData(data?.title); 
      setDescription(descriptionData ?? defaultDescription); 
      } catch {
        alert("Произошла ошибка при загрузке пиццы");
        navigate("/");
      }
    }
    fetchPizza();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pizza || !description) return <Loader />;

  return (
    <>
      <div className={styles.root}>
        <img src={pizza.imageUrl} alt="" />
        <div className="content-wrapper">
          <h1>{pizza.title}</h1>
          <h2>{description}</h2>
          <h3>
            {pizza.sizes.length > 1 ? "Имеются пиццы " : "Имеeтся пицца"}{" "}
            {pizza.sizes
              .map((size, index: number) => {
                if (pizza.sizes.length < 2) return size + "см";
                if (index === pizza.sizes.length - 1) {
                  return "и " + size + "см";
                } else if (index === pizza.sizes.length - 2) {
                  return size + "см ";
                } else {
                  return size + "см, ";
                }
              })
              .join("")}{" "}
            {pizza.sizes.length > 1 ? "размеров" : "размера"}.
          </h3>
          <h3>
            {" "}
            В наличии{" "}
            {pizza.types
              .map((type) => {
                if (pizza.types.length > 1) {
                  return "и " + TYPES_MAP.get(type);
                } else {
                  return TYPES_MAP.get(type);
                }
              })
              .join("")}{" "}
            тесто.
          </h3>
          <h3>Стоимость одной пиццы: {pizza.price} ₽</h3>
        </div>
      </div>
      <ReturnBtn />
    </>
  );
};

export default FullPizza;
