import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from '../helpers/renderWith';

const EMAIL = 'tryber@teste.com';
const PASSWORD = '123@ewR';
// const route = '/carteira';

describe('Verifica funcionalidade da page Login', () => {
  it.only('Testa funcionalidade dos inputs e button da tela de Login', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);

    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();
    await userEvent.type(inputEmail, EMAIL);
    await userEvent.type(inputPassword, PASSWORD);
    await userEvent.click(button);
  });
});
