import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
  cart,
})


// dessa forma podem ter diversos tipos de reducers e eles
// vão ser adicionados para a alteração ser combinada de
// acordo com o reducer que precisar
