import wallet from '../../redux/reducers/wallet';
import { WALLET_DATA, EXPENSES_DATA, DELETE_EXPENSE } from '../../redux/actions';
import { expenses } from '../helpers/mockExpense';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

describe('Verifica Wallet Reducer', () => {
  it('Deve retornar o estado inicial quando nenhuma ação for passada', () => {
    const state = wallet(undefined, {} as any);

    expect(state).toEqual({
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: 0,
    });
  });

  it('Deve lidar com a ação WALLET_DATA', () => {
    const currencies = ['USD', 'EUR'];

    const state = wallet(undefined, {
      type: WALLET_DATA,
      currencies,
    });

    expect(state).toEqual({
      currencies,
      expenses: [],
      editor: false,
      idToEdit: 0,
    });
  });
});

describe('Verifica outros itens do wallet reducer', () => {
  it('Deve lidar com a ação EXPENSES_DATA', () => {
    const expenseAction = wallet(INITIAL_STATE, {
      type: EXPENSES_DATA,
      payload: {
        expenses: expenses.map((exp) => ({ ...exp, exchangeRates: {} })),
        data: {},
      },
    });

    expect(expenseAction).toEqual(expenseAction);
  });

  it('Deve lidar com a ação DELETE_EXPENSE', () => {
    const state = wallet(INITIAL_STATE, {
      type: DELETE_EXPENSE,
      payload: 1,
    });

    expect(state).toEqual({
      ...INITIAL_STATE,
      expenses: [],
    });
  });
});
