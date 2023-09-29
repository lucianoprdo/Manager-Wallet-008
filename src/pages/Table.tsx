import { useSelector } from 'react-redux';
import { ReduxState } from '../types';

function Table() {
  const globalState = useSelector((state: ReduxState) => state.wallet);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {globalState && globalState.expenses.map((expense) => {
          const { description, tag, method, value, exchangeRates, currency } = expense;

          return (
            <tr key={ expense.id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
              <td>Real</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
