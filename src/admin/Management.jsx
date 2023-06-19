import React, { useEffect, useState } from 'react';
import TabContent from './tabs/TabContent';
import TabNavItem from './tabs/TabNavItem';
import Products from './tabs/Products';
import Store from './tabs/Store';

const Management = () => {
    const [active, setActive] = useState("tab1")


    return (
        <div className=' w-[95%] m-auto'>

            <div className='Tabs_ w-full m-0'>
                <ul className="nav_">
                    <TabNavItem title={"Product"} id={"tab1"} activeTab={active} setActiveTab={setActive} />
                    <TabNavItem title={"Store"} id={"tab2"} activeTab={active} setActiveTab={setActive} />
                </ul>

                <div className="outlet_">
                    <TabContent id={"tab1"} activeTab={active}>
                        <Products/>
                    </TabContent>
                    <TabContent id={"tab2"} activeTab={active}>
                        <Store/>
                    </TabContent>

                </div>
            </div>
        </div>
    );
};

export default Management;