import { vi } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Table from '../../pages/Table';
import { deleteExpenses } from '../../redux/actions'; // Certifique-se de importar deleteExpenses
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import { mockState } from '../helpers/mockState';

describe('Testa se a tabela é renderizada corretamente', () => {
  it('Testa se a tabela é atualizada corretamente quando o estado da redux muda', () => {
    const dispatch = vi.fn();
    const expenses = [{ id: 1, description: 'Café' }];

    const table = renderWithRouterAndRedux(<Table />, { initialState: { expenses } }); // Passar o estado inicial com as despesas

    dispatch(deleteExpenses(1));

    expect(table.getAllByRole('row').length).toBe(1);
  });

  vi.mock('../../redux/userActions');
});
