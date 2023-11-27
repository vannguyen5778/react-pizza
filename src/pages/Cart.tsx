import CartSVG from "@/assets/img/shopping_cart.svg";
import Trash from "@/assets/img/trash.svg";
import ArrowLeft from "@/assets/img/grey-arrow-left.svg";
import EmptyCart from "@/assets/img/empty-cart.png";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  substractItem,
  clearCart,
  selectCart
} from "@/redux/slices/cartSlice";
import { Link } from "react-router-dom";
const Cart = () => {
  const { items, totalQty, totalPrice } = useSelector(selectCart);
  const dispatch = useDispatch();
  console.log(items);
  return (
    <>
      {items.length === 0 ? (
         <div className="empty">
          <h2>Корзина пустая 😕</h2>
          <p>
            Вероятней всего, вы не заказывали ещё пиццу. <br /> Для того, чтобы
            заказать пиццу, перейди на главную страницу.
          </p>
          <div>
            <img src={EmptyCart} alt="" />
          </div>
          <Link to="/">
            <button>Вернуться назад</button>
          </Link>
        </div> 
       ) : ( 

        <div className="cart">
          <div className="top-section">
            <div className="header-wrapper">
              <img src={CartSVG} alt="cart" />
              <span className="header-text">Корзина</span>
            </div>
            <div className="bin-wrapper">
              <img src={Trash} alt="" />
              <span onClick={() => dispatch(clearCart())}>
                Очистить корзину
              </span>
            </div>
          </div>

          <div className="cart__items">
            {items.map((item, index) => 
              (
                <div className="item" key={index}>
                  <div className="left">
                    <img src={item.imageUrl} alt="" />
                    <div className="text-wrap">
                      <h2 className="name">{item.title}</h2>
                      <p className="description">
                        {item.type}, {item.size}cm
                      </p>
                    </div>
                  </div>

                  <div className="right">
                    <div className="quantity-wrapper">
                      <span
                        className="decrement"
                        onClick={() => dispatch(substractItem(item.id))}
                      >
                        –
                      </span>
                      <h2 className="quantity">{item.count}</h2>
                      <span
                        className="increment"
                        onClick={() => dispatch(addItem(item))}
                      >
                        +
                      </span>
                    </div>
                    <h2 className="price">{item.count ? item.price * item.count : 0} P</h2>
                    <span
                      className="delete"
                      onClick={() => dispatch(removeItem(item))}
                    >
                      x
                    </span>
                  </div>
                </div>
              )
            )}

            <div className="total-wrapper">
              <p>
                Всего пицц: <span className="quantity">{totalQty} шт.</span>{" "}
              </p>
              <p>
                Сумма заказа: <span className="price">{totalPrice} Р</span>{" "}
              </p>
            </div>
            <div className="button-wrapper">
              <Link to='/'>
              <button className="back">
                <img src={ArrowLeft} alt="" />
                Вернуться назад
              </button>
              </Link>
              <button className="pay">Оплатить сейчас</button>
            </div>
          </div>
        </div>

        )}  
    </>
  );
};

export default Cart;
