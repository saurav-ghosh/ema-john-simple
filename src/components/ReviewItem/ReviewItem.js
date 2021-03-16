import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {key, name, quantity, price} = props.product;
    return (
        <div className='review-products'>
            <h4>{name}</h4>
            <p>quantity: {quantity}</p>
            <p>price: {price}</p>
            <button
                onClick={() => props.RemoveProduct(key)}
                className="button">remove
            </button>
        </div>
    );
};

export default ReviewItem;