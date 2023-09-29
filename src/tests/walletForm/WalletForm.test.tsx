import WalletForm from '../../components/WalletForm';
import { renderWithRouterAndRedux } from '../helpers/renderWith';

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
