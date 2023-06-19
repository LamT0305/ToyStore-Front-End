import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
const SignUpForm = () => {

    const { isLoading, handleRegister } = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [pwConfirm, setPwConfirm] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (password === pwConfirm) {

            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("role", "user");

            handleRegister(formData);
        } else {
            alert("Please confirm your password correctly")
        }

    }
    return (
        <div className='signup-form'>
            <form>
                <div className="name input">
                    <div className="label">
                        <label htmlFor="name">Name:</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="name" id='name'  required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>

                <div className="email input">
                    <div className="label">
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className="input-field">
                        <input type="email" name="email"  id='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className="password input">
                    <div className="label">
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="password"  id='password' required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="pw-confirm input">
                    <div className="label">
                        <label htmlFor="pw-confirm">Confirm your password:</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="pw-confirm"  id='pw-confirm' required value={pwConfirm} onChange={e => setPwConfirm(e.target.value)} />
                    </div>
                </div>

                <div className="btn">
                    <button type='submit' onClick={handleSubmit}>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;