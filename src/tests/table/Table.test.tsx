import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/dom';
import Table from '../../pages/Table';
import { deleteExpenses } from '../../redux/actions'; // Certifique-se de importar deleteExpenses
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import Wallet from '../../pages/Wallet';

describe('Verifica se a tabela é renderizada corretamente', () => {
  it('Testa se a tabela é atualizada corretamente quando o estado do redux muda', () => {
    const dispatch = vi.fn();
    const expenses = [{ id: 1, description: 'Café' }];

    const table = renderWithRouterAndRedux(<Table />, { initialState: { expenses } });

    dispatch(deleteExpenses(1));

    expect(table.getAllByRole('row').length).toBe(1);
  });

  it('Há uma tabela com informações sobre as despesas', async () => {
    const { getByRole } = renderWithRouterAndRedux(<Table />);

    const table = screen.getByRole('table');
    const tableHeading = screen.getAllByRole('columnheader');

    expect(table).toBeInTheDocument();
    expect(tableHeading).toHaveLength(9);
  });

  it('Testa reset após envio do formulário', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const buttonAdd = screen.getByRole('button', { type: 'submit' });

    await fireEvent.change(inputValue, '5');
    await fireEvent.change(inputDescription, 'Cafézin');
    await fireEvent.click(buttonAdd);

    expect(inputValue).toHaveValue('');
    expect(inputDescription).toHaveValue('');
  });
});
