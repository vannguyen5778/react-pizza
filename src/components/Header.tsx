import React, { useEffect } from 'react'
import Logo from "@/assets/img/pizza-logo.svg"
import Cart from "@/assets/img/cart.svg"
import { Link, useLocation } from 'react-router-dom'
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSortID, setClickedCategory } from '@/redux/slices/filterSlice';
import { selectCart } from '@/redux/slices/cartSlice';
function Header() {
const dispatch = useDispatch();
const location = useLocation();
const { totalPrice, totalQty } = useSelector(selectCart)

  return (
    <div className="header">
        <Link to="/">
        <div className="logo-wrapper" onClick={() => {dispatch(setSortID(0)); dispatch(setClickedCategory(0))}}>
            <span className='logo'><img src={Logo} alt="logo" /></span>
            <div className="text-block">
                <h1 className="name">REACT PIZZA</h1>
                <p className="desc">самая вкусная пицца во вселенной</p>
            </div>
        </div>
        </Link>
        <Search />
        {(location.pathname !== "/cart") && (

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
  )
}

export default Header