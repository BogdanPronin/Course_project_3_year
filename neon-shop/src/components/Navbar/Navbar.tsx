import React, { useState } from "react";
import "./Navbar.css";
import { FaHeart, FaShoppingCart, FaSearch, FaUser, FaHamburger } from "react-icons/fa";
import logo from "images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { getAllFavorite } from "features/slices/favoriteSlice";
import CartModal from "components/CartModal/CartModal";
import FavModal from "components/FavModal/FavModal";
import { setSearchQuery } from "features/slices/searchSlice";
import { Link } from "react-router-dom"; // Импортируйте Link

export interface IProps {
  data: any;
  cartList: [];
}
type IFavorite = any[] | any;

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isFavOpen, setIsFavOpen] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState(false); // Добавлено состояние для меню


  const cartList: IProps = useSelector((state: any) => state?.carts?.cartList);
  const favoriteList: IFavorite = useSelector(getAllFavorite);
  const navbarCarts = Object.entries(cartList);
  const navbarFavs = Object.entries(favoriteList);

  const dispatch = useDispatch();

  const handleSearchInputChange = (event: any) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          
          <div className="navbar-toggle">
          <FaHamburger  onClick={() => setMenuActive(!menuActive)}></FaHamburger>
            </div> 
          <div className={`nav_items ${menuActive ? 'active' : ''}`}>
            <ul>
              <li><a className="nav_link" href="#3d_container">3D-каталог</a></li>
              <li><a className="nav_link" href="#about">О нас</a></li>
              <li><a className="nav_link" href="#gallery">Наши работы</a></li>
              <li><a className="nav_link" href="#contacts">Контакты</a></li>
              <li className="cart_fav">
                <div className="notifications" onClick={() => setIsFavOpen(!isFavOpen)}>
                  <FaHeart size={20} />
                  <span className="badge"><small>{navbarFavs?.length}</small></span>
                </div>
              </li>
              <li className="cart_item">
                <div className="notifications" onClick={() => setIsCartOpen(!isCartOpen)}>
                  <FaShoppingCart size={20} />
                  <span className="badge"><small>{navbarCarts?.length}</small></span>
                </div>
              </li>
              <li className="user_profile">
                <Link to="/login">
                  <FaUser style={{ color: 'white' }} size={20} />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {isFavOpen && <FavModal setIsFavOpen={setIsFavOpen} navbarFavs={navbarFavs} />}
      {isCartOpen && <CartModal setIsCartOpen={setIsCartOpen} navbarCarts={navbarCarts} />}
    </>
  );
};

export default Navbar;
