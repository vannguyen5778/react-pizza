import { useEffect, useState } from "react";
import Categories from "@/components/Categories";
import Sort from "@/components/Sort";
import Pizza from "@/components/Pizza";
import Skeleton from "@/components/Pizza/Skeleton";
import { useSearching, ItemProps } from "@/context/SearchingContext";
import axios from "axios";
import { SORT_MAP } from "@/components/Sort";
import PaginationComponent from "@/components/Pagination";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCategoryID } from "@/redux/slices/filterSlice";

function Home() {
  const itemsPerPage = 4;
  const { sortID, clickedCategory, searchedValue, page } = useSearching();

 const categoryID = useSelector(state => state.filter.categoryID);
//  console.log("categoryID", categoryID)
const dispatch = useDispatch()
// console.log("dispatch", dispatch)
const onChangeCategory = (id) => {
  // console.log(id)
  dispatch(setCategoryID(id))
}
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getParams = (clickedCategory: number, sortID: number) => {
    return clickedCategory === 0
      ? { sortBy: SORT_MAP.get(sortID) }
      : { sortBy: SORT_MAP.get(sortID), category: clickedCategory.toString() };
  };

  useEffect(() => {
    setIsLoading(true);
    // console.log(SORT_MAP.get(sortID));
    axios
      .get("https://65559a0b84b36e3a431dfcd7.mockapi.io/items", {
        params: {
          ...getParams(clickedCategory, sortID),
          page: page.toString(),
          limit: itemsPerPage.toString(),
        },
      })
      .then((res) => {
        searchedValue !== ""
          ? setItems(
              res.data.filter((pizza: ItemProps) =>
                pizza.title
                  .toLocaleLowerCase()
                  .includes(searchedValue.toLocaleLowerCase())
              )
            )
          : setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [clickedCategory, sortID, searchedValue, page]);

  return (
    <>
      <div className="top-section">
        <Categories />
        <Sort />
      </div>

      <div className="pizza-block">
        <h1>Пиццы</h1>
        {items.length === 0 && !isLoading ? (
          <div className="pizzas__error">
            <h2>Произошла ошибка 😕</h2>
            <p>
              К сожалению, не удалось получить питсы. Попробуйте повторить
              попытку позже.
            </p>
          </div>
        ) : (
          <>
            <div className="pizzas">
              {isLoading
                ? Array(10)
                    .fill(null)
                    .map((_, index) => <Skeleton key={index} />)
                : items.map((pizza, index) => (
                    <Pizza pizzaData={pizza} key={index} />
                  ))}
            </div>
            <PaginationComponent
              totalItems={items.length}
              itemsPerPage={itemsPerPage}
              
            />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
