import React from "react";
import CartSVG from "@/assets/img/cart.svg";
import Trash from "@/assets/img/trash.svg";
import ArrowLeft from "@/assets/img/grey-arrow-left.svg";
import EmptyCart from "@/assets/img/empty-cart.png";
type Props = {};

const Cart = (props: Props) => {
  return (
    <>
    <div className="empty">
        <h2>Корзина пустая 😕</h2>
        <p>Вероятней всего, вы не заказывали ещё пиццу. <br/> Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
        <div><img src={EmptyCart} alt="" /></div>
        <button>Вернуться назад</button>
    </div>
    <div className="cart">
      <div className="top-section">
        <div className="header-wrapper">
          <img src={CartSVG} alt="cart" />
          <span className="header-text">Cart</span>
        </div>
        <div className="bin-wrapper">
          <img src={Trash} alt="" />
          <span>Clear bin</span>
        </div>
      </div>

      <div className="cart__items">
        <div className="item">
          <div className="left">
            <img src="" alt="" />
            <div className="text-wrap">
              <h2 className="name">Cheeseburger</h2>
              <p className="description">thin crust, 30cm</p>
            </div>
          </div>

          <div className="right">
            <div className="quantity-wrapper">
              <span className="decrement">–</span>
              <h2 className="quantity">3</h2>
              <span className="increment">+</span>
            </div>
            <h2 className="price">350 P</h2>
            <span className="delete">x</span>
          </div>
        </div>
        <div className="total-wrapper">
          <p>
            Всего пицц: <span className="quantity">3 шт.</span>{" "}
          </p>
          <p>
            Сумма заказа: <span className="price">999 Р</span>{" "}
          </p>
        </div>
        <div className="button-wrapper">
          <button className="back">
            <img src={ArrowLeft} alt="" />
            Вернуться назад
          </button>
          <button className="pay">Оплатить сейчас</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cart;
