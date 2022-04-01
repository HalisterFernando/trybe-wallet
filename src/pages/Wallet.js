import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="outcome">
            <input data-testid="value-input" type="number" id="outcome" />
          </label>
          <label htmlFor="description">
            <input data-testid="description-input" type="text" id="description" />
          </label>
          <label htmlFor="coin">
            Moeda:
            <select id="coin">
              {currencies.map((coin, idx) => (<option key={ idx }>{coin}</option>))}
            </select>
          </label>
          <label htmlFor="pay">
            Forma de pagamento:
            <select data-testid="method-input" id="pay">
              <option>Dinheiro</option>
              <option>Cartão de crédito </option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="pay">
            Categoria:
            <select data-testid="tag-input" id="pay">
              <option>Alimentação</option>
              <option>Lazer </option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  currencies: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchCurrency()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchAPI: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
