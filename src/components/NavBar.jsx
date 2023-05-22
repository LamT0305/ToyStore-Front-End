import React, { useEffect } from 'react';
import Logo from "../assets/images/logo.avif";
import { Link } from 'react-router-dom';
import Cart from "../assets/images/cart.png"
import User from "../assets/images/user.png"
import useAuth from '../hooks/useAuth';

const NavBar = () => {
    const isAuthenticated_ = sessionStorage.getItem("isAuthenticated")
    const role = sessionStorage.getItem("role");
    const { handleLogout } = useAuth();


    return (
        <div className='navBar'>
            <div className='logo'>
                <Link to={"/"}>
                    <img src={Logo} alt="logo" className='img-logo' />
                </Link>
            </div>
            <div className="links" >
                {role && role === "admin" ? (
                    <>
                        <Link className='link-item' to={"/admin/create"}>CREATE</Link>
                        <Link className="link-item">MANAGEMENT</Link>
                    </>

                ) : null}

                <Link className='link-item' to={"/"}>HOME</Link>
                <Link className='link-item' to={"/shop"}>SHOP</Link>
                <Link className='link-item' to={"/gallery"}>GALLERY</Link>
                <Link className='link-item' to={"/cart"}>
                    <img src={Cart} alt="shopping-cart" className='icon' />
                </Link>
                {isAuthenticated_ ? (
                    <ul style={{ listStyleType: 'none' }} className='user-btn'>
                        <li>
                            <Link className='link-item' to={"/user"}>
                                <img src={User} alt="shopping-cart" className='icon' />
                            </Link>
                        </li>
                        <li className='logout-btn'>
                            <button onClick={handleLogout}>
                                Log out
                            </button>
                        </li>
                    </ul>

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