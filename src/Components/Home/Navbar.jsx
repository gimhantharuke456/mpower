import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="nav__bar">
        <div className="nav__header">
          <div className="nav__logo">
            <a href="#">
              <img src="assets/logo.png" alt="logo" />
            </a>
          </div>
          <div className="nav__menu__btn" id="menu-btn">
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <ul className="nav__links" id="nav-links"></ul>
      </div>
    </nav>
  );
};

export default Navbar;
