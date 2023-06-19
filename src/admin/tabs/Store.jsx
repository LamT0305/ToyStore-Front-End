import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import useStore from '../../hooks/useStore';
import useInventory from '../../hooks/useInventory';
const Store = () => {
    const { handleGetStore, store } = useStore();
    const { inventories, handleGetInventoriesByStore, handleUpdateQuantity } = useInventory();
    const [page, setPage] = useState(1);
    const [updateState, setUpdateState] = useState(-1);

    let selected = store[0]?._id;

    const handleChangeSeletion = (e) => {
        selected = e.value
        handleGetInventoriesByStore(selected)
    }

    useEffect(() => {
        handleGetStore(page)
    }, [page])

    useEffect(() => {
        if (selected) {
            handleGetInventoriesByStore(selected)
        }
    }, [selected])
    const options = store.map(i => ({
        value: i._id,
        label: i.name
    }))


    const handleChangeQuantity = (id, quantity) => {
        handleUpdateQuantity(id, quantity);
    };

    return (
        <div>
            <div className="flex flex-row items-center">
                <h4 className="mx-2">Store:</h4>
                <Dropdown value={selected} onChange={(e) => handleChangeSeletion(e)} options={options} />
            </div>

            <div className="table-responsive">
                <table className="table table-primary">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Toy's name</th>
                            <th scope="col">Quantity</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventories.map((item) => (
                            updateState === item?._id ? <Edit key={item?._id} current={item} setUpdate={setUpdateState} /> :
                                <tr className="" key={item?._id}>
                                    <td scope="row">{item?._id}</td>
                                    <td>{item?.toy_id?.name}</td>
                                    <td>
                                        {item?.quantity_available}
                                    </td>
                                    <td>
                                        <button onClick={() => setUpdateState(item?._id)}>Update</button>
                                    </td>
                                </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default Store;


function Edit({ current, setUpdate }) {
    // const { handleUpdateCategory } = useCategory();
    const [quantity, setQuantity] = useState(current?.quantity_available)
    const { handleUpdateQuantity } = useInventory()
    const handleUpdate = () => {
        
        handleUpdateQuantity(current?._id, quantity);
        setUpdate(-1);
    }

    const addQuantity = () => {
        setQuantity(quantity + 1);
    }
    const removeQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }
    return (
        <>
            <tr className="" key={current?._id}>
                <td scope="row">{current?._id}</td>
                <td>{current?.toy_id?.name}</td>
                <td>
                    <button className="mx-3" onClick={removeQuantity}>{"-"}</button>
                    {quantity}
                    <button className="mx-3" onClick={addQuantity}>{"+"}</button>
                </td>
                <td>
                    <button onClick={handleUpdate}>Update</button>
                </td>
            </tr>
        </>
    )
}