import { AnyAction } from 'redux';
import { WALLET_DATA, EXPENSES_DATA,
  DELETE_EXPENSE, EDIT_EXPENSE, UPDATED_EXPENSES } from '../actions';
import { ExpenseItem } from '../../types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case WALLET_DATA:
      return {
        ...state,
        currencies: action.currencies,
      };

    case EXPENSES_DATA:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          {
            ...action.payload.expenses,
            id: state.expenses.length,
            exchangeRates: action.payload.data,
          },
        ],
      };

    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((id: ExpenseItem) => id.id !== action.payload),
      };

    case EDIT_EXPENSE:
      return {
        ...state,
        edition: true,
        idEdit: action.payload,
      };

    case UPDATED_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        edition: false,
      };

    default:
      return state;
  }
}

export default wallet;
