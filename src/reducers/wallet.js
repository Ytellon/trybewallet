import { SET_WALLET, SET_EXPENSES, REMOVED_EXPENSE } from '../actions/index';

const INITIAL_STATE = { currencies: [], expenses: [] };

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_WALLET:
    return { ...state, currencies: action.payload };
  case SET_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case REMOVED_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((expense) => expense !== action.payload),
      ],
    };
  default:
    return state;
  }
};

export default walletReducer;
