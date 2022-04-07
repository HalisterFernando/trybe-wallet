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
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      addEdit: 'Adicionar despesa',
      id: '',
    };
  }

  componentDidMount() {
    const { saveCurrency } = this.props;
    // Realiza uma requisição a API para buscar as currencies ao montar o componente
    saveCurrency();
  }

  // Validação dos inputs
  handleInputs = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // Adiciona ítems na lista
  addExpenses = () => {
    const { saveExpenses, expenses, edit } = this.props;
    const { value, description, currency, method, tag, addEdit, id } = this.state;
    const INITIAL_STATE = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      addEdit: 'Adicionar despesa',
      id: '',
    };
    // Salva infomações pertinentes do estado local no estado global
    if (addEdit === 'Adicionar despesa') {
      saveExpenses({ value, description, currency, method, tag });
      this.setState({ ...INITIAL_STATE });
    } else {
      // Filtra o elemento a ser editado e altera a informações conforme as novas passadas no estado local
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
      this.setState({ ...INITIAL_STATE });
    }
  }

  sumExpenses = () => {
    const { expenses } = this.props;

    let total = 0;

    // Array contando a currency e valores da despesa assim como taxa de câmbio
    const valueAsk = expenses.map((el) => ({
      [el.currency]: Number(el.value),
      ask: Number(el.exchangeRates[el.currency].ask),
    }));

    // Array com todas as currencies encontradas no estado global
    const currencies = expenses.map((el) => el.currency);

    // Calcula o total percorrendo o array valueAsk reatribuindo o valor a variável total
    valueAsk.forEach((el, idx) => {
      total += el[currencies[idx]] * el.ask;
    });

    return total.toFixed(2);
  }

  // Altera o estado local conforme as informações da despesa a ser alterada
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
      <div className="wallet-main-container">
        <header>
          <div className="icon-email">
            <img className="wallet2" src="./images/Wallet-icon2.png" alt="logo" />
            <span data-testid="email-field">{email}</span>
          </div>
          <div className="total">
            <span
              className="money"
              data-testid="total-field"
            >
              {`$${this.sumExpenses()}`}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <form>
          <label htmlFor="outcome">
            Valor da despesa:
            <br />
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
            <br />
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
            <br />
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              onChange={ this.handleInputs }
              value={ currency }
            >
              {/* Retorna as currencies do estado global */}
              {currencies.map((coin, idx) => (<option key={ idx }>{coin}</option>))}
            </select>
          </label>
          <label htmlFor="method">
            Forma de pagamento:
            <br />
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ this.handleInputs }
              value={ method }
            >
              <option selected>Dinheiro</option>
              <option>Cartão de crédito </option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <br />
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.handleInputs }
              value={ tag }
            >
              <option selected>Alimentação</option>
              <option>Lazer </option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            className={ addEdit === 'Editar despesa' ? 'edit' : 'add' }
            type="button"
            onClick={ this.addExpenses }
          >
            {addEdit}

          </button>
        </form>
        <div className="table-container">
          <Table edit={ this.editExpenses } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
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
