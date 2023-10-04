import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCurrencies, fetchExpenses, updatedExpenses } from '../redux/actions';
import { Dispatch, ReduxState } from '../types';

const INITIAL_STATE = {
  id: 0,
  description: '',
  tag: 'Alimentação',
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
};

function WalletForm() {
  const { currencies, edition,
    expenses, idToEdit } = useSelector(((state: ReduxState) => state.wallet));

  const [form, setForm] = useState(INITIAL_STATE);
  const { value, currency, description, method, tag } = form;

  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      await dispatch(fetchCurrencies());
    }
    getData();
    if (edition) {
      const getToEdit = expenses[idToEdit];
      setForm({
        id: getToEdit.id,
        description: getToEdit.description,
        tag: getToEdit.tag,
        value: getToEdit.value as any,
        currency: getToEdit.currency as any,
        method: getToEdit.method,
      });
    }
  }, [dispatch, edition]);

  function handleChange({ target }:
  React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  }

  function handleEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const editedExpense: any = {
      ...expenses[idToEdit],
      ...form,
    };

    const additionalExpenses = [
      ...expenses,
    ];

    additionalExpenses[idToEdit] = editedExpense;
    dispatch(updatedExpenses(additionalExpenses as any));
    setForm(INITIAL_STATE);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(fetchExpenses(form));
    const expenseId = expenses.length > 0 ? expenses.length : 0;
    const dataExpenses = {
      id: expenseId,
      value: value.toString(),
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
      // exchangeRates: {},
    };
    dispatch(updatedExpenses(dataExpenses as any));
    setForm(INITIAL_STATE);
  }

  const handleUpdate = (event: any) => {
    event.preventDefault();
    dispatch(updatedExpenses(form as any));
    setForm(INITIAL_STATE);
  };

  return (
    <form onSubmit={ edition ? handleEdit : handleSubmit } data-testid="edit-form">
      <label>
        Valor:
        <input
          name="value"
          type="text"
          data-testid="value-input"
          value={ value }
          onChange={ handleChange }
        />
      </label>
      <span> Moeda: </span>
      <select
        name="currency"
        value={ currency }
        data-testid="currency-input"
        onChange={ handleChange }
      >
        {currencies.map((coin) => (
          <option key={ coin }>{coin}</option>
        ))}
      </select>
      <span> Método de Pagamento: </span>
      <select
        name="method"
        value={ method }
        data-testid="method-input"
        onChange={ handleChange }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <span> Tag: </span>
      <select
        name="tag"
        value={ tag }
        data-testid="tag-input"
        onChange={ handleChange }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <label>
        Descrição:
        <input
          name="description"
          type="text"
          value={ description }
          data-testid="description-input"
          onChange={ handleChange }
        />
      </label>
      {edition ? (
        <button
          type="submit"
          onClick={ (event) => handleUpdate(event) }
          // data-testid="update-button"
        >
          Editar despesa
        </button>
      ) : (
        <button
          type="submit"
          onClick={ (event) => handleSubmit(event as any) }
        >
          Adicionar despesa
        </button>
      )}
    </form>
  );
}

export default WalletForm;
