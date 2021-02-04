
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { MdAddShoppingCart } from  'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';


import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }));

    // console.log(response)
    this.setState({ products:data})
  }

  // dispatch dispara as ações no redux
  handleAddProduct = product => {
    const { dispatch } = this.props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    })
  }

  render () {
    const { products } = this.state

      return (
        <ProductList>
      { products.map(product => (
        <li key={product.id}>
          <img
            src={product.image}
            alt={product.title}
          />
          <strong> {product.title}</strong>
          <span> {product.priceFormatted}</span>
          <button
            type="button"
            onClick={() => this.handleAddProduct(product)}
          >
            <div>
              <MdAddShoppingCart size={16} color="#FFF"/> 3
            </div>

            <span> ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}

    </ProductList>
    )
  }
}

// existem 2 parenteses pois o connect retorna outra função
export default connect()(Home);
