import React, { useState, useEffect } from 'react';
import useProduct from '../../hooks/useProduct';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';


const baseURL = 'https://toy-store-server-api.onrender.com/uploads/';

const Products = () => {
    const { handleDeleteToy, handleGetToys, toys, totalPages } = useProduct();
    const [page, setPage] = useState(1);
    useEffect(() => {
        handleGetToys(page);
    }, [page])
    const handleDel = (id) => {
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to delete",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => handleDeleteToy(id)
                },
                {
                    label: "No",
                }
            ]

        })
    }
    const handlePrePageChange = () => {
        if (page <= 1) {
            setPage(1)
        } else {
            setPage(page - 1)
        }

    }

    const handleNextPageChange = () => {
        if(page < totalPages){
            setPage(page + 1)
        }
    }
    return (
        <div className="table-responsive">
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
            <table className="table table-striped
                table-hover	
                table-borderless
                table-primary
                align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {toys.map(item => (
                        <tr className="table-primary" key={item?._id}>
                            <td scope='row'>{item?.name}</td>
                            <td>{item?.category_id?.name}</td>
                            <td>{item?.price}</td>
                            <td><p
                                className='description'
                                style={{ WebkitLineClamp: 1 }}
                                dangerouslySetInnerHTML={{ __html: item?.description }}
                            ></p></td>
                            <td>
                                <img src={`${baseURL}${item?.image}`} alt="image toy" width={'200px'} height={'150px'} />
                            </td>
                            <td>
                                <div className="flex justify-evenly">
                                    <button className=' bg-green-600 text-white'>
                                        <Link className='text-white' to={`/admin/create/${item?._id}`}>
                                            Edit
                                        </Link>
                                    </button>
                                    <button
                                        className=' bg-red-600 text-white'
                                        onClick={() => handleDel(item?._id)}
                                    >Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}


                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div>
    );
};

export default Products;