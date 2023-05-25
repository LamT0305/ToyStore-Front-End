import React, { useState } from 'react';
import useAuth from "../../hooks/useAuth"
import Loading from '../Loading';

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { handleLogin, isLoading } = useAuth();

    const handleLogin_ = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("email", email)
        formData.append("password", password)
        handleLogin(formData)
    }
    return (
        <div>
            <div className='login-form'>
                <form>
                    <div className="email input">
                        <div className="label">
                            <label htmlFor="email">Email:</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="password input-fields">
                        <div className="label">
                            <label htmlFor="password">Password:</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="btn">
                        <button onClick={handleLogin_}>
                            Log In
                        </button>
                    </div>
                </form>
            </div>


        </div>

    );
};

export default LoginForm;