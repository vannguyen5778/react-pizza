import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './FullPizza.module.scss'
import ReturnBtn from "@/components/ReturnBtn";
import { reuleaux } from 'ldrs'


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
  const [description, setDescription] = useState<string>('');
  const { id } = useParams();
  const defaultDescription = "Огонь настоящей итальянской кухни, она соблазняет своим нежным тестом, покрытым ароматным соусом из спелых помидоров. Под щедрой порцией сыра, растопившегося в золотистую корочку, скрываются разнообразные ингредиенты, приправленные тонкими специями. Одним словом, пицца - это настоящий кулинарный шедевр, который нельзя отказаться попробовать!";

  reuleaux.register();






 
       
const getData = (subject) => {
      // const question = `напиши краткое описание пиццы ${subject} в 30 словах на русском`

  const options = {
    method: 'POST',
    url: 'https://simple-chatgpt-api.p.rapidapi.com/ask',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'c6c6be8816msh9e9024388c1e342p1a05a8jsn4db5e05df3c8',
      'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
    },
    data: {
      question: 'give a mouthwatering description about pizza in 2-3 sentences'
    }
  };
  
  try {
    const { data } = axios.request(options);
    return (data) ? data.answer : defaultDescription
  } catch {
    console.error();
  }
}


  useEffect(() => {
    async function fetchPizza (){
      try {
        const { data } = await axios.get(
          `https://65559a0b84b36e3a431dfcd7.mockapi.io/items/${id}`
        );
        setPizza(data);
        console.log(pizza?.title);
        await setDescription(getData(pizza?.title));
      } catch {
        console.log("Произошла ошибка при загрузке пиццы");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza || !description) return  (
  <div className={styles.loader}>
    <l-reuleaux color="#fe5f1e"></l-reuleaux>
    </div>
  )
 
{/* <l-reuleaux
  size="37"
  stroke="5"
  stroke-length="0.15"
  bg-opacity="0.1"
  speed="1.2"
  color="black" 
></l-reuleaux> */}


 
  

  return (
    <>
    <div className={styles.root}>
      <img src={pizza.imageUrl} alt="" />
      <h1>{pizza.title}</h1>
      <h2>{description}</h2>
      <h3>
      {pizza.sizes.length == 1 ? "Имеeтся пицца" : "Имеются пиццы" } {" "}
        {pizza.sizes
          .map((size, index) => {
            if (pizza.sizes.length == 1) return size.toString() + "см"
              else if (index === pizza.sizes.length - 1) {
              return "и " + size.toString() + "см";
            } else if (index === pizza.sizes.length - 2) {
              return size.toString() + "см ";
            } else {
              return size.toString() + "см, ";
            }
          })
          .join("")} {pizza.sizes.length == 1 ? "размера" : "размеров"}
        .
      </h3>
      <h3> В наличии {pizza.types
          .map((type) => {
            if (pizza.types.length == 1) {return TYPES_MAP.get(type)}
            else {
              return "и " + TYPES_MAP.get(type);
            } 
          })
          .join("")} тесто.</h3>
      <h3>Стоимость одной пиццы: {pizza.price} ₽</h3>
      </div>
      <ReturnBtn />
      </>
  );
};

export default FullPizza;
