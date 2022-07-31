import React, { useState, useEffect } from 'react';
import './styles/AuthWindow.scss';
import fetchData from '../utils/fetchData';
import { fakeData } from '../constants/fakeData';
import { setIsAuth } from '../redux/slices/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sendForm from '../utils/sendForm';
const AuthWindow = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationErr, setValidationErr] = useState<string>('');

  useEffect(() => {
    try {
      fetchData('/register', fakeData);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onKeyDown = (e: any) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault();
      sendForm(login, password, setValidationErr, dispatch, setIsAuth, navigate);
    }
  };

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <section className="auth">
      <form className="auth-wrapper" onKeyDown={onKeyDown}>
        <div className="auth__title">Autorization</div>
        <div className="auth-form">
          <div className="auth-form-field">
            <div className="auth-form-field-login__label">
              <label htmlFor="login">login</label>
            </div>
            <input
              className="auth-form-field__input"
              type="text"
              id="login"
              value={login}
              onChange={handleLogin}
            />
          </div>
          <div className="auth-form-field">
            <div className="auth-form-field-register__label">
              <label htmlFor="password">password</label>
            </div>
            <input
              className="auth-form-field__input"
              type="text"
              id="password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className="auth-form__error">{validationErr}</div>
        </div>
      </form>
    </section>
  );
};

export default AuthWindow;
