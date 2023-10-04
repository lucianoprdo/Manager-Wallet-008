import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from '../helpers/renderWith';

const EMAIL = 'tryber@teste.com';
const PASSWORD = '123@ewR';

describe('Verifica funcionalidade da page Login', () => {
  it('Testa funcionalidade dos inputs e button da tela de Login', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);

    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();
    await userEvent.type(inputEmail, EMAIL);
    await userEvent.type(inputPassword, PASSWORD);
    await userEvent.click(button);
  });

  it('Testa se o botão Entrar estará habilitado ao preencher dados corretamente', async () => {
    renderWithRouterAndRedux(<App />);

    const enterButton = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const inputEmail = screen.getByPlaceholderText(/e-mail/i);

    expect(enterButton).toBeDisabled();

    await userEvent.type(inputEmail, '123');

    expect(enterButton).toBeDisabled();

    await userEvent.clear(inputPassword);
    await userEvent.clear(inputEmail);

    await userEvent.type(inputEmail, EMAIL);
    await userEvent.type(inputPassword, PASSWORD);

    await userEvent.click(enterButton);

    const email = screen.getByText(/tryber@teste.com/i);
    expect(email).toBeInTheDocument();
  });

  it('Testa se ao clicar em no botão Entrar a rota seja direcionada para "/carteira"', async () => {
    renderWithRouterAndRedux(<App />);

    const enterButton = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByPlaceholderText(/password/i);

    await userEvent.type(screen.getByPlaceholderText(/e-mail/i), EMAIL);
    await userEvent.type(inputPassword, PASSWORD);

    await userEvent.click(enterButton);

    const email = screen.getByText(/tryber@teste.com/i);
    expect(email).toBeInTheDocument();

    expect(enterButton).not.toBeInTheDocument();
  });

  // it.only('Testa se há mensagem de erro quando os dados estão errados nos inputs', async () => {
  //   renderWithRouterAndRedux(<App />);

  //   const enterButton = screen.getByRole('button', { name: /entrar/i });
  //   const inputPassword = screen.getByPlaceholderText(/password/i);

  //   await userEvent.type(screen.getByPlaceholderText(/e-mail/i), 'email@');
  //   await userEvent.type(inputPassword, '123');

  //   expect(enterButton).toBeDisabled();

  //   userEvent.click(enterButton);

  //   const email = screen.getByText(/E-mail inválido/i);
  //   expect(email).toBeInTheDocument();

  //   expect(enterButton).toBeDisabled();
  // });
});
