import { useSelector, useDispatch } from "react-redux";
import { setClickedCategory } from "@/redux/slices/filter/slice";
import { selectFilter } from "@/redux/slices/filter/selectors";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";
import { useCallback } from "react";

const Categories: React.FC = () => {
  useWhyDidYouUpdate("Categories", {});

  const { clickedCategory } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onChangeCategory = useCallback(
    (index: number) => {
      dispatch(setClickedCategory(index));
    },
    [dispatch]
  );

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
};
export default Categories;
