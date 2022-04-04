import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { wallet } = this.props;
    console.log(wallet);
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
        {wallet.length > 0 && wallet.map((el, idx) => (
          <tbody key={ idx }>
            <tr>
              <td>{el.description}</td>
              <td>{el.tag}</td>
              <td>{el.method}</td>
              <td>{Number(el.value).toFixed(2)}</td>
              <td>{el.exchangeRates[el.currency].name.split('/')[0]}</td>
              <td>{Number(el.exchangeRates[el.currency].ask).toFixed(2)}</td>
              <td>{((Number(el.value) * (Number(el.exchangeRates[el.currency].ask) * 100)) / 100).toFixed(2)}</td>
              <td>Real</td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (store) => ({
  wallet: store.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
