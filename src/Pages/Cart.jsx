import React from 'react';

const Cart = () => {
    const isAuthenticated_ = sessionStorage.getItem("isAuthenticated")

    return (
        <div className='inner-page'>
            {isAuthenticated_ ? (
                <>
                    aaaaa
                </>
            ) : (
                <>
                    <p>Please Log in first !</p>
                </>
            )}
        </div>
    );
};

export default Cart;