import React from 'react'
import Logo from "@/assets/img/pizza-logo.svg"
import Cart from "@/assets/img/cart.svg"


function Header() {
  return (
    <div className="header">
        <div className="logo-wrapper">
            <span className='logo'><img src={Logo} alt="logo" /></span>
            <div className="text-block">
                <h1 className="name">REACT PIZZA</h1>
                <p className="desc">самая вкусная пицца во вселенной</p>
            </div>
        </div>
        <div className="cart-wrapper">
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