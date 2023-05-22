import React, { useEffect } from 'react';
import useCategory from '../hooks/useCategory';
const Categories = () => {
    const { isLoading, category, handleGetCategory, handleDeleteCategory } = useCategory();

    useEffect(() => {
        handleGetCategory();
    }, [])

    const handleDel = (id) => {
        handleDeleteCategory(id);
    }

    return (
        <div className='category-items'>
            <ul className="cate-header">
                <li className="cate-name">ID</li>
                <li className="cate-name">Name</li>
                <li className="cate-name">Action</li>
            </ul>

            <ul className="cate-body">
                {category.map((item) => (
                    <ul key={item?._id} className='cate-item'>
                        <li>{item?._id}</li>
                        <li>{item?.name}</li>
                        <li>
                            <div className="btn">
                                <button onClick={() => handleDel(item?._id)}>Delete</button>
                                <button>Update</button>
                            </div>
                        </li>
                    </ul>
                ))}
            </ul>

        </div>
    );
};

export default Categories;