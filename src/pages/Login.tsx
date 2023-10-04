import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SAVE_USER_EMAIL } from '../redux/actions/userActions';

function Login() {
  const INITIAL_STATE = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(INITIAL_STATE);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validatedEmail = (userEmail: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(userEmail);
  };

  const handleLogin = () => {
    dispatch({ type: SAVE_USER_EMAIL, payload: { email: userInfo.email } });

    navigate('/carteira');
  };

  useEffect(() => {
    const checkButtonStatus = () => {
      if (validatedEmail(userInfo.email) && userInfo.password.length >= 6) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    };

    checkButtonStatus();
  }, [userInfo.email, userInfo.password]);

  return (
    <div>
      <h2>Página de Login</h2>
      <form>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            data-testid="email-input"
            placeholder="E-mail"
            value={ userInfo.email }
            onChange={ (event) => setUserInfo({
              ...userInfo, email: event.target.value }) }
          />
          {emailError && <div>{emailError}</div>}
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            data-testid="password-input"
            value={ userInfo.password }
            onChange={ (event) => setUserInfo({
              ...userInfo, password: event.target.value }) }
          />
          {passwordError && <div>{passwordError}</div>}
        </div>

        <button
          type="button"
          name="entrar"
          onClick={ handleLogin }
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>

      </form>
    </div>
  );
}

export default Login;
