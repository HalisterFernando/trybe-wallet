// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RESPONSE_CURRENCY = 'RESPONSE_CURRENCY';
export const ERROR = 'ERROR';

export const userEmail = (email) => ({
  type: EMAIL,
  email,
});

const requestCurrency = () => ({ type: REQUEST_CURRENCY });

const responseCurrency = (obj) => ({
  type: RESPONSE_CURRENCY,
  obj,
});

const requestFail = (error) => ({ type: ERROR, error });

export const fetchCurrency = () => async (dispatch) => {
  dispatch(requestCurrency());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currency = Object.keys(data).filter((el) => el !== 'USDT');

    dispatch(responseCurrency(currency));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
