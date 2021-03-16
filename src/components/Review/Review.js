import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [carts, setCarts] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);

    const handlePlaceOrder = () => {
        setCarts([]);
        processOrder();
        setOrderPlace(true);
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
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCarts(cartProducts);
    }, [])
    let thankYou;
    if(orderPlace){
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className='twin-container'>
            { thankYou }
            <div className="product-container">
                {
                    carts.map(product => <ReviewItem key={product.key} RemoveProduct={RemoveProduct} product={product}></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart carts={carts}>
                    <button onClick={handlePlaceOrder} className="button">place order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;