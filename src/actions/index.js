// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const ERROR = 'ERROR';
export const GET_EXPENSES = 'GET_EXPENSES';

export const userEmail = (email) => ({
  type: EMAIL,
  email,
});

const requestAPI = () => ({ type: REQUEST_API });

const responseAPI = (data) => {
  const currencies = Object.keys(data).filter((el) => el !== 'USDT');

  return {
    type: RESPONSE_API,
    currencies,
  };
};

const requestFail = (error) => ({ type: ERROR, error });

export const getExpenses = (expenses, exchangeRates) => ({
  type: GET_EXPENSES,
  expenses: { ...expenses, exchangeRates },
});

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    dispatch(responseAPI(data));
  } catch (error) {
    dispatch(requestFail(error));
  }
};

export const fetchExchanges = (expenses) => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    dispatch(getExpenses(expenses, data));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
