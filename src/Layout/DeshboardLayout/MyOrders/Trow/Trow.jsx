import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Trow = ({ book, refetch }) => {
    const { buyerEmail, buyerName, buyerPhone, location, price, productName, product_img, sellerName, sellerEamil, sellerNumber, _id, pay } = book;


    const handelDelete = (id) => {
        fetch(`https://resell-phones-server.vercel.app/bookingdelete/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(() => {
                toast.success('You one bookd product deleted')
                refetch();
            })
    };
    // delete single products  

    return (
        <tr>
            <th className='text-center'>
                <label>
                    <button onClick={() => handelDelete(_id)} className='btn btn-primary'>Delete</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                            <img src={product_img} alt="product img" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{productName}</div>
                        <div className="text-sm opacity-50">{price} Taka</div>
                    </div>
                </div>
            </td>
            <td>
                {buyerName}
                <br />
                <span className="badge badge-ghost badge-sm">{buyerEmail}</span>
                <br />
                <span className="badge badge-ghost badge-sm">{buyerPhone}</span>
            </td>
            <td>
                {sellerName}
                <br />
                <span className="badge badge-ghost badge-sm">{sellerEamil}</span>
                <br />
                <span className="badge badge-ghost badge-sm">{sellerNumber}</span>
            </td>
            <td>{location}</td>
            <th className='text-center'>
                {
                    pay ?
                        <button className="text-green-500 font-bold">Paid</button>
                        :
                        <Link to={`/deshboard/payment/${_id}`}>
                            <button className="btn btn-outline btn-primary btn-sm">Pay</button>
                        </Link>
                }
            </th>
        </tr>
    );
};

export default Trow;