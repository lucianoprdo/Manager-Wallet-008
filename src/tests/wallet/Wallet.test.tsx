import { vi } from 'vitest';
import { renderWithRedux } from '../helpers/renderWith';
import Wallet from '../../pages/Wallet';

vi.mock('../../components/Header', () => ({
  default() {
    return <div>Header</div>;
  },
}));

vi.mock('../../components/WalletForm', () => ({
  default() {
    return <div>WalletForm</div>;
  },
}));

vi.mock('../../pages/Table', () => ({
  default() {
    return <div>Table</div>;
  },
}));

const mockStore = {
  getState: vi.fn(),
  dispatch: vi.fn(),
};

describe('Verifica Wallet Page', () => {
  it('Deve renderizar os componentes Header, WalletForm e Table', () => {
    const { getByText } = renderWithRedux(<Wallet />, mockStore);

    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('WalletForm')).toBeInTheDocument();
    expect(getByText('Table')).toBeInTheDocument();
  });
});
