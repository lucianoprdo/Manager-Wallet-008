import { fireEvent, screen, waitForElementToBeRemoved, within } from '@testing-library/dom';
import WalletForm from '../../components/WalletForm';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import Wallet from '../../pages/Wallet';

describe('Verifica funcionalidade do componente WalletForm', () => {
  it('Deve renderizar todos os campos obrigatórios', () => {
    const { getByTestId } = renderWithRouterAndRedux(<WalletForm />);

    expect(getByTestId('value-input')).toBeInTheDocument();
    expect(getByTestId('currency-input')).toBeInTheDocument();
    expect(getByTestId('method-input')).toBeInTheDocument();
    expect(getByTestId('tag-input')).toBeInTheDocument();
    expect(getByTestId('description-input')).toBeInTheDocument();
  });

  it('Deve renderizar o botão "Adicionar despesa"', () => {
    const { getByText } = renderWithRouterAndRedux(<WalletForm />);

    const addButton = getByText('Adicionar despesa'); // Substitua 'Adicionar' pelo texto real do seu botão

    expect(addButton).toBeInTheDocument();
  });
});

it.only('Verifies that the sum of all expenses is displayed when the page loads.', async () => {
  renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });

  // Wait for the loading element to disappear.
  await waitForElementToBeRemoved(() => screen.queryByText('Carregando...'));

  // Get the elements that we will need to interact with.
  const value = screen.getByRole('spinbutton');
  const inputDespesa = screen.getByTestId('description-input');
  const selectCurrency = screen.getByTestId('currency-input');
  const selectMethod = screen.getByTestId('method-input');
  const selectTag = screen.getByTestId('tag-input');
  const btnEnviar = screen.getByRole('button', { name: /adicionar despesa/i });

  // Enter the expense details.
  fireEvent.change(value, { target: { value: '3' } });
  fireEvent.change(inputDespesa, { target: { value: 'teste' } });
  fireEvent.change(selectCurrency, { target: { value: 'USD' } });
  fireEvent.change(selectMethod, { target: { value: 'Dinheiro' } });
  fireEvent.change(selectTag, { target: { value: 'Alimentação' } });

  // Click the "Adicionar despesa" button.
  fireEvent.click(btnEnviar);

  // Wait for the table to be rendered.
  await waitForElementToBeInTheDocument(() => screen.getByRole('table'));

  // Get the table element.
  const table = screen.getByRole('table');

  // Get the view element that contains the "despesas totais" text.
  const view = screen.getByText(/despesas totais/i);

  // Get the cell element that contains the "14.81" value.
  const valueConvert = screen.getByRole('cell', { name: /14\.81/i });

  // Assert that the table, view, and valueConvert elements are in the document.
  expect(table).toBeInTheDocument();
  expect(view).toBeInTheDocument();
  expect(valueConvert).toBeInTheDocument();
});
