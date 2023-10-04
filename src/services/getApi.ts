const END_POINT = 'https://economia.awesomeapi.com.br/json/all';

export const getApi = async () => {
  const response = await fetch(END_POINT);
  const data = await response.json();
  delete data.USDT;
  return data;
};

// export function fetchCurrencies() {
//   return async (dispatch: Dispatch) => {
//     const data = await getApi();

//     dispatch(saveCurrencies(data));
//   };
// }

// export function fetchExpenses(expenses: object) {
//   return async (dispatch: Dispatch) => {
//     try {
//       const data = await getApi();
//       dispatch(saveExpenses(data, expenses));
//     } catch (error: any) {
//       throw new Error('Erro ao buscar dados da API: + error.message');
//     }
//   };
// }
