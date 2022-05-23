import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { setEmail, setPassword } from '../actions/index';
import style from '../styles/login.module.css';
import womanWallet from '../images/womanImg.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

handleSubmit = (event) => {
  event.preventDefault();
  const { dispatch, history } = this.props;
  const { email, password } = this.state;
  dispatch(setEmail(email));
  dispatch(setPassword(password));
  history.push('/carteira');
}

render() {
  const { email, password } = this.state;
  const minLength = 6;
  const regex = /\S+@\S+\.\S+/;
  return (
    <main className={ style.container }>
      <section className={ style.leftLogin }>
        <img src={ womanWallet } alt="wallet" />
      </section>
      <section className={ style.rightLogin }>
        <div className={ style.cardLogin }>
          <h1>Login</h1>
          <form className={ style.formLogin }>
            <input
              type="text"
              placeholder="email"
              value={ email }
              onChange={ (e) => this.setState({ email: e.target.value }) }
              data-testid="email-input"
            />
            <input
              type="password"
              placeholder="password"
              value={ password }
              onChange={ (e) => this.setState({ password: e.target.value }) }
              data-testid="password-input"
            />
          </form>
          <button
            className={ style.buttonLogin }
            type="submit"
            disabled={ !(password.length >= minLength && regex.test(email)) }
            onClick={ this.handleSubmit }
          >
            Entrar

          </button>
        </div>
      </section>
    </main>
  );
  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  // func de verificacao linha 15
}
}

Login.propTypes = {
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default connect()(Login);
