import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <header>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">{ totalExpenses.toFixed(2) }</div>
        <div data-testid="header-currency-field">BRL</div>
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
