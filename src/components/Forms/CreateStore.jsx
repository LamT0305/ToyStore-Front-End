import React, { useState } from 'react';
import useStore from '../../hooks/useStore';
import Loading from '../Loading';
const CreateStore = () => {
    const { isLoading, handleCreateStore } = useStore();
    const [store, setStore] = useState("")
    const [address, setAddress] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("name", store);
        formData.append("city", address);

        handleCreateStore(formData);
    }

    return (
        <>
            {isLoading ? <Loading /> : (
                <div className='create-store'>
                    <div className="store-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '40%' }}>
                        <label htmlFor="store">Add store</label>
                        <input type="text" style={{ width: '70%' }} name="store" id="store" value={store} onChange={e => setStore(e.target.value)} />
                    </div>
                    <div className="address" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '40%' }}>
                        <label htmlFor="address">Address</label>
                        <input type="text" style={{ width: '70%' }} name="address" id="address" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <button type="submit" style={{ backgroundColor: 'lightblue' }} onClick={handleSubmit}>Add</button>
                </div>
            )}

        </>

    );
};

export default CreateStore;