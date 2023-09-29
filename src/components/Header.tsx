import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Header() {
  const { user, wallet } = useSelector((state: ReduxState) => state);
  const { expenses } = wallet;

  const totalExpenses: number = expenses.reduce((acc, cur) => (
    Number(cur.exchangeRates[cur.currency]?.ask ?? 0) * cur.value + acc
  ), 0);

  return (
    <div>
      <p data-testid="email-field">
        E-mail:
        {' '}
        {user.email}
      </p>
      <div>
        <span>Despesa Total:</span>
        <span data-testid="total-field">{totalExpenses.toFixed(2)}</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    </div>
  );
}

export default Header;
