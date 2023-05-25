import React, { useEffect, useState } from 'react';
import useStore from '../hooks/useStore';
import Loading from './Loading';
import Edit from './Edit';
const Stores = () => {
    const { isLoading, handleGetStore, handleDeleteStore, handleUpdateStore, store } = useStore();
    const [updateState, setUpdateState] = useState(-1);
    useEffect(() => {
        handleGetStore(1);
    }, [])

    const handleDel = (id) => {
        handleDeleteStore(id);
    }

    const handleEdit = (id) => {
        setUpdateState(id);
    }
    return (
        <div>
            {isLoading ? <Loading /> : (
                <div className='store-items'>
                    <ul className="store-header">
                        <li className="store-name">ID</li>
                        <li className="store-name">Name</li>
                        <li className="store-name">Address</li>
                        <li className="store-name">Action</li>
                    </ul>

                    <ul className="store-body">
                        {store.map((item) => (
                            !(updateState === item?._id) ? (
                                <ul key={item?._id} className='store-item'>
                                    <li>{item?._id}</li>
                                    <li>{item?.name}</li>
                                    <li>{item?.city}</li>
                                    <li>
                                        <div className="btn">
                                            <button onClick={() => handleDel(item?._id)}>Delete</button>
                                            <button onClick={() => handleEdit(item?._id)}>Update</button>
                                        </div>
                                    </li>
                                </ul>
                            ) : <Edit current={item} key={item?._id} setUpdateState={setUpdateState} updateState={updateState}/>

                        ))}
                    </ul>

                </div>
            )}

        </div>
    );
};

export default Stores;