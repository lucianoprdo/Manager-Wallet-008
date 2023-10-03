import {
  deleteExpenses,
  editExpenses,
  updatedExpenses,
  saveLogin,
  saveCurrencies,
  saveExpenses,
} from '../../redux/actions/index';

describe('Verifica loginData', () => {
  it('deve retornar uma action com o tipo LOGIN_DATA e o payload com o login', () => {
    const login = { email: 'tryber@teste.com' };
    const expectedAction = {
      type: 'LOGIN_DATA',
      payload: login,
    };

    const action = saveLogin(login);

    expect(action).toEqual(expectedAction);
  });
});

describe('Verifica WALLET_DATA', () => {
  it('deve retornar uma action com o tipo WALLET_DATA e o payload com as moedas', () => {
    const currencies = ['USD', 'BRL', 'CAD'];
    const expectedAction = {
      type: 'WALLET_DATA',
      currencies,
    };

    const action = saveCurrencies(currencies);

    expect(action).toEqual(expectedAction);
  });
});

describe('expensesData', () => {
  it('deve retornar uma action com o tipo EXPENSES_DATA e o payload com as despesas e os dados da API', () => {
    const data = { USD: { ask: 1.0 }, BRL: { ask: 5.0 } };
    const expenses = [{ id: 1, value: 100, currency: 'USD' }];
    const expectedAction = {
      type: 'EXPENSES_DATA',
      payload: { expenses, data },
    };

    const action = saveExpenses(data, expenses);

    expect(action).toEqual(expectedAction);
  });
});

describe('Verifica deleteExpenses', () => {
  it('Deve retornar uma action com o tipo DELETE_EXPENSE e o payload com o id da despesa a ser deletada', () => {
    const id = 1;
    const expectedAction = {
      type: 'DELETE_EXPENSE',
      payload: id,
    };

    const action = deleteExpenses(id);

    expect(action).toEqual(expectedAction);
  });
});

describe('Verifica editExpenses', () => {
  it('Deve retornar uma action com o tipo EDIT_EXPENSE e o payload com o id da despesa a ser editada', () => {
    const id = 1;
    const expectedAction = {
      type: 'EDIT_EXPENSE',
      payload: id,
    };

    const action = editExpenses(id);

    expect(action).toEqual(expectedAction);
  });
});

describe('Verifica updatedExpenses', () => {
  it('Deve retornar uma action com o tipo UPDATED_EXPENSES e o payload com a despesa atualizada', () => {
    const expense = { id: 1, value: 100, currency: 'USD' };
    const expectedAction = {
      type: 'UPDATED_EXPENSES',
      payload: expense,
    };

    const action = updatedExpenses(expense);

    expect(action).toEqual(expectedAction);
  });
});

describe('Redux Actions', () => {
  it('Deve retornar o objeto de ação deleteExpenses', () => {
    const id = 1;
    const action = deleteExpenses(id);
    expect(action.type).toEqual('DELETE_EXPENSE');
    expect(action.payload).toEqual(id);
  });

  it('Deve retornar o objeto de ação editExpenses', () => {
    const id = 1;
    const action = editExpenses(id);
    expect(action.type).toEqual('EDIT_EXPENSE');
    expect(action.payload).toEqual(id);
  });

  it('Deve retornar o objeto de ação updatedExpenses', () => {
    const expenseData = { id: 1, value: 100 };
    const action = updatedExpenses(expenseData);
    expect(action.type).toEqual('UPDATED_EXPENSES');
    expect(action.payload).toEqual(expenseData);
  });
});
