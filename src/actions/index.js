// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const GET_EXPENSES = 'GET_EXPENSES';
export const REMOVE = 'REMOVE';
export const EDIT = 'EDIT';
export const ERROR = 'ERROR';

export const userEmail = (email) => ({
  type: EMAIL,
  email,
});

// Actions para constrolar requisição da API

const requestAPI = () => ({ type: REQUEST_API });

const responseAPI = (data) => {
  const currencies = Object.keys(data).filter((el) => el !== 'USDT');
  // Retorna as currencies a partir das chaves do objeto retornado
  return {
    type: RESPONSE_API,
    currencies,
  };
};

const requestFail = (error) => ({ type: ERROR, error });

// Adiciona uma nova despesa realizando a requisição da API
export const getExpenses = (expenses, exchangeRates) => ({
  type: GET_EXPENSES,
  expenses: { ...expenses, exchangeRates },
});

// Remove um ítem da lista
export const removeExpense = (expenses) => ({
  type: REMOVE,
  expenses,
});

// Edita um ítem da lista
export const editExpense = (expenses) => ({
  type: EDIT,
  expenses,
});

// Thunk para retorno das currencies
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

// Thunk para realizar requisição da API ao clicar no botão "Adicionar despesa"
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
