import { getApi } from '../../services/getApi';

describe('Verifica se API tem o retorno correto', () => {
  it('Testa a API', async () => {
    const data = await getApi();
    expect(data.USD.code).toBe('USD');
  });
});
