import React from 'react';
import Logo from "../assets/images/logo.avif";
import { Link } from 'react-router-dom';
import Cart from "../assets/images/cart.png"
import User from "../assets/images/user.png"
const NavBar = () => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated")
    console.log(isAuthenticated)
    return (
        <div className='navBar'>
            <div className='logo'>
                <Link to={"/"}>
                    <img src={Logo} alt="logo" className='img-logo' />
                </Link>
            </div>
            <div className="links" >
                <Link className='link-item' to={"/"}>HOME</Link>
                <Link className='link-item' to={"/shop"}>SHOP</Link>
                <Link className='link-item' to={"/gallery"}>GALLERY</Link>
                <Link className='link-item' to={"/cart"}>
                    <img src={Cart} alt="shopping-cart" className='icon' />
                </Link>
                {isAuthenticated ? (
                    <Link className='link-item' to={"/user"}>
                        <img src={User} alt="shopping-cart" className='icon' />
                    </Link>
                ) : (
                    <Link className='link-item' to={"/login"}>
                        <img src={User} alt="shopping-cart" className='icon' />
                    </Link>
                )}

            </div >
        </div >
    );
};

export default NavBar;