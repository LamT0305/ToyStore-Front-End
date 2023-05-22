import React, { useState } from 'react';
import useCategory from '../../hooks/useCategory';

const CreateCategory = () => {
    const [category, setCategory] = useState("")

    const { isLoading, handleCreateCategory } = useCategory();

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", category)
        handleCreateCategory(formData)
    }
    return (
        <form className='category-form'>
            <label htmlFor="category">Add category</label>
            <input type="text" name="category" id="category" value={category} onChange={e => setCategory(e.target.value)} />
            <button type="submit" style={{ backgroundColor: 'lightblue' }} onClick={handleSubmit}>Add</button>
        </form>
    );
};

export default CreateCategory;
