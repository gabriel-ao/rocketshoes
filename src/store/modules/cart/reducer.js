import produce from 'immer';

export default function cart(state = [], action) {
  // console.log(state)
  switch(action.type) {
    case '@cart/ADD':
      // draft é uma copia do estado
      return produce(state, draft => {
        // vericando se o id que esta vindo do draft é igual ao que ja tem na action
        const productIndex = draft.findIndex(p => p.id === action.product.id)

        productIndex >= 0 ? draft[productIndex].amount +=1 : draft.push({...action.product, amount:1} );
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        // para deletar o id vem direto da action, sendo assim === action.id
        const productIndex = draft.findIndex(p => p.id === action.id)

        if(productIndex >= 0){
          draft.splice(productIndex, 1)
        }

      });
    default:
      return state;
  }
}
