import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  // Validação dos inputs
  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value }, () => this.inputValidation());
  }

  // Validação do botão
  inputValidation = () => {
    const { email, password } = this.state;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = emailRegex.test(email);

    const minLength = 6;
    const validatePassword = password.length >= minLength;

    this.setState({ isDisabled: !(validateEmail && validatePassword) });
  }

  render() {
    const { email, password, isDisabled } = this.state;
    const { saveEmail } = this.props;
    return (
      <div className="login-main-container">
        <div>
          <img className="wallet" src="./images/Wallet-icon.png" alt="wallet icon" />
        </div>
        <h1>Trybe Wallet</h1>
        <form className="form-container">
          <label htmlFor="email">
            <input
              data-testid="email-input"
              type="text"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="password">
            <input
              data-testid="password-input"
              type="password"
              name="password"
              id="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <Link to="/carteira">
            <button
              className={ isDisabled ? 'btn-disable' : 'btn-able' }
              type="button"
              disabled={ isDisabled }
              onClick={ () => saveEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(userEmail(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
