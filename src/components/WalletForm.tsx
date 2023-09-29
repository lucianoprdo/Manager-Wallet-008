import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCurrencies, fetchExpenses } from '../redux/actions';
import { Dispatch, ReduxState } from '../types';

const dataExpenses = {
  id: 0,
  value: '',
  currency: 'USD',
  method: '',
  tag: '',
  description: '',
};

function WalletForm() {
  const [formData, setFormData] = useState(dataExpenses);
  const { value, currency, description, method, tag } = formData;

  const dispatch: Dispatch = useDispatch();
  const { currencies } = useSelector(((state: ReduxState) => state.wallet));

  useEffect(() => {
    async function getData() {
      await dispatch(fetchCurrencies());
    }
    getData();
  }, [dispatch]);

  function handleChange({ target }:
  React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(fetchExpenses(formData));
    // const result = { formData: dataExpenses };
    setFormData(dataExpenses);
  }

  return (
    <form onSubmit={ handleSubmit }>
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
      <button>Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;
