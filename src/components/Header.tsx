import React from 'react'
import Logo from "@/assets/img/pizza-logo.svg"
import Cart from "@/assets/img/cart.svg"


function Header() {
  return (
    <div className="header">
        <div className="left">
            <span><img src={Logo} alt="logo" /></span>
            <div className="text-block">
                <p className="name">REACT PIZZA</p>
                <p className="desc">самая вкусная пицца во вселенной</p>
            </div>
        </div>
        <div className="right">
            <button>
                <div className="total-price">
                    <span>0</span>
                    <span>₽</span>
                </div>
                <div className="item-quantity">
                    <img src={Cart} alt="" />
                    <span>0</span>                    
                </div>
            </button>
        </div>
    </div>
  )
}

export default Header