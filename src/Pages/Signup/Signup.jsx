import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { resellContext } from '../../AuthContext/AutchContext';
import toast from 'react-hot-toast';
import UseToken from '../../Hooks/UseToken/UseToken';

const Signup = () => {
    const { userCreate, googleUser, updateUser } = useContext(resellContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [tokenUser, setTokenUser] = useState('');

    const [token] = UseToken(tokenUser);

    useEffect(() => {
        if (token) {
            navigate('/');
            toast.success('User created successfull');
        }
    }, [token, navigate])

    const handelSignup = (data) => {
        const savUser = {
            name: data.name,
            email: data.email,
            role: data.role,
        };

        userCreate(data.email, data.password)
            .then(() => {
                update(data.name);
            })
            .catch(error => setError(error));
        // created user 

        const update = (name) => {
            const profile = {
                displayName: name,
                photoURL: ''
            };

            updateUser(profile)
                .then(() => {
                    saveUserDb(savUser);
                })
                .catch(error => setError(error));
        };
        // update user handel 
    };
    // sign up user with new account create and update  


    const handelGoogle = () => {
        googleUser()
            .then(result => {
                const user = result.user;
                const Guser = {
                    name: user.displayName,
                    email: user.email,
                    role: 'buyer'
                }
                saveUserDb(Guser);
                setTokenUser(user?.email);
            })
            .catch(error => setError(error.message));
    };
    // google sign up user with new account and updated 

    const saveUserDb = (Suser) => {
        fetch('https://resell-phones-server.vercel.app/users', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(Suser)
        })
            .then(res => res.json())
            .then(() => {
                setTokenUser(Suser?.email);
            })
    }
    // user save to db with some user info

    return (
        <div className="hero lg:my-3">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                    <p className="py-6">Create your first accoutn inside our comunity and you will start products sell or by with our big global comunity</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 lg:w-1/2">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handelSignup)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered" {...register('name', { required: "Please type your full name" })} />
                                {
                                    errors?.name && <p className='text-red-500'>{errors.name.message}</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" {...register('email', { required: "Please type a vaild email" })} />
                                {
                                    errors?.email && <p className='text-red-500'>{errors.email.message}</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" {...register('password',
                                    {
                                        required: "Please type your correct password",
                                        pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, message: "Must be strong, use A,a,number" },
                                        minLength: { value: 8, message: 'Password must be 8 charaters' }
                                    }
                                )} />
                                {
                                    errors?.password && <p className='text-red-500'>{errors.password.message}</p>
                                }
                            </div>
                            <p className='text-red-500 text-center my-2'>{error}</p>
                            <div className='my-2'>
                                <p>What is your account type?</p>
                                <label className='flex items-center w-20 mt-3'>
                                    <input
                                        {...register('role', { required: true })}
                                        type="radio"
                                        name="role"
                                        value="seller"
                                        className="radio radio-primary"
                                    />
                                    <span className='ml-2'>Seller</span>
                                </label>
                                <label className='flex items-center w-20 mt-3'>
                                    <input
                                        {...register('role', { required: true })}
                                        type="radio"
                                        name="role"
                                        value="buyer"
                                        selected 
                                        className="radio radio-primary"
                                    />
                                    <span className='ml-2'>Buyer</span>
                                </label>
                            </div>
                            <p className='text-center mt-3'>
                                You have alerdy account please <Link className='text-blue-900 underline' to='/login'>Login</Link>
                            </p>
                            <div className="form-control mt-3">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <button onClick={handelGoogle} className='btn btn-outline'>
                            <FaGoogle size={25} />
                            <span className='ml-2'>Sign Up With Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;