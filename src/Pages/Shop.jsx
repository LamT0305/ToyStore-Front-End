import React, { useEffect, useState } from 'react';
import useProduct from '../hooks/useProduct';
import { Link } from 'react-router-dom';
import useCategory from '../hooks/useCategory';
import Loading from '../components/Loading';
import searchIcon from "../assets/images/search.png"

const path = "http://localhost:5001/uploads/"

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
                <div className="products" style={{ display: 'flex' }}>
                    <div className="" style={{ width: '25%' }}>
                        <div className="mb-8">
                            <label htmlFor="search-inp" className="text-xl font-bold mb-2">Search</label>
                            <div className=" flex items-center w-3/4 justify-center relative m-auto">
                                <input
                                    type="text"
                                    name="search"
                                    id="search-inp"
                                    placeholder="Search..."
                                    className=" rounded-full w-full py-2 px-4 border border-gray-300 "
                                />
                                <img src={searchIcon} alt="" className="h-6 w-6 ml-2" style={{position:'absolute', right:10}}/>
                            </div>
                        </div>
                        <div className="border-r border-gray-300">
                            <h3 className="text-xl font-bold mb-4">Category:</h3>
                            <div className="mb-2">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="option"
                                    id="all"
                                    value="all"
                                    checked={selection === "all"}
                                    onChange={(e) => {
                                        setSelection(e.target.value);
                                        console.log(e.target.value);
                                    }}
                                    style={{ width: '15%' }}
                                />
                                <label className="label-radio" htmlFor="all">
                                    All
                                </label>
                            </div>
                            {categories.map((item) => (
                                <div key={item?._id} className="mb-2">
                                    <input
                                        id={item?._id}
                                        className="mr-2"
                                        type="radio"
                                        name="option"
                                        value={item?._id}
                                        checked={selection === item?._id}
                                        onChange={(e) => {
                                            setSelection(e.target.value);
                                            console.log(e.target.value);
                                        }}
                                        style={{ width: '15%' }}

                                    />
                                    <label className="label-radio" htmlFor={item?._id}>
                                        {item?.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="" style={{ width: '75%' }}>
                        <div className="pb-5"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <h3 className="text-xl font-bold">Our products:</h3>
                            <div className="flex"
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <button onClick={handlePrePageChange} className="px-2 py-1 bg-blue-500 text-black rounded-l-lg">
                                    {"<<"}
                                </button>
                                <p style={{
                                    width: '50px', display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 0
                                }}
                                >{page}</p>
                                <button onClick={handleNextPageChange} className="px-2 py-1 bg-blue-500 text-black rounded-r-lg">
                                    {">>"}
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            {toys.map((item) => (
                                <div className="col-xl-4 col-lg-6 col-sm-12 mb-5" key={item?._id}>
                                    <div className="card shadow-lg" style={{ width: '18rem' }}>
                                        <img className="card-img-top" src={`${path}${item?.image}`} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title font-bold">{item?.name}</h5>
                                            <p className="card-text">Price: ${item?.price}</p>
                                            <p className="card-text">Category: {item?.category_id?.name}</p>
                                            <p className="card-text description" dangerouslySetInnerHTML={{ __html: item?.description }}></p>
                                            <Link
                                                to={`/view/${item?._id}`}
                                                className="btn btn-primary"
                                                style={{
                                                    backgroundColor: "#e1d2be",
                                                    borderColor: 'white',
                                                    width: 'fit-content',
                                                    marginLeft: 'auto',
                                                    marginBottom: 'auto',
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


            )
            }
        </div >
    );
};

export default Shop;