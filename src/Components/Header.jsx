import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CurrencyDollarSimple, Wallet, CreditCard } from 'phosphor-react';
import style from '../styles/header.module.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce(
      (acc, curr) => {
        const total = acc + curr.value * curr.exchangeRates[curr.currency].ask;
        return total;
      }, 0,
    );
    return (
      <header className={ style.container }>
        <div className={ style.wallet }>
          <h1>TrybeWallet</h1>
          <Wallet size={ 45 } />
        </div>
        <div className={ style.currency }>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{ totalExpenses.toFixed(2) }</p>
          <p data-testid="header-currency-field">BRL</p>
          <CurrencyDollarSimple size={ 35 } />
          <CreditCard size={ 35 } />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
