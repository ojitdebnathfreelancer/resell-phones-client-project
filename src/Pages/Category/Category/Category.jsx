import React, { useState } from 'react';
import Card from '../Card/Card';
import BookingModal from '../BookingModal/BookingModal';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Componets/Loader/Loader';

const Category = () => {

    const paramsId = useParams();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['category', paramsId],
        queryFn: () => fetch(`https://resell-phones-server.vercel.app/category/${paramsId.id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
    });

    const [bookingProduct, setBookingProduct] = useState(null);

    if (isLoading) {
        return <Loader></Loader>
    };


    if (products.length === 0) {
        return <p className='text-primary font-bold text-3xl text-center mt-60 capitalize'>This Category products unavailable</p>

    }


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 px-5 my-5'>
            {
                products.map(product => <Card key={product._id} product={product} setBookingProduct={setBookingProduct}></Card>)
            }
            {
                bookingProduct &&
                <BookingModal bookingProduct={bookingProduct} setBookingProduct={setBookingProduct}></BookingModal>
            }
        </div>
    );
};

export default Category;