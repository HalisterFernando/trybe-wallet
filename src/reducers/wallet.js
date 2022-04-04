// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ERROR, GET_EXPENSES, REMOVE, REQUEST_API, RESPONSE_API } from '../actions';

const INITIAL_STATE = {

  currencies: [],
  expenses: [],
  error: '',

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return state;
  case RESPONSE_API:
    return { ...state, currencies: action.currencies };
  case GET_EXPENSES: {
    const expObj = {
      ...action.expenses,
      id: state.expenses.length,
    };
    return { ...state, expenses: [...state.expenses, expObj] };
  }
  case REMOVE:
    return { ...state, expenses: action.expenses };

  case ERROR:
    return { ...state, error: action.error };
  default:
    return state;
  }
};

export default wallet;
