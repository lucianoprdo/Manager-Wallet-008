import { AnyAction } from 'redux';
import { ADD_EXPENSE } from '../actions/walletActions';
import { WalletType } from '../../types';

const INITIAL_STATE: WalletType = {
  isFetching: false,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  count: 0,
};

const walletReducer = (state = INITIAL_STATE, { type, payload }: AnyAction) => {
  switch (type) {
    case ADD_EXPENSE:
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
