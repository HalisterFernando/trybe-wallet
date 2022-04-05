import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { editExpense, fetchAPI, fetchExchanges, removeExpense } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      addEdit: 'Adicionar despesa',
      id: '',
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
    const { saveExpenses, expenses, edit } = this.props;
    const { value, description, currency, method, tag, addEdit, id } = this.state;

    if (addEdit === 'Adicionar despesa') {
      saveExpenses({ value, description, currency, method, tag });
      this.setState({
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      });
    } else {
      const editedExpenses = expenses.map((el) => {
        if (el.id === id) {
          return ({
            ...el,
            value,
            description,
            currency,
            method,
            tag,
            id: el.id,
          });
        } return el;
      });

      edit(editedExpenses);
    }
  }

  sumExpenses = () => {
    const { expenses } = this.props;
    const valueAsk = expenses.map((el) => ({
      [el.currency]: Number(el.value),
      ask: Number(el.exchangeRates[el.currency].ask),
    }));
    let total = 0;

    const currencies = expenses.map((el) => el.currency);
    valueAsk.forEach((el, idx) => {
      total += el[currencies[idx]] * el.ask;
    });
    return total.toFixed(2);
  }

  editExpenses = ({ target }) => {
    const { expenses } = this.props;
    const { id } = target;
    const findExpense = expenses.find((el) => el.id === Number(id));
    this.setState({
      value: findExpense.value,
      description: findExpense.description,
      currency: findExpense.currency,
      method: findExpense.method,
      tag: findExpense.tag,
      addEdit: 'Editar despesa',
      id: findExpense.id,
    });
  };

  render() {
    const { email, currencies } = this.props;
    const { value, description, currency, method, tag, addEdit } = this.state;

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
              data-testid="currency-input"
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
          <button type="button" onClick={ this.addExpenses }>{addEdit}</button>
        </form>
        <Table edit={ this.editExpenses } />
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
  remove: (expenses) => dispatch(removeExpense(expenses)),
  edit: (expenses) => dispatch(editExpense(expenses)),

});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  saveCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  edit: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
