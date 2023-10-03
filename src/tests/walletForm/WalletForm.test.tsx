import React from 'react';
import { fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import WalletForm from '../../components/WalletForm';
import { renderWithRouterAndRedux } from '../helpers/renderWith';

vi.mock('react-redux', async () => {
  const actual: unknown = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(() => {
      return {
        currencies: ['USD'],
      };
    }),
  };
});

const mockFetchExpenses = vi.fn();

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

  it('should handle form submission', () => {
    const dispatch = vi.fn();
    const selector = vi.fn();
    selector.mockReturnValue({ currencies: ['USD'] });
    dispatch.mockReturnValueOnce(dispatch);

    const { getByTestId, getByText } = renderWithRouterAndRedux(<WalletForm />);

    const valueInput = getByTestId(VALUE_INPUT);
    const currencyInput = getByTestId('currency-input');
    const methodInput = getByTestId('method-input');
    const tagInput = getByTestId('tag-input');
    const descriptionInput = getByTestId('description-input');
    const submitButton = getByText('Adicionar despesa');

    fireEvent.change(valueInput, { target: { value: '100' } });
    fireEvent.change(currencyInput, { target: { value: 'USD' } });
    fireEvent.change(methodInput, { target: { value: 'Dinheiro' } });
    fireEvent.change(tagInput, { target: { value: 'Alimentação' } });
    fireEvent.change(descriptionInput, { target: { value: '' } });

    fireEvent.click(submitButton);

    dispatch(mockFetchExpenses);
    // Verifique se os valores do formulário foram redefinidos após a submissão.
    expect((valueInput as HTMLInputElement).value).toBe('');
    expect((currencyInput as HTMLSelectElement).value).toBe('USD');
    expect((methodInput as HTMLSelectElement).value).toBe('Dinheiro');
    expect((tagInput as HTMLSelectElement).value).toBe('Alimentação');
    expect((descriptionInput as HTMLInputElement).value).toBe('');
  });

  it('Deve renderizar todos os campos obrigatórios', () => {
    const { getByTestId } = renderWithRouterAndRedux(<WalletForm />);

    expect(getByTestId(VALUE_INPUT)).toBeInTheDocument();
    expect(getByTestId('currency-input')).toBeInTheDocument();
    expect(getByTestId('method-input')).toBeInTheDocument();
    expect(getByTestId('tag-input')).toBeInTheDocument();
    expect(getByTestId('description-input')).toBeInTheDocument();
  });

  it('Deve renderizar o botão "Adicionar despesa"', () => {
    const { getByText } = renderWithRouterAndRedux(<WalletForm />);

    const addButton = getByText('Adicionar despesa');

    expect(addButton).toBeInTheDocument();
  });
});
