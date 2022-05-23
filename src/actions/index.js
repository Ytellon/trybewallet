export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_WALLET = 'SET_WALLET';
export const SET_EXPENSES = 'SET_EXPENSES';
export const REMOVED_EXPENSE = 'REMOVED_EXPENSE';

export function removedExpense(expense) {
  return {
    type: REMOVED_EXPENSE,
    payload: expense,
  };
}

export function setEmail(email) {
  return {
    type: SET_EMAIL,
    payload: email,
  };
}

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    payload: password,
  };
}

export function setWallet(wallet) {
  return {
    type: SET_WALLET,
    payload: wallet,
  };
}

export function setExpenses(expenses) {
  return {
    type: SET_EXPENSES,
    payload: expenses,
  };
}
export const fetchExpenses = (data) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const expenses = await response.json();
  const addNewExpense = { ...data, exchangeRates: expenses };
  dispatch(setExpenses(addNewExpense));
};

export const fetchWallet = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    const currencies = Object.keys(result).filter((currencie) => currencie !== 'USDT');
    dispatch(setWallet(currencies));
  } catch (error) {
    console.log(error);
  }
};
