import React from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

function Cart() {
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
          <tr>
            <td>
            <img
              src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/371570/25/sv01/fnd/BRA/w/320/h/320/bg/255,255,255"
              alt="Tênis"
            />
            </td>
            <td>
              <strong>Tênis muito topzera</strong>
              <span>Total</span>

            </td>
            <td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#7157c1" />
                </button>
                <input type="number" readOnly value={2}/>
                <button type="button">
                  <MdAddCircleOutline size={20} color="#7157c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>R$24,40</strong>
            </td>

            <td>
              <button type="number" >
                <MdDelete size={20} color="#7157c1" />

              </button>
            </td>
          </tr>
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

export default Cart;
