import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })}  placeholder="enter your name"/>
      {errors.name && <span className="error">name is required</span>}
      
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="enter your email"/>
      {errors.email && <span className="error">email is required</span>}
      
      <input name="address" ref={register({ required: true })} placeholder="enter your address"/>
      {errors.address && <span className="error">address is required</span>}
      
      <input name="phone" ref={register({ required: true })} placeholder="enter your phone number"/>
      {errors.phone && <span className="error">phone number is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;