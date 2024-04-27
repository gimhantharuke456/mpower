import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="nav__header">
          <div className="nav__logo">
            <Link to="#">
              <img src="assets/logo.png" alt="logo" />
              Power
            </Link>
          </div>
          <div className="nav__menu__btn" id="menu-btn">
            <span>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
        <ul className="nav__links" id="nav-links">
          <li className="link">
            <Link to="#home">Home</Link>
          </li>
          <li className="link">
            <button className="btn">Community</button>
          </li>
        </ul>
      </nav>
      <div className="section__container header__container" id="home">
        <div className="header__image">
          <img src="assets/header.png" alt="header" />
        </div>
        <div className="header__content">
          <h4>Build Your Body &</h4>
          <h1 className="section__header">Shape Yourself!</h1>
          <p>
            Unleash your potential and embark on a journey towards a stronger,
            fitter, and more confident you. Sign up for 'Make Your Body Shape'
            now and witness the incredible transformation your body is capable
            of!
          </p>
          <div className="header__btn">
            <button className="btn">Join Today</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
