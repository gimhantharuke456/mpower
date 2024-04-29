import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../Modals/AuthModal";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const authButtonClicked = () => {
    if (localStorage.getItem("userId")) {
      navigate("/community");
    } else {
      setIsAuthModalOpened(true);
    }
  };

  return (
    <header class="header" id="header">
      <div class="section__container header__container">
        <div class="header__content">
          <h1>HARD WORK</h1>
          <h2>ISS FOR EVERY SUCCESS</h2>
          <p>Start by taking inspirations, continue it to give inspirations</p>
          <div class="header__btn">
            <button onClick={authButtonClicked} class="btn btn__primary">
              GET STARTED
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        onClose={() => {
          setIsAuthModalOpened(false);
        }}
        isOpen={isAuthModalOpened}
      />
    </header>
  );
};

export default Header;
