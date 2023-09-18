import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Header() {
  const userEmail = useSelector((state: ReduxState) => state.user.email);

  return (
    <header>
      <div data-testid="email-field">
        E-mail:
        {' '}
        {userEmail}
      </div>

      <div data-testid="total-field">Total: 0</div>

      <div data-testid="header-currency-field">BRL</div>
    </header>
  );
}

export default Header;
