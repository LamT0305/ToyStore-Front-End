import React from 'react';

const TabContent = ({ id, activeTab, children }) => {
    return (
        <div>
            {activeTab === id ? <div className='TabContent_'>
                {children}
            </div> : null}
        </div>
    );
};

export default TabContent;