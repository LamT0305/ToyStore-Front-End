import React, { useState } from 'react';
import LoginForm from '../components/Forms/LoginForm';
import SignUpForm from '../components/Forms/SignUpForm';

const login = () => {

    const [activeTab, setActiveTab] = useState("tab1")

    const handleChangeTab1 = () => {
        setActiveTab("tab1");
    }
    const handleChangeTab2 = () => {
        setActiveTab("tab2");
    }

    return (
        <div className='login-page'>
            <div className='login'>
                <div className="Tabs">
                    {/* Tab nav */}
                    <ul className="nav">
                        <li className={activeTab === "tab1" ? "active" : ""} onClick={handleChangeTab1} style={{ color: 'white' }}>Log In</li>
                        <li className={activeTab === "tab2" ? "active" : ""} onClick={handleChangeTab2} style={{ color: 'white' }}>Sign Up</li>
                    </ul>
                    <div className="outlet">
                        {/* content will be shown here */}
                        {activeTab === 'tab1' ? <LoginForm /> : <SignUpForm />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;