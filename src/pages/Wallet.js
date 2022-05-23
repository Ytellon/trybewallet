import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { fetchWallet, removedExpense } from '../actions/index';
import Form from '../Components/Form';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWallet());
  }

  handleClick = (expense) => {
    const { dispatch } = this.props;
    dispatch(removedExpense(expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <div>TrybeWallet!</div>
        <Header />
        <Form />
        <div>
          <table>
            <thead>
              <tr>
                {[
                  'Descrição',
                  'Tag',
                  'Método de pagamento',
                  'Valor',
                  'Moeda',
                  'Câmbio utilizado',
                  'Valor convertido',
                  'Moeda de conversão',
                  'Editar/Excluir',
                ].map((tab, index) => (
                  <th key={ index }>{tab}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => {
                const nameExchange = expense.exchangeRates[expense.currency];
                return (
                  <tr key={ expense.id }>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{Number(expense.value).toFixed(2)}</td>
                    <td>{nameExchange.name.split('/')[0]}</td>
                    <td>{Number(nameExchange.ask).toFixed(2)}</td>
                    <td>
                      {Number(expense.value * nameExchange.ask).toFixed(2)}
                    </td>
                    <td>Real</td>
                    <td>
                      <button type="button">Adicionar</button>
                      <button
                        onClick={ () => this.handleClick(expense) }
                        data-testid="delete-btn"
                        type="button"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  dispatch: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps)(Wallet);
