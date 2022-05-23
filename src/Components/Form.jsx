import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExpenses } from '../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };

    handleSubmit = (event) => {
      event.preventDefault();
      const { dispatch } = this.props;
      dispatch(fetchExpenses(this.state));
      this.setState((prevState) => ({
        id: prevState.id + 1,
        value: 0,
      }));
    }

    render() {
      const { value, description, currency, method, tag } = this.state;
      const { currencies } = this.props;
      return (
        <div>
          <form>
            <label htmlFor="value">
              Valor:
              <input
                value={ value }
                data-testid="value-input"
                type="text"
                name="value"
                id="value"
                onChange={ this.handleChange }
              />
              {' '}
            </label>
            <label htmlFor="description">
              Descrição:
              <input
                value={ description }
                data-testid="description-input"
                type="text"
                name="description"
                id="description"
                onChange={ this.handleChange }
              />
              {' '}
            </label>
            <label htmlFor="currencies">
              Moeda:
              <select
                value={ currency }
                name="currency"
                id="currencies"
                onChange={ this.handleChange }
              >
                {currencies.map((curren) => (
                  <option key={ curren } value={ curren }>{ curren }</option>
                ))}
              </select>
            </label>
            {' '}
            <label htmlFor="paymentMethod">
              Metodo de pagamento:
              <select
                value={ method }
                name="method"
                data-testid="method-input"
                id="paymentMethod"
                onChange={ this.handleChange }
              >
                {
                  ['Dinheiro', 'Cartão de crédito', 'Cartão de débito']
                    .map((paymentMethod) => (
                      <option
                        key={ paymentMethod }
                        value={ paymentMethod }
                      >
                        { paymentMethod }
                      </option>
                    ))
                }
              </select>
            </label>
            {' '}
            <label htmlFor="tag">
              Tag:
              <select
                value={ tag }
                id="tag"
                data-testid="tag-input"
                name="tag"
                onChange={ this.handleChange }
              >
                {
                  ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']
                    .map((tagg) => (
                      <option key={ tagg } value={ tagg }>{ tagg }</option>
                    ))
                }
              </select>
            </label>
            {' '}
            <button
              onClick={ this.handleSubmit }
              type="submit"
            >
              Adicionar despesa
            </button>
          </form>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Form);

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};
