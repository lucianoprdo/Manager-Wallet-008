import { getApi } from '../../services/getApi';
import { Dispatch, ExpensesType, UserType } from '../../types';

export const LOGIN_DATA = 'LOGIN_DATA';
export const WALLET_DATA = 'WALLET_DATA';
export const EXPENSES_DATA = 'EXPENSES_DATA';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATED_EXPENSES = 'UPDATED_EXPENSES';

export const saveLogin = (login: UserType) => ({
  type: LOGIN_DATA,
  payload: login,
});

export const saveCurrencies = (currencies: string[]) => ({
  type: WALLET_DATA,
  currencies,
});

export const saveExpenses = (data: object, expenses: object) => ({
  type: EXPENSES_DATA,
  payload: { expenses, data },
});

export const deleteExpenses = (id: number) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpenses = (id: number) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const updatedExpenses = (expense: ExpensesType) => ({
  type: UPDATED_EXPENSES,
  payload: expense,
});

export function fetchCurrencies() {
  return async (dispatch: Dispatch) => {
    try {
      const data = await getApi();
      const currencies = Object.keys(data);
      dispatch(saveCurrencies(currencies));
    } catch (error: any) {
      throw new Error('Erro ao buscar dados da API: + error.message');
    }
  };
}

export function fetchExpenses(expenses: object) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await getApi();
      dispatch(saveExpenses(data, expenses));
    } catch (error: any) {
      throw new Error('Erro ao buscar dados da API: + error.message');
    }
  };
}
