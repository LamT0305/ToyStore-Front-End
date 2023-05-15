import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LoginForm from '../components/Forms/LoginForm';
import SignUpForm from '../components/Forms/SignUpForm';

const login = () => {

    const [tabIndex, setTabIndex] = useState(0)

    return (
        <div className='inner-page'>
            <div className='login'>
                <Tabs defaultIndex={tabIndex} onSelect={(i)=>setTabIndex(i)}>
                    <TabList>
                        <Tab>Log In</Tab>
                        <Tab>Sign up</Tab>
                    </TabList>

                    <TabPanel className={"Login-form"}>
                        <LoginForm/>
                    </TabPanel>
                    <TabPanel className={"SignUp-form"}>
                        <SignUpForm/>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default login;