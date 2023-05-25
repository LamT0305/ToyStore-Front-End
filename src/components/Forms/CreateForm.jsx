import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useFormik } from 'formik';
import useProduct from '../../hooks/useProduct';
import useCategory from '../../hooks/useCategory';
import Loading from '../Loading';

const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ["link", "image"],
];

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Required';
    }

    if (!values.price) {
        errors.price = 'Required';
    } else if (values.price <= 0) {
        errors.price = 'Price must be greater than 0';
    } else if (!/^\d+(\.\d+)?$/.test(values.price)) {
        errors.price = 'Input must contain only decimal digits';
    }

    if (!values.description) {
        errors.description = 'Required';
    }

    return errors;
};

const CreateForm = () => {
    const { isLoading, handleCreateToy, toys, handleGetToys } = useProduct();
    const { category, handleGetCategory } = useCategory();
    const [dropdown, setDropdown] = useState("");
    const [preview, setPreview] = useState("");



    const formik = useFormik({
        initialValues: {
            name: '',
            price: 0,
            image: "",
            description: '',
        },
        validate,
        onSubmit: values => {
            const formData = new FormData();

            formData.append("name", values.name)
            formData.append("price", parseInt(values.price))
            formData.append("image", values.image)
            formData.append("description", values.description)
            formData.append("category_id", dropdown)
            // handleCreateToy(formData);
            // console.log(formData.get("price"));
            console.log(values.price)
        },
    });

    const handleChangeFile = (event) => {
        const obj = event.target.files[0];

        formik.setFieldValue("image", obj)
    }

    const handleRemoveFile = () => {
        formik.setFieldValue("image", "");
        setPreview("");
    }

    useEffect(() => {
        handleGetCategory();
    }, [])


    const options = category.map((i) => ({
        value: i._id,
        label: i.name,
    }));

    // console.log(toys)

    return (
        <>
            {isLoading ? <Loading /> : (
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', width: '85%', margin: '50px auto' }}>
                    <div style={{ width: '70%' }}>
                        <div className="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 30 }}>
                            <div className="title">
                                <div className="label">
                                    <label htmlFor="name">Product's name: </label>
                                </div>
                                <div className="" style={{ display: 'flex', alignItems: 'center', width: '75%', position: 'relative' }}>
                                    <input
                                        placeholder='Enter product name'
                                        type="text"
                                        id='name'
                                        name='name'
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        className='title-input'
                                    // required
                                    />
                                    {formik.errors.name ? <div> <i style={{
                                        color: 'red', marginLeft: 10,
                                        position: 'absolute',
                                        bottom: -25,
                                        left: -30,
                                    }}>{formik.errors.name}</i> </div> : null}
                                </div>
                            </div>

                            <div className="price">
                                <div className="label">
                                    <label htmlFor="">Price: </label>
                                </div>
                                <div className="" style={{ display: 'flex', alignItems: 'center', width: '70%', position: 'relative' }}>
                                    <input
                                        placeholder='Enter price'
                                        type="text"
                                        id='price'
                                        name='price'
                                        // required={dropdown === 'tao-khoa-hoc' ? true : false}
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        className='price-input'
                                    />
                                    {formik.errors.price ? <div> <i style={{
                                        color: 'red', marginLeft: 10,
                                        position: 'absolute',
                                        bottom: -25,
                                        left: -30,
                                        width: 255
                                    }}>{formik.errors.price}</i> </div> : null}

                                </div>

                            </div>
                        </div>


                        <div className="content">
                            <ReactQuill
                                theme="snow"
                                id='description'
                                name="description"
                                value={formik.values.description}
                                onChange={e => formik.setFieldValue("description", e)}
                                modules={{
                                    toolbar: toolbarOptions,
                                }}
                            />
                            {formik.errors.description ? <div> <i style={{
                                color: 'red', marginLeft: 10,

                            }}>{formik.errors.description}</i> </div> : null}
                        </div>
                    </div>

                    <div className='thumbnail' style={{ width: '30%' }}>
                        {formik.values.image.length > 0 || formik.values.image ? (<>

                            <div className="preview">
                                <img src={URL.createObjectURL(formik.values.image)} alt="" width={"100%"} />
                                <button className='removePre' onClick={handleRemoveFile}>X</button>
                            </div>

                        </>) :

                            (
                                <div className='thumbnail-img'>
                                    <label id='file-upload' htmlFor="file">Upload image</label>
                                    <input
                                        style={{ width: '45%', margin: '0 auto' }}
                                        type="file"
                                        id="file"
                                        accept="image/*"
                                        name="thumbnail"
                                        onChange={handleChangeFile}
                                        required
                                    />
                                </div>
                            )}


                        <div className="dropdown">
                            <p>Category:</p>
                            <Dropdown options={options} onChange={e => setDropdown(e.value)} value={dropdown} />
                        </div>

                        <div className="submit">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            )}

        </>

    );
}

export default CreateForm;
