import React from 'react';
import { useSelector } from 'react-redux';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import Header from '../../components/Header';
import { mockState } from '../helpers/mockState';

// Mock useSelector para retornar o estado fictício
vi.mock('react-redux', async () => {
  const actual: unknown = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

const useSelectorMock = vi.mocked(useSelector);

beforeEach(() => {
  // Mock useSelector para retornar o estado fictício
  useSelectorMock.mockImplementation((selector: any) => selector(mockState));
});

afterEach(() => {
  // Limpe o estado fictício e redefina o useSelector
  useSelectorMock.mockClear();
});

describe('Verifica funcionalidades do componente Header', () => {
  it('Testa se renderiza o email do usuário corretamente', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Header />);
    const emailField = getByTestId('email-field');
    expect(emailField.textContent).toBe('E-mail: tryber@teste.com');
  });

  it('Testa se calcula e renderiza as despesas totais corretamente', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Header />);
    const totalField = getByTestId('total-field');
    expect(totalField.textContent).toEqual('100.00');
  });

  it('Testa se renderiza a moeda como BRL', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Header />);
    const currencyField = getByTestId('header-currency-field');
    expect(currencyField.textContent).toBe('BRL');
  });
});
