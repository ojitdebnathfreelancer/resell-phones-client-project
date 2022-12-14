import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSellers = () => {
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['allsellers'],
        queryFn: () => fetch('https://resell-phones-server.vercel.app/allseller', {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
    });
    // load all sellers 

    const handeleDelteSeller = (id) => {
        fetch(`https://resell-phones-server.vercel.app/sellerdelete/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                toast.success('One seller deleted');
                refetch();
            })
    };
    // delete a single seller 

    const handleDeleteAllSeller = () => {
        alert('Are you want to delete all sellers');
        fetch(`https://resell-phones-server.vercel.app/allsellerdelete`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                toast.success("All sellers deleted");
                refetch();
            })
    };
    // all seller delete , yet not use this 

    const handelVerifySeller = (email, id) => {
        fetch(`https://resell-phones-server.vercel.app/sellerverify?email=${email}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Seller verifid');
                userSellerVeify(id);
            })
    };
    // seller vefify 

    const userSellerVeify = (id) => {
        fetch(`https://resell-phones-server.vercel.app/usersellerverify/${id}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(() => {
                refetch();
            })
    };
    // userSeller verify 

    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Seller Informations</th>
                        <th>Role</th>
                        <th className='text-center'>Verify Status</th>
                        <th className='text-center'>
                            <button className="btn btn-outline btn-accent btn-sm">Delete All</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellers.map(seller => <tr key={seller._id}>
                            <td>
                                {seller.name}
                                <br />
                                <span className="badge badge-ghost badge-sm">{seller.email}</span>
                            </td>
                            <td>{seller.role}</td>
                            <td className='text-center'>
                                {
                                    seller?.seller_verify ?
                                        <button className='text-green-500 font-bold'>Verifid</button>
                                        :
                                        <button onClick={() => handelVerifySeller(seller.email, seller._id)} className='btn btn-outline btn-primary btn-sm'>Verify</button>
                                }
                            </td>
                            <th className='text-center'>
                                <button onClick={() => handeleDelteSeller(seller._id)} className="btn btn-outline btn-accent btn-sm">Delete</button>
                            </th>
                        </tr>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default AllSellers;