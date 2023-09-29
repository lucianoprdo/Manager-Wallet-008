import { vi } from 'vitest';
import { mockData } from '../helpers/mockData';
import { getApi } from '../../services/getApi';

describe('Verifica se API tem o retorno correto', () => {
  it.only('Testa a API', async () => {
    vi.mock('fetch', async () => {
      vi.fn(getApi).mockResolvedValue(mockData);

      const response = await getApi();

      expect(response).toEqual(mockData);
    });
  });
});
