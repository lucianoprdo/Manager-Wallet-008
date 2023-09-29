import { vi } from 'vitest';
import { mockData } from '../helpers/mockData';

const END_POINT = 'https://economia.awesomeapi.com.br/json/all';

describe('Verifica se API tem o retorno correto', () => {
  it.only('Testa a API', async () => {
    vi.mock('fetch', async () => {
      vi.fn('https://economia.awesomeapi.com.br/json/all').return(mockData);

      const response = await fetch(END_POINT);
      const data = await response.json();

      expect(data).toEqual(mockData);
    });
  });
});
