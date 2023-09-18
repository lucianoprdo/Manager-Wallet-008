import React from 'react';
import { legacy_createStore as createStore } from 'redux';
import { render, fireEvent } from '@testing-library/react';
import App from '../../App';
import reducers from '../../redux/reducers';
import { renderWith, mockData } from '../helpers';

describe('App', () => {
  it("renderiza o elemento de entrada para o e-mail com o atributo `data-testid='email-input'`", () => {
    const { getByTestId } = renderWith(<App />);
    const emailInput = getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.tagName).toBe('INPUT');
    expect(emailInput.getAttribute('type')).toBe('email');
    expect(emailInput.getAttribute('data-testid')).toBe('email-input');
  });

  it("renderiza o elemento de entrada para a senha com o atributo `data-testid='password-input'`", () => {
    const { getByTestId } = render(<App />);
    const passwordInput = getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.tagName).toBe('INPUT');
    expect(passwordInput.getAttribute('type')).toBe('password');
    expect(passwordInput.getAttribute('data-testid')).toBe('password-input');
  });

  it('renderiza o botão com o texto `Entrar`', () => {
    const { getByText } = render(<App />);
    const button = getByText('Entrar');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
    expect(button.textContent).toBe('Entrar');
  });

  it('o botão `Entrar` está desabilitado quando o e-mail ou a senha não são válidos', () => {
    const { getByTestId } = render(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    fireEvent.change(emailInput, { target: { value: mockData.invalidEmail } });
    fireEvent.change(passwordInput, {
      target: { value: mockData.invalidPassword },
    });
    const button = getByTestId('entrar');
    expect(button).toBeDisabled();
  });

  it('o botão `Entrar` está habilitado quando o e-mail e a senha são válidos', () => {
    const { getByTestId } = render(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    fireEvent.change(emailInput, { target: { value: mockData.validEmail } });
    fireEvent.change(passwordInput, {
      target: { value: mockData.validPassword },
    });
    const button = getByTestId('entrar');
    expect(button).not.toBeDisabled();
  });

  it('o componente `App` dispara uma ação para salvar o e-mail no estado global quando o botão `Entrar` é clicado', () => {
    const store = createStore(reducers);
    const { getByTestId } = renderWith(<App store={ store } />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    fireEvent.change(emailInput, { target: { value: mockData.validEmail } });
    fireEvent.change(passwordInput, {
      target: { value: mockData.validPassword },
    });
    const button = getByTestId('entrar');
    fireEvent.click(button);
    expect(store.getState().user.email).toBe(mockData.validEmail);
  });

  it('o componente `App` redireciona para a página da carteira quando o botão `Entrar` é clicado', () => {
    const { getByTestId, queryByTestId } = render(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    fireEvent.change(emailInput, { target: { value: mockData.validEmail } });
    fireEvent.change(passwordInput, {
      target: { value: mockData.validPassword },
    });
    const button = getByTestId('entrar');
    fireEvent.click(button);
    expect(queryByTestId('login-page')).toBeNull();
  });
});
