import produce from 'immer';

export default function cart(state = [], action) {
  // console.log(state)
  switch(action.type) {
    case '@cart/ADD_SUCCESS':
      // draft é uma copia do estado
      return produce(state, draft => {

        const { product } = action;

        draft.push(product)
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        // para deletar o id vem direto da action, sendo assim === action.id
        const productIndex = draft.findIndex(p => p.id === action.id)

        if(productIndex >= 0){
          draft.splice(productIndex, 1)
        }

      });

    case '@cart/UPDATE_AMOUNT':{
      if(action.amount <= 0) {
        return state;
      }

      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id)

        if(productIndex >= 0){
          draft[productIndex].amount = Number(action.amount);
        }

      })
    }


    default:
      return state;
  }
}
