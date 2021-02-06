import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete
} from 'react-icons/md';

import { formatPrice } from '../../util/format'

import * as CartActions from '../../store/modules/cart/actions'


import { Container, ProductTable, Total } from './styles';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  function increment(product) {
    console.log(product)
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);

  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { cart.map(product => (
            <tr>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7157c1" />
                  </button>
                  <input type="number" readOnly value={product.amount}/>
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7157c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>

              <td>
                <button type="number" onClick={() => removeFromCart(product.id)} >
                  <MdDelete size={20} color="#7157c1" />

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  )
}

// OBS: O melhor lugar para se fazer uma alteração do redux é
// dentro do mapStateToPros


// recebe todas informações do reducer de cart
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount)
  })),
  // utilizando o reduce para reduzir o array num unico valor
  total: formatPrice(
    state.cart.reduce((total, product) => {
      // atribuindo um valor ao total a cada iteração
      return total + product.price * product.amount;
    }, 0),
  )
})

const mapDispachToProps = dispatch =>
bindActionCreators(CartActions, dispatch)

export default connect(mapStateToProps, mapDispachToProps)(Cart);
