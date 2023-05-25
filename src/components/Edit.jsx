import React, { useState } from 'react';
import useStore from '../hooks/useStore';
const Edit = ({ current, setUpdateState }) => {
    const { handleUpdateStore } = useStore();
    const [name, setName] = useState(current?.name)
    const [address, setAddress] = useState(current?.city)
    const handleInput = () => {
        const formData = new FormData();
        formData.append("name", name)
        formData.append("city", address)
        setUpdateState(-1);
        handleUpdateStore(formData, current?._id);
    }
    return (
        <div className='edit-store' key={current?._id}>
            <li>{current?._id}</li>
            <li>
                <input type="text" name="" id="" value={name} onChange={(e) => setName(e.target.value)} />
            </li>
            <li>
                <input type="text" name="" id="" value={address} onChange={(e) => setAddress(e.target.value)} />
            </li>
            <li style={{ padding: '6px 0' }}>
                <button style={{ margin: '25px 0' }} onClick={handleInput}>Update</button>
            </li>
        </div>
    );
};

export default Edit;