const END_POINT = 'https://economia.awesomeapi.com.br/json/all';

export const getApi = async () => {
  const currencyResponse = await (await fetch(END_POINT)).json();
  return currencyResponse;
};
