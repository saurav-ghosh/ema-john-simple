import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, seller, price, stock, key} = props.product;
    return (
        <div className="single-product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="name"><Link to={"/product/" + key}>{name}</Link></h4>
                <p>by: <b>{seller}</b></p>
                <p className="price">${price}</p>
                <p><small>only {stock} left in stock order-soon</small></p>
                {props.showAddToCart && <button className="button"
                    onClick={() => props.handleProductAdd(props.product)}>
                    <FontAwesomeIcon icon={faCartPlus} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;