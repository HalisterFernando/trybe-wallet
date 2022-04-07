import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

// Componente responsável por renderizar a tabela na página Wallet
class Table extends Component {
  // Deletar um ítem da lista filtrando o ítem a ser removido
  delete = ({ target }) => {
    const { expenses, remove } = this.props;
    const { id } = target;
    let filteredExpenses = [];
    filteredExpenses = expenses.filter((el) => el.id !== Number(id));

    remove(filteredExpenses);
  };

  // Renderiza as linhas da tabela
  lineRender = (expenses) => {
    const { edit } = this.props;
    const tableLines = expenses.map((el) => (
      <tbody key={ el.id }>
        <tr height="50px" bgcolor="#dae1e7">
          <td align="middle">{el.description}</td>
          <td align="middle">{el.tag}</td>
          <td align="middle">{el.method}</td>
          <td align="middle">{Number(el.value).toFixed(2)}</td>
          <td align="middle">{el.exchangeRates[el.currency].name.split('/')[0]}</td>
          <td align="middle">{Number(el.exchangeRates[el.currency].ask).toFixed(2)}</td>
          <td align="middle">
            {((Number(el.value) * (Number(el.exchangeRates[el.currency].ask) * 100))
             / 100).toFixed(2)}
            {' '}
            {/* Multipliquei o valor do ask por 100
            a fim de manter duas casas pós vírgula na aplicação */}
          </td>
          <td align="middle"><font>Real</font></td>
          <td align="middle">
            <button
              className="edit-btn"
              type="button"
              id={ el.id }
              data-testid="edit-btn"
              onClick={ edit }
            >
              Editar
            </button>
            <button
              className="delete-btn"
              type="button"
              id={ el.id }
              data-testid="delete-btn"
              onClick={ this.delete }
            >
              Excluir
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
      <table width="100%" border="1px" bordercolor="#606f7b">
        <thead bgcolor="#4fb39c">
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
        {this.lineRender(expenses)}
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
