import  { useEffect, useRef } from "react";
import Logo from "@/assets/img/pizza-logo.svg";
import Cart from "@/assets/img/cart.svg";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { setSortID, setClickedCategory } from "@/redux/slices/filter/slice";
import { selectCart } from "@/redux/slices/cart/selectors";
import useMediaQuery from "@/utils/mediaQueries";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLargerThanTablet = useMediaQuery('840px');
  const { totalPrice, totalQty, items } = useSelector(selectCart);
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items, dispatch]);

  return (
    <div className="header">
      <Link to="/">
        <div
          className="logo-wrapper"
          onClick={() => {
            dispatch(setSortID(0));
            dispatch(setClickedCategory(0));
          }}
        >
          <span className="logo">
            <img src={Logo} alt="logo" />
          </span>
          <div className="text-block">
            <h1 className="name">REACT PIZZA</h1>
            <p className="desc">самая вкусная пицца во вселенной</p>
          </div>
        </div>
      </Link>

      <div className="header-wrap">
        {!location.pathname.startsWith("/pizza/") && isLargerThanTablet && <Search />}
        {location.pathname !== "/cart" && (
          <Link to="/cart">
            <div className="cart-wrapper">
              <button>
                <span className="total-price">
                  <span>{totalPrice}</span>
                  <span>₽</span>
                </span>
                <span className="item-quantity">
                  <img src={Cart} alt="" />
                  <span>{totalQty}</span>
                </span>
              </button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
