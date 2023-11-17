import { useSearching } from "@/context/SearchingContext";

function Categories() {
  const { clickedCategory, setClickedCategory } = useSearching();

  const categories = [
    "Все",
    "Мясные",
    "Вегетерианские",
    "Острые",
    "Открытые",
    "Закрытые",
  ];
  const handleClickedCategory = (index: number) => {
    setClickedCategory(index);
    console.log(index);
  };
  return (
    <ul className="categories">
      {categories.map((el, index) => (
        <li
          className={`${
            clickedCategory === index ? "active" : "categories-btn"
          }`}
          key={el}
          onClick={() => handleClickedCategory(index)}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
