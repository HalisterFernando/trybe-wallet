// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ERROR, REQUEST_CURRENCY, RESPONSE_CURRENCY } from '../actions';

const INITIAL_STATE = {

  currencies: [],
  expenses: [],
  error: '',

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return state;
  case RESPONSE_CURRENCY:
    return { ...state, currencies: action.obj };
  case ERROR:
    return { ...state, error: action.error };
  default:
    return state;
  }
};

export default wallet;
