import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 15);
    const [products, setProducts] = useState(first10);  
    const [carts, setCarts] = useState([]);
    
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
    }, []);

    const handleProductAdd = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = carts.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = carts.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1; 
            newCart = [...carts, product];
        }
        setCarts(newCart);
        addToDatabaseCart(product.key, count);
    };

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product showAddToCart={true} key={pd.key} product={pd} handleProductAdd={handleProductAdd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart carts={carts}>
                    <Link to="/review">
                        <button className="orderButton">Review your order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;