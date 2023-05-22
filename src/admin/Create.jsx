import React, { useState } from 'react';
import CreateForm from '../components/Forms/CreateForm';
import TabNavItem from '../components/TabNavItem';
import TabContent from '../components/TabContent';
import "../layouts/tab.css";
import CreateCategory from '../components/Forms/CreateCategory';
import Categories from '../components/Categories';

const Create = () => {
    const [active, setActive] = useState("tab1")

    return (
        <div className='inner-page'>

            <div className='Tabs_'>
                <ul className="nav_">
                    <TabNavItem title={"Product"} id={"tab1"} activeTab={active} setActiveTab={setActive} />
                    <TabNavItem title={"Category"} id={"tab2"} activeTab={active} setActiveTab={setActive} />
                    <TabNavItem title={"Store"} id={"tab3"} activeTab={active} setActiveTab={setActive} />
                </ul>

                <div className="outlet_">
                    <TabContent id={"tab1"} activeTab={active}>
                        <CreateForm/>
                    </TabContent>
                    <TabContent id={"tab2"} activeTab={active}>
                        <CreateCategory/>
                        <Categories/>
                    </TabContent>
                    <TabContent id={"tab3"} activeTab={active}>
                        a
                    </TabContent>
                </div>
            </div>

        </div>
    );
};

export default Create;