import React from 'react';
import fakeData from '../../fakeData';

const ManageInventory = () => {
    const handleAddProduct = () => {
        fetch('https://hidden-beach-06138.herokuapp.com/addProducts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(fakeData)
        })
        
    }
    return (
        <form action="">
            <p><span>name: </span><input type="text"/></p>
            <p><span>price: </span><input type="text"/></p>
            <p><span>quantity: </span><input type="text"/></p>
            <p><span>choose a file</span><input type="file"/></p>
            <button onClick={handleAddProduct}>add product</button>
        </form>
    );
};

export default ManageInventory;