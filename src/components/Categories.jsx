import React, { useEffect, useState } from 'react';
import useCategory from '../hooks/useCategory';
import Loading from './Loading';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Categories = () => {
    const { isLoading, category, handleGetCategory, handleDeleteCategory } = useCategory();
    const [updateState, setUpdateState] = useState(-1);
    useEffect(() => {
        handleGetCategory();
    }, [])

    const handleDel = (id) => {
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to delete",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => handleDeleteCategory(id)
                },
                {
                    label: "No",
                }
            ]

        })
    }


    return (
        <>
            {isLoading ? <Loading /> : (
                <div className='category-items'>
                    <ul className="cate-header">
                        <li className="cate-name">ID</li>
                        <li className="cate-name">Name</li>
                        <li className="cate-name">Action</li>
                    </ul>

                    <ul className="cate-body">
                        {category.map((item) => (
                            updateState === item?._id ? <Edit key={item?._id} current={item} setUpdate={setUpdateState} /> :
                                <ul key={item?._id} className='cate-item'>
                                    <li>{item?._id}</li>
                                    <li>{item?.name}</li>

                                    <li>
                                        <div className="btn">
                                            <button onClick={() => handleDel(item?._id)}>Delete</button>
                                            <button onClick={() => setUpdateState(item?._id)}>Update</button>
                                        </div>
                                    </li>
                                </ul>
                        ))}
                    </ul>

                </div>
            )}

        </>
    );
};

export default Categories;


function Edit({ current, setUpdate }) {
    const { handleUpdateCategory } = useCategory();
    const [name, setName] = useState(current?.name)
    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("name", name);
        handleUpdateCategory(current?._id, formData);
        setUpdate(-1);
    }
    return (
        <>
            <div className='edit-category' key={current?._id}>
                <li>{current?._id}</li>
                <li>
                    <input type="text" name="" id="" value={name} onChange={(e) => setName(e.target.value)} />
                </li>
                <li style={{ padding: '6px 0' }}>
                    <button style={{ margin: '25px 0' }} onClick={handleUpdate}>Update</button>
                </li>
            </div>
        </>
    )
}