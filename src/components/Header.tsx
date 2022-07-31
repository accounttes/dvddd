import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import './styles/Header.scss';

const Header = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  let location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src="/images/header-logo.png" alt="header-logo" />
      <img
        className="mobile-header__logo"
        src="/images/mobile-header-logo.png"
        alt="mobile-header-logo"
      />
      {isAuth && location.pathname === '/posts' && (
        <div className="header__logout-block">
          <span className="header__username">Username</span>
          <Link
            to={'/'}
            onClick={() =>
              (document.cookie = `access_token=''; ; secure=true; SameSite=strict; max-age=-1`)
            }>
            <button>
              {' '}
              <img className="header__logout" src="/images/logout.png" alt="logout" />
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
