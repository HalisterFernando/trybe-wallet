import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>

      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrency()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
