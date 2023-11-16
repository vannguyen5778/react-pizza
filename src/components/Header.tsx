import React from 'react'
import Logo from "@/assets/img/pizza-logo.svg"
import Cart from "@/assets/img/cart.svg"
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="header">
        <Link to="/">
        <div className="logo-wrapper">
            <span className='logo'><img src={Logo} alt="logo" /></span>
            <div className="text-block">
                <h1 className="name">REACT PIZZA</h1>
                <p className="desc">самая вкусная пицца во вселенной</p>
            </div>
        </div>
        </Link>
        <Link to="/cart">
        <div className="cart-wrapper">
            <button>
                <span className="total-price">
                    <span>0</span>
                    <span>₽</span>
                </span>
                <span className="item-quantity">
                    <img src={Cart} alt="" />
                    <span>0</span>                    
                </span>
            </button>
        </div>
        </Link>
    </div>
  )
}

export default Header