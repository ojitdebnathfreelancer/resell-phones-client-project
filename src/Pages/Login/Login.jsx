import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { resellContext } from '../../AuthContext/AutchContext';
import toast from 'react-hot-toast';
import UseToken from '../../Hooks/UseToken/UseToken';


const Login = () => {
    const { userLogin, googleUser } = useContext(resellContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [tokenUser, setTokenUser] = useState('');

    const [token] = UseToken(tokenUser);

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
            toast.success("Successfuly login");
        };
    }, [token, from, navigate])

    const handelLogin = (data) => {
        userLogin(data.email, data.password)
            .then(result => {
                const user = result.user;
                setTokenUser(user?.email);
            })
            .catch(error => setError(error.message));
    };
    // login user with some info 

    const errorEmpty = () => {
        setError('');
    };
    // error state empty with onclick 

    const handelGoogle = () => {
        googleUser()
            .then(result => {
                const user = result.user;
                const Guser = {
                    name: user.displayName,
                    email: user.email,
                    role: 'buyer'
                }
                setTokenUser(user?.email);
                saveUserDb(Guser);
            })
            .catch(error => setError(error));
    };
    // user login with google 

    const saveUserDb = (user) => {
        fetch('https://resell-phones-server.vercel.app/users', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(() => {
                setTokenUser(user.email);
            })
    }
    // user save to db with some user info

    return (
        <div className="hero lg:my-5">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left lg:w-1/2">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provide your information to login then you can start buy or sell products with our comunity</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handelLogin)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input onClick={errorEmpty} type="email" placeholder="email" className="input input-bordered" {...register('email', { required: "Please type a vaild email" })} />
                                {
                                    errors?.email && <p className='text-red-500'>{errors.email.message}</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input onClick={errorEmpty} type="password" placeholder="password" className="input input-bordered" {...register('password', { required: "Please type your correct password" })} />
                                {
                                    errors?.password && <p className='text-red-500'>{errors.password.message}</p>
                                }
                                <label className="label">
                                    <Link to="/" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <p className='text-red-500 text-center'>{error}</p>
                            <p className='text-center'>
                                You havn't any account please <Link className='text-blue-900 underline' to='/signup'>create</Link>
                            </p>
                            <div className="form-control mt-3">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <button onClick={handelGoogle} className='btn btn-outline'>
                            <FaGoogle size={25} />
                            <span className='ml-2'>Login With Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;