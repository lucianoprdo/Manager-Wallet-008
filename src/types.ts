import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type UserType = {
  email: string;
  password: string;
};

export type WalletType = {
  currencies: CurrencyType[],
  expenses: ExpenseTypeWithExchangedRates[],
  editor: boolean,
  idToEdit: number,
  isFetching: boolean,
  count: number,
};

export type CurrencyType = 'USD' | 'ARS' | 'AUD' | 'BTC' | 'CAD' | 'CHF' | 'XRP' | 'CNY' |
'DOGE' | 'ETH' | 'EUR' | 'GBP' | 'ILS' | 'JPY' | 'LTC';

export type ExpenseType = {
  value: string;
  description: string;
  currency: CurrencyType
  method: string;
  tag: string;
};

export type ExchangeRatesType = {
  USD: { ask: string, name: string };
  ARS: { ask: string, name: string };
  AUD: { ask: string, name: string };
  BTC: { ask: string, name: string };
  CAD: { ask: string, name: string };
  CHF: { ask: string, name: string };
  XRP: { ask: string, name: string };
  CNY: { ask: string, name: string };
  DOGE: { ask: string, name: string };
  ETH: { ask: string, name: string };
  EUR: { ask: string, name: string };
  GBP: { ask: string, name: string };
  ILS: { ask: string, name: string };
  JPY: { ask: string, name: string };
  LTC: { ask: string, name: string };
};

export type ExpenseTypeWithExchangedRates = ExpenseType & {
  exchangeRates: ExchangeRatesType;
  id: number;
};

export type ReduxState = {
  user: UserType;
  wallet: WalletType;
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
