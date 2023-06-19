import React, { useEffect, useState } from 'react';
import useProduct from '../hooks/useProduct';
import { Link, useParams, useNavigate } from 'react-router-dom';

const path = 'http://localhost:5001/uploads/';

const ViewProduct = () => {
    const { toy, handleGetproductById, handleGetToys, toys } = useProduct();
    const navigate = useNavigate();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        handleGetproductById(id);
        handleGetToys(1);
    }, [id]);

    const newArray = [...toys];
    newArray.length = 4;

    const handleViewDetails = (itemId) => {
        navigate(`/view/${itemId}`);
    };
    console.log(toy)
    return (
        <div className="bg-gray-100">
            <div className="max-w-screen-xl mx-auto py-8">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img src={`${path}${toy?.image}`} alt="" className="w-full" />
                    </div>

                    <div className="md:w-1/2 md:pl-8 flex flex-col justify-evenly ">
                        <h2 className="text-3xl font-bold mb-4">{toy?.name}</h2>
                        <p className="text-gray-600 mb-4">
                            Category: {toy?.category_id?.name}
                        </p>
                        <p className="text-gray-600 mb-4">Price: ${toy?.price}</p>
                        <p
                            className="text-gray-600 mb-4"
                            dangerouslySetInnerHTML={{ __html: toy?.description }}
                        ></p>
                        <div className="mb-4 flex flex-col">
                            <div className=' w-[30%] flex items-center justify-around'>
                                <button onClick={() => {
                                    if (quantity > 0) {
                                        setQuantity(quantity - 1)
                                    }
                                }
                                }>{"-"}</button>
                                <p className=' w-[30%] mx-1 px-1'>{quantity}</p>
                                <button onClick={() => {
                                    setQuantity(quantity + 1)
                                }}>{"+"}</button>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="text-xl font-bold mb-4">You may also like:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {newArray.map((item) => (
                            <div className="card" key={item?._id}>
                                <img
                                    className="card-img-top"
                                    src={`${path}${item?.image}`}
                                    alt="Card image cap"
                                />
                                <div className="card-body">
                                    <h5 className="card-title font-bold">{item?.name}</h5>
                                    <p className="card-text">Price: {item?.price}</p>
                                    <p className="card-text">
                                        Category: {item?.category_id?.name}
                                    </p>
                                    <p
                                        className="card-text"
                                        dangerouslySetInnerHTML={{ __html: item?.description }}
                                    ></p>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
                                        onClick={() => handleViewDetails(item?._id)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
