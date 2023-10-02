import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export enum WalletActionTypes {
  SET_CURRENCIES = 'SET_CURRENCIES',
  ADD_EXPENSE = 'ADD_EXPENSE',
  UPDATE_EXPENSE = 'UPDATE_EXPENSE',
  REMOVE_EXPENSE = 'REMOVE_EXPENSE',
}

export type UserType = {
  email: string;
  password: string;
};

export type WalletType = {
  currencies: string[],
  expenses: [{
    id: number,
    value: number;
    currency: number;
    method: string;
    tag: string;
    description: string;
    exchangeRates: [{
      ask: number;
      name: string;
    }];
  }],
  edition: boolean;
  idToEdit: number;
  count: number;
};

export type ReduxState = {
  user: UserType;
  wallet: WalletType;
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;

export type CurrencyType = 'USD' | 'ARS' | 'AUD' | 'BTC' | 'CAD' | 'CHF' | 'XRP' | 'CNY' |
'DOGE' | 'ETH' | 'EUR' | 'GBP' | 'ILS' | 'JPY' | 'LTC';

export type ExpensesType = {
  id: number;
  value: string;
  description: string;
  currency: CurrencyType;
  method: string;
  tag: string;
  convertedValue?: number | string,
  exchangeRates: {
    [currency: string]: {
      code: string;
      name: string;
      ask: number;
    };
  };
};

export type ExpenseItem = {
  id: number,
  value: number;
  currency: number;
  method: string;
  tag: string;
  description: string;
};
