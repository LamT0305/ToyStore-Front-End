import React, { useEffect } from 'react';
import useProduct from '../hooks/useProduct';
import { Link, useParams } from 'react-router-dom';

const path = "http://127.0.0.1:5001/uploads/"


const ViewProduct = () => {
    const { toy, handleGetproductById, handleGetToys, toys } = useProduct();

    const { id } = useParams();

    useEffect(() => {
        handleGetproductById(id)
        handleGetToys(1);
    }, [])

    const newArray = [...toys];
    newArray.length = 4;

    return (
        <div className="inner-page">
            <div className='product'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '35%', height: '400px' }}>
                        <img src={`${path}${toy?.image}`} alt="" className='show-img' />
                    </div>

                    <div className="product-body">
                        <div className="product-info">
                            <h3>{toy?.name}</h3>
                            <p>Category: {toy?.category_id?.name}</p>
                            <p>Price: ${toy?.price}</p>
                            <p dangerouslySetInnerHTML={{ __html: toy?.description }}></p>
                        </div>
                        <div className="btn">
                            <button>Add to cart</button>
                        </div>
                    </div>
                </div>
                <div className="related">
                    <h4>You may also like:</h4>
                    <div className="container">
                        <div className="row">
                            {newArray.map(item => (
                                <div className="col" key={item?._id}>
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img className="card-img-top" src={`${path}${item?.image}`} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{item?.name}</h5>
                                            <p className="card-text">Price: {item?.price}</p>
                                            <p className="card-text">Category: {item?.category_id?.name}</p>
                                            <p className="card-text" dangerouslySetInnerHTML={{ __html: item?.description }}></p>
                                            <Link to={`/view/${item?._id}`} className="btn btn-primary">Go somewhere</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>

        </div>


    );
};

export default ViewProduct;