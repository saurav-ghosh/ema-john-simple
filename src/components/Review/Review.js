import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { useHistory } from 'react-router';

const Review = () => {
    const [carts, setCarts] = useState([]);
    const history = useHistory();

    const handleProceedCheck = () => {
        history.push("/shipment");
    };

    const RemoveProduct = productKey => {
        const newCart = carts.filter(pd => pd.key !== productKey)
        setCarts(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://hidden-beach-06138.herokuapp.com/productsByKeys' , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCarts(data))
    }, [])

    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    carts.map(product => <ReviewItem key={product.key} RemoveProduct={RemoveProduct} product={product}></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart carts={carts}>
                    <button onClick={handleProceedCheck} className="button">proceed checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;