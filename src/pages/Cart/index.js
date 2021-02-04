import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete
} from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions'


import { Container, ProductTable, Total } from './styles';

function Cart({ cart, removeFromCart }) {
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
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#7157c1" />
                  </button>
                  <input type="number" readOnly value={product.amount}/>
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#7157c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>R$24,40</strong>
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
          <strong>R$12,20</strong>
        </Total>
      </footer>
    </Container>
  )
}

// recebe todas informações do reducer de cart
const mapStateToProps = state => ({
  cart: state.cart,
})

const mapDispachToProps = dispatch =>
bindActionCreators(CartActions, dispatch)

export default connect(mapStateToProps, mapDispachToProps)(Cart);
