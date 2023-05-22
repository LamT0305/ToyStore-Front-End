import React, { useEffect, useState } from 'react';
import useProduct from '../hooks/useProduct';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';
import Loading from '../components/Loading';

const path = "http://127.0.0.1:5001/uploads/"

const Shop = () => {
    const { isLoading, totalPages, toys, handleGetToys } = useProduct();
    const { category, handleGetCategory } = useCategory();
    const [page, setPage] = useState(1);
    const [selection, setSelection] = useState('all');
    useEffect(() => {
        handleGetToys(page)
        handleGetCategory();
    }, [page])

    const handleOptionChange = (event) => {
        setSelection(event.target.value)
        console.log(selection)
    }

    const categories = category.map(item => ({
        _id: item._id,
        name: item.name
    }))

    const handlePrePageChange = () => {
        if (page <= 1) {
            setPage(1)
        } else {
            setPage(page - 1)
        }

    }

    const handleNextPageChange = () => {
        if (page >= totalPages) {
            setPage(totalPages)
        } else {
            setPage(page + 1)
        }
    }
    return (
        <div className='inner-page'>
            {isLoading ? <Loading /> : (
                <div className="products"
                    style={{
                        display: 'flex',
                        width: '85%',
                        margin: '50px auto',
                        border: '1px solid',
                        borderRadius: 15
                    }}>
                    <div className="category" style={{ width: '15%', borderRight: '1px solid', padding: 20 }}>
                        <h3>Category:</h3>
                        <div className="radio-btn">
                            <input
                                className='rd-btn'
                                type="radio"
                                name="option"
                                id="all"
                                value="all"
                                checked={selection === "all"}
                                onChange={e => {
                                    setSelection(e.target.value)
                                    console.log(e.target.value)
                                }}
                            />
                            <label className='label-radio' htmlFor='all'>
                                All
                            </label>

                        </div>

                        {categories.map(item => (
                            <div key={item?._id} className='radio-btn'>
                                <input
                                    id={item?._id}
                                    className='rd-btn'
                                    type="radio"
                                    name="option"
                                    value={item?._id}
                                    checked={selection === item?._id}
                                    onChange={e => {
                                        setSelection(e.target.value)
                                        console.log(e.target.value)
                                    }}
                                />
                                <label className='label-radio' htmlFor={item?._id}>

                                    {item?.name}
                                </label>

                            </div>
                        ))}
                    </div>
                    <div className="container" style={{ padding: 20 }}>
                        <div className="header"
                            style={{
                                borderBottom: '1px solid',
                                paddingBottom: 15,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                            <h3 >Our products: </h3>
                            <div className="paginate">
                                <button onClick={handlePrePageChange}>{"<<"}</button>
                                <input type="number" value={page} onChange={e => setPage(e.target.value)} style={{margin:0}}/>
                                <button onClick={handleNextPageChange}>{">>"}</button>
                            </div>

                        </div>
                        <div className="row">
                            {toys.map(item => (
                                <div className="col" key={item?._id} style={{ margin: '25px 0' }}>
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img className="card-img-top" src={`${path}${item?.image}`} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{item?.name}</h5>
                                            <p className="card-text">Price: ${item?.price}</p>
                                            <p className="card-text">Category: {item?.category_id?.name}</p>
                                            <p className="card-text" dangerouslySetInnerHTML={{ __html: item?.description }}></p>
                                            <Link
                                                to={`/view/${item?._id}`}
                                                className="btn btn-primary"
                                                style={{
                                                    margin: 0,
                                                    backgroundColor: "#e1d2be",
                                                    borderColor: 'white',
                                                    width: 'fit-content',
                                                    marginLeft: 'auto'
                                                }}
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;