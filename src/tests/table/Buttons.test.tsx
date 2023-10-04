import { vi } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import { useDispatch } from 'react-redux';
import { expenses } from '../helpers/mockExpense';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import Table from '../../pages/Table';
import { deleteExpenses, editExpenses, saveExpenses } from '../../redux/actions';

const dispatch = vi.mocked(useDispatch);

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(() => ({
      expenses,
      edition: false,
    })),
    dispatch: vi.fn(),
  };
});

describe('Verifica botões e suas respectivas funções', () => {
  it.only('deve chamar a função handleDelete() quando o botão de excluir for clicado', async () => {
    // Inicializa o estado inicial
    dispatch(saveExpenses({ expense: expenses, edition: false }));

    const { getByTestId } = renderWithRouterAndRedux(<Table />);

    const deleteButton = getByTestId('delete-btn');

    // Simule um clique no botão de excluir
    fireEvent.click(deleteButton);

    // Verifique se a função handleDelete() foi chamada com o ID da despesa correto
    expect(dispatch).toHaveBeenCalledWith(deleteExpenses(1));
  });
});
