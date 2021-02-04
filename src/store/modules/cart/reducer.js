import produce from 'immer';

export default function cart(state = [], action) {
  // console.log(state)
  switch(action.type) {
    case 'ADD_TO_CART':
      // draft é uma copia do estado
      return produce(state, draft => {
        // vericando se o id que esta vindo do draft é igual ao que ja tem na action
        const productIndex = draft.findIndex(p => p.id === action.product.id)

        productIndex >= 0 ? draft[productIndex].amount +=1 : draft.push({...action.product, amount:1} );
      })
    default:
      return state;
  }
}
