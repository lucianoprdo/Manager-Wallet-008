import { ExpensesType, WalletActionTypes } from '../../types';

export interface SetCurrenciesAction {
  type: WalletActionTypes.SET_CURRENCIES;
  currencies: string[];
}

export interface AddExpenseAction {
  type: WalletActionTypes.ADD_EXPENSE;
  expense: ExpensesType;
}

export function setCurrencies(currencies: string[]): SetCurrenciesAction {
  return {
    type: WalletActionTypes.SET_CURRENCIES,
    currencies,
  };
}

export function addExpense(expense: ExpensesType): AddExpenseAction {
  return {
    type: WalletActionTypes.ADD_EXPENSE,
    expense,
  };
}
