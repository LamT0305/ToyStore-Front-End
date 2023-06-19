import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useFormik } from 'formik';
import useProduct from '../../hooks/useProduct';
import useCategory from '../../hooks/useCategory';
import Loading from '../Loading';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/useStore';

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

    if (!values.quantity) {
        errors.quantity = 'Required';
    } else if (!/^(?!0)[1-9]\d*$/.test(values.quantity)) {
        errors.quantity = 'Input must contain only numbers and the first digit cannot be 0 number'
    }
    return errors;
};

const baseURL = 'http://localhost:5001/uploads/'

const CreateForm = () => {

    const { isLoading, handleCreateToy, toys, handleUpdateProduct } = useProduct();
    const { category, handleGetCategory } = useCategory();
    const { store, handleGetStore } = useStore();
    const [dropdown, setDropdown] = useState("");
    const [preview, setPreview] = useState("");
    const [store_, setStore_] = useState(null);
    const [action, setAction] = useState("create");

    const { id } = useParams();

    const currentPost = toys.find(item => item._id === id);

    const handleSubmit = (values) => {
        if (action === 'create') {
            const formData = new FormData();
            if (dropdown.length > 0) {
                formData.append("name", values.name)
                formData.append("price", values.price)
                formData.append("image", values.image)
                formData.append("description", values.description)
                formData.append("category_id", dropdown)
                formData.append("quantity", values.quantity)
                formData.append("store_id", store_)
                handleCreateToy(formData);

            } else {
                alert("Please select a category");
            }
        } else if (action === 'Update') {
            const formData = new FormData();
            if (dropdown.length > 0) {
                formData.append("name", values.name)
                formData.append("price", values.price)
                formData.append("image", values.image)
                formData.append("description", values.description)
                formData.append("category_id", dropdown)
                formData.append("quantity", values.quantity)
                formData.append("store_id", store_)
                handleUpdateProduct(id, formData);
                // console.log(formData.get("image"))

            } else {
                alert("Please select a category");
            }
        }
    }
    const formik = useFormik({
        initialValues: {
            name: currentPost?.name || '',
            price: currentPost?.price || 1,
            image: currentPost?.image || "",
            description: currentPost?.description || '',
            quantity: currentPost?.quantity || 1,
        },
        validate,
        onSubmit: values => {
            handleSubmit(values);
        },
    });

    const handleChangeFile = (event) => {
        const obj = event.target.files[0];
        setPreview(URL.createObjectURL(obj))
        formik.setFieldValue("image", obj)
    }

    const handleRemoveFile = () => {
        formik.setFieldValue("image", "");
        setPreview("");
    }

    useEffect(() => {
        handleGetCategory();
        handleGetStore();
        if (currentPost) {
            setDropdown(currentPost?.category_id?._id);
            setStore_(currentPost?.store_id?._id);
            setAction("Update");
        } else {
            setDropdown("");
        }

    }, [])


    const options = category.map((i) => ({
        value: i._id,
        label: i.name,
    }));

    const stores = store.map((i) => ({
        value: i._id,
        label: i.name
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
                                <div className="" style={{ display: 'flex', alignItems: 'center', width: '45%', position: 'relative' }}>
                                    <input
                                        placeholder='Enter price'
                                        type="text"
                                        id='price'
                                        name='price'
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

                            <div className="quantity flex flex-row items-center w-[20%] justify-evenly">
                                <div className="label">
                                    <label htmlFor="">Quantity: </label>
                                </div>
                                <div className="" style={{ display: 'flex', alignItems: 'center', width: '45%', position: 'relative' }}>
                                    <input
                                        placeholder='Enter quantity number'
                                        type="text"
                                        id='quantity'
                                        name='quantity'
                                        // required={dropdown === 'tao-khoa-hoc' ? true : false}
                                        value={formik.values.quantity}
                                        onChange={
                                            formik.handleChange
                                        }
                                        className='quantity-input border-1 border-black rounded py-2 px-2 w-[100%]'
                                    />
                                    {formik.errors.quantity ? <div> <i style={{
                                        color: 'red', marginLeft: 10,
                                        position: 'absolute',
                                        bottom: -35,
                                        left: 70,
                                        width: 255
                                    }}>{formik.errors.quantity}</i> </div> : null}

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
                                <img src={preview || (currentPost && `${baseURL}${currentPost.image}`)} alt="" width={"100%"} />
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


                        <div className="dropdown flex flex-col justify-between h-40">
                            <div className="">
                                <p className=' mb-2'>Category:</p>
                                <Dropdown options={options} onChange={e => setDropdown(e.value)} value={dropdown} />
                            </div>
                            <div className="">
                                <p className=' mb-2'>Store:</p>
                                <Dropdown options={stores} onChange={e => setStore_(e.value)} value={store_} />
                            </div>
                        </div>

                        <div className="submit">
                            <button type="submit">{!currentPost ? 'Submit' : 'Update'}</button>
                        </div>
                    </div>
                </form>
            )}

        </>

    );
}

export default CreateForm;
