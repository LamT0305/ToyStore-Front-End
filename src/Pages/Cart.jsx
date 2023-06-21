import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const path = "https://toy-store-server-api.onrender.com/uploads/"
const Cart = () => {
    const isAuthenticated_ = sessionStorage.getItem("isAuthenticated")
    const { handleGetCartItems, items, handleRemoveItem } = useCart();
    const [updateState, setUpdateState] = useState(-1);

    useEffect(() => {
        handleGetCartItems()
    }, [])
    // console.log(items)

    const handleDelete = (id) => {
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to delete",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => handleRemoveItem(id)
                },
                {
                    label: "No",
                }
            ]

        })
        // console.log(id)
    }
    return (
        <div className='inner-page'>
            {isAuthenticated_ ? (
                <>
                    <section className="h-100" style={{ backgroundColor: "#eee" }}>
                        <div className="container h-100 py-5">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-10">

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>

                                    </div>


                                    {items.length === 0 ? "No item in your cart!" : <div className="table-responsive">
                                        <table className="table table-primary">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item) => (
                                                    updateState === item?._id ? <Edit key={item?._id} current={item} setUpdate={setUpdateState} /> :
                                                        <tr className=" " key={item._id}>
                                                            <td scope="row" ><img src={`${path}${item.toy_id?.image}`} alt="" style={{ objectFit: 'cover', width: 300, height: 200 }} /></td>
                                                            <td >{item.toy_id?.name}</td>
                                                            <td><p>quantity: {item.quantity}</p></td>
                                                            <td>
                                                                <div className=" flex flex-row justify-evenly items-center">
                                                                    <button onClick={() => { handleDelete(item.toy_id._id) }}>Delete</button>
                                                                    <button onClick={() => setUpdateState(item._id)}>Edit</button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>}





                                    {/* <div className="card mb-4">
                                        <div className="card-body p-4 d-flex flex-row">
                                            <div className="form-outline flex-fill">
                                                <input type="text" id="form1" className="form-control form-control-lg" />
                                                <label className="form-label" for="form1">Discound code</label>
                                            </div>
                                            <button type="button" className="btn btn-outline-warning btn-lg ms-3">Apply</button>
                                        </div>
                                    </div> */}

                                    <div className="card">
                                        <div className="card-body">
                                            <button type="button" className="btn btn-warning btn-block btn-lg">
                                                <Link to={"/order"} style={{ color: 'black' }}>
                                                    Proceed to Pay
                                                </Link>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <p>Please Log in first !</p>
                </>
            )}
        </div>
    );
};

export default Cart;



function Edit({ current, setUpdate }) {

    const [quantity, setQuantity] = useState(current?.quantity)
    const { handleUpdateItem } = useCart();
    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("id", current._id)
        formData.append("quantity", quantity)
        // formData.append("name", name);
        // handleUpdateCategory(current?._id, formData);
        handleUpdateItem(formData, current.toy_id._id)
        setUpdate(-1);
    }
    return (
        <tr className=" ">
            <td scope="row" ><img src={`${path}${current.toy_id?.image}`} alt="" style={{ objectFit: 'cover', width: 300, height: 200 }} /></td>
            <td >{current.toy_id?.name}</td>
            <td>
                <div className=" flex flex-row items-center">
                    <button onClick={() => {
                        if (quantity > 0) {
                            setQuantity(quantity - 1)
                        }
                    }
                    }>{"-"}</button>
                    <p className=' mx-2'>{quantity}</p>
                    <button onClick={() => {
                        setQuantity(quantity + 1)
                    }}>{"+"}</button>
                </div>
            </td>
            <td>
                <button onClick={handleUpdate}>Update</button>
            </td>
        </tr>
    )
}