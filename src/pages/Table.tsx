// Table
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../types';
import { deleteExpenses, editExpenses } from '../redux/actions';

function Table() {
  const globalState = useSelector((state: ReduxState) => state.wallet);
  const dispatch = useDispatch();

  function handleDelete(id: number) {
    dispatch(deleteExpenses(id));
  }

  function handleEdit(id: number) {
    dispatch(editExpenses(id));
  }

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
        {globalState && globalState
          .expenses.map(({
            id, description, tag, method, value, exchangeRates, currency }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => handleEdit(id) }
                    // disabled={ globalState.edition }
                  >
                    Editar despesa
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    id={ id.toString() }
                    onClick={ () => handleDelete(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
