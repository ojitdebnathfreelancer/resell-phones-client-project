import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="spinner-dotted border-dotted animate-spin inline-block w-8 h-8 border-4 rounded-full bg-primary" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
};

export default Loader;