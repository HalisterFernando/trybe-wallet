import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

class Table extends Component {
  delete = ({ target }) => {
    const { expenses, remove } = this.props;
    const { id } = target;
    let filteredExpenses = [];
    if (expenses.length > 0) {
      filteredExpenses = expenses.filter((el) => el.id !== Number(id));
    }
    remove(filteredExpenses);
  };

  lineRender = (expenses) => {
    const { edit } = this.props;
    const tableLines = expenses.map((el) => (
      <tbody key={ el.id }>
        <tr>
          <td>{el.description}</td>
          <td>{el.tag}</td>
          <td>{el.method}</td>
          <td>{Number(el.value).toFixed(2)}</td>
          <td>{el.exchangeRates[el.currency].name.split('/')[0]}</td>
          <td>{Number(el.exchangeRates[el.currency].ask).toFixed(2)}</td>
          <td>
            {((Number(el.value) * (Number(el.exchangeRates[el.currency].ask) * 100))
             / 100).toFixed(2)}

          </td>
          <td>Real</td>
          <td>
            <button
              type="button"
              id={ el.id }
              data-testid="delete-btn"
              onClick={ this.delete }
            >
              Excluir
            </button>

          </td>
          <td>
            <button
              type="button"
              id={ el.id }
              data-testid="edit-btn"
              onClick={ edit }
            >
              Editar
            </button>

          </td>
        </tr>
      </tbody>
    ));
    return tableLines;
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { this.lineRender(expenses)}
      </table>
    );
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (expenses) => dispatch(removeExpense(expenses)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
