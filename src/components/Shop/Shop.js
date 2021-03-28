import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);  
    const [carts, setCarts] = useState([]);
    
    useEffect(() => {
        fetch('https://hidden-beach-06138.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(products.length > 0){
            const cartProducts = productKeys.map(key => {
                const product = products.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCarts(cartProducts);
        }
    }, [products]);

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