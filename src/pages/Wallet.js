import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchAPI, fetchExchanges } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { saveCurrency } = this.props;
    saveCurrency();
  }

  handleInputs = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  addExpenses = () => {
    const { saveExpenses } = this.props;
    saveExpenses(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  sumExpenses = () => {
    const { expenses } = this.props;

    const valueAsk = expenses.map((el) => ({
      [el.currency]: Number(el.value),
      ask: Number(el.exchangeRates[el.currency].ask),
    }));

    const currencies = expenses.map((el) => el.currency);
    let total = 0;
    valueAsk.forEach((el, idx) => {
      total += el[currencies[idx]] * el.ask;
    });
    return total.toFixed(2);
  }

  render() {
    const { email, currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{this.sumExpenses()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="outcome">
            Valor da despesa:
            <input
              data-testid="value-input"
              type="number"
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleInputs }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="description"
              name="description"
              onChange={ this.handleInputs }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              onChange={ this.handleInputs }
              value={ currency }
            >
              {currencies.map((coin, idx) => (<option key={ idx }>{coin}</option>))}
            </select>
          </label>
          <label htmlFor="method">
            Forma de pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ this.handleInputs }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito </option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.handleInputs }
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer </option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.addExpenses }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
  savedExpenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveCurrency: () => dispatch(fetchAPI()),
  saveExpenses: (expenses) => dispatch(fetchExchanges(expenses)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  saveCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
