import React from 'react';

const SignUpForm = () => {
    return (
        <div className='signup-form'>
            <form>
                <div className="name input">
                    <div className="label">
                        <label htmlFor="name">Name:</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="name" id="name" required />
                    </div>
                </div>

                <div className="email input">
                    <div className="label">
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className="input-field">
                        <input type="email" name="email" id="email" required />
                    </div>
                </div>

                <div className="password input">
                    <div className="label">
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="password" id="password" required />
                    </div>
                </div>
                <div className="pw-confirm input">
                    <div className="label">
                        <label htmlFor="pw-confirm">Confirm your password:</label>
                    </div>
                    <div className="input-field">
                        <input type="password" name="pw-confirm" id="pw-confirm" required />
                    </div>
                </div>

                <div className="btn">
                    <button type='submit'>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;