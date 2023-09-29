export const mockState = {
  user: {
    email: 'tryber@teste.com',
  },
  wallet: {
    expenses: [
      {
        id: 1,
        value: 100,
        currency: 'USD',
        exchangeRates: {
          USD: { ask: 1.0 },
          BRL: { ask: 5.0 },
        },
      },
      {
        id: 2,
        value: 50,
        currency: 'CAD',
        exchangeRates: {
          USD: { ask: 1.0 },
          BRL: { ask: 5.0 },
        },
      },
    ],
  },
};
