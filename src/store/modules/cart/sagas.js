import { call, select, put, all, takeLatest } from 'redux-saga/effects'

import { toast } from 'react-toastify';

import api from '../../../services/api'
import { formatPrice } from '../../../util/format'

import { addToCartSuccess, updateAmountSuccess } from './actions'

// * é como async
// yield é como await
function* addToCart({ id }) {
  const productExists = yield select(
    state => state.cart.find(p => p.id === id)
  )

  const stock = yield call(api.get, `/stock/${id}`)

  const stockAmount = stock.data.amount
  const currentAmount = productExists ? productExists.amount : 0

  const amount = currentAmount + 1

  if(amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque')
    return;
  }

  if(productExists){
    yield put(updateAmountSuccess(id, amount))
  } else {
    const response = yield call(api.get, `/products/${id}`)

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price)
    }

    yield put(addToCartSuccess(data))
  }
}

function* updateAmount({id, amount}) {
  if(amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;

  if(amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount))
}

// descarta a primeira chamada se caso ouver varios clicks
export default all ([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/ADD_AMOUNT_REQUEST', updateAmount),
]);
