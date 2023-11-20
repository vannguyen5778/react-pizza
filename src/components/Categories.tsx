// import { useSearching } from "@/context/SearchingContext";
import { useSelector, useDispatch } from "react-redux";
import { setClickedCategory } from "@/redux/slices/filterSlice";
import { filter } from "@/redux/slices/Filter"

function Categories() {
  // const { setClickedCategory } = useSearching();
  const { clickedCategory } = useSelector(state => state.filter);
// console.log(clickedCategory)
  const dispatch = useDispatch()
  
  const onChangeCategory = (index: number) => {
    dispatch(setClickedCategory(index))
    console.log(clickedCategory)
  }
  const categories = [
    "Все",
    "Мясные",
    "Вегетерианские",
    "Острые",
    "Открытые",
    "Закрытые",
  ];
 
  
  return (
    <ul className="categories">
      {categories.map((el, index) => (
        <li
          className={`${
            clickedCategory == index ? "active" : "categories-btn"
          }`}
          key={el}
          onClick={() => onChangeCategory(index)}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
