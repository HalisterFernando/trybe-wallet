// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EDIT, ERROR, GET_EXPENSES, REMOVE, REQUEST_API, RESPONSE_API } from '../actions';

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
  case GET_EXPENSES:
    return { ...state,
      expenses: [...state.expenses,
        { ...action.expenses, id: state.expenses.length }] };
  case REMOVE:
    return { ...state, expenses: action.expenses };
  case EDIT:
    return { ...state, expenses: action.expenses };
  case ERROR:
    return { ...state, error: action.error };
  default:
    return state;
  }
};

export default wallet;
