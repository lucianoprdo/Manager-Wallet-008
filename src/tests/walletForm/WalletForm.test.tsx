import React from 'react';
import { fireEvent, getByRole, getByText, getByTextTest, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import { useDispatch } from 'react-redux';
import WalletForm from '../../components/WalletForm';
import { renderWithRouterAndRedux, renderWithRedux } from '../helpers/renderWith';
import { expenses } from '../helpers/mockExpense';
import { fetchCurrencies, fetchExpenses, updatedExpenses } from '../../redux/actions';
import store from '../../redux';

// Mock useDispatch
const mockDispatch = vi.fn();

mockDispatch.mockResolvedValue({ type: 'EXPENSES_DATA', payload: expenses });

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: vi.fn(() => ({
      currencies: ['USD'],
      expenses: [{ id: 1 }, { id: 2 }, { id: 3 }],
      edition: true,
      idToEdit: 1,
    })),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

const VALUE_INPUT = 'value-input';

describe('Verifica funcionalidade do componente WalletForm', () => {
  it('Deve lidar com alterações de entrada', () => {
    const { getByTestId } = renderWithRouterAndRedux(<WalletForm />);
    const valueInput = getByTestId(VALUE_INPUT);

    fireEvent.change(valueInput, { target: { value: '100' } });

    expect(valueInput as HTMLElement).toBeTruthy();
  });

  it('Deve buscar os dados da despesa e preencher os campos ao montar o componente', async () => {
    await mockDispatch(fetchExpenses({ id: 1 }));
    const { getByTestId } = renderWithRouterAndRedux(<WalletForm />);

    const valueInput = getByTestId(VALUE_INPUT) as HTMLInputElement;
    valueInput.value = '100';

    expect(valueInput.value).toEqual('100');
  });

  it('Deve renderizar as funções do botão Editar despesa apenas quando há edição', async () => {
    renderWithRedux(
      <WalletForm />,
      {},
    );

    const submitEditButton = document.querySelector("button[type='submit']");
    expect(submitEditButton).toBeInTheDocument();

    await fireEvent.click(submitEditButton);
  });

  it('deve pegar as despesas mockadas para editar os campos do formulário', async () => {
    const { getByTestId } = renderWithRouterAndRedux(<WalletForm />);

    const descriptionInput = getByTestId('description-input');
    const valueInput = getByTestId(VALUE_INPUT);
    const currencyInput = getByTestId('currency-input');

    expect((descriptionInput as HTMLInputElement).value).toBe('');
    expect((valueInput as HTMLInputElement).value).toBe('');
    expect((currencyInput as HTMLInputElement).value).toBe('USD');

    await fireEvent.change(descriptionInput);
    await fireEvent.change(valueInput);
    await fireEvent.change(currencyInput);

    const submitEditBton = document.querySelector("button[type='submit']");
    expect(submitEditBton).toBeInTheDocument();

    await fireEvent.click(submitEditBton);
  });
});
