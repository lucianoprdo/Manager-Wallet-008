export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addExpense = (expenses: any) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});
