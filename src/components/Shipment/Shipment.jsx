import React, { useContext } from 'react';
import './Shipment.css'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = (props) => {
    const [loggedInUserShared, setLoggedInUserShared] = useContext(UserContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
            <input name='name' defaultValue={loggedInUserShared?.name} {...register("example")} />
            {errors.name && <span className='error'>This field is required</span>}

            <input name='email' defaultValue={loggedInUserShared?.email} {...register("example")} />
            {errors.email && <span className='error'>This field is required</span>}

            <input name='address'  {...register("example")} />
            {errors.address && <span className='error'>This field is required</span>}

            <input name='phone'  {...register("example")} />
            {errors.phone && <span className='error'>This field is required</span>}

            <input type="submit" />
        </form>
    );

};

export default Shipment;