import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { GET_API, POST_API, UPDATE_API, DELETE_API } from "../utils/api";
import { GET_INVENTORY, UPDATE_INVENTORY } from "../store/InventorySlice"

const useInventory = () => {
    const { inventories } = useSelector(state => state.inventories)
    const dispatch = useDispatch();

    const handleGetInventoriesByStore = async (store_id) => {
        try {
            const response = await axiosInstance.get(GET_API({ store_id: store_id }).getInventoryByStore)
            if (response.data.status === "success") {
                dispatch(GET_INVENTORY(response.data.inventory));
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleUpdateQuantity = async (id, quantity) => {
        try {
            const formData = new FormData();
            formData.append("quantity", quantity)
            const response = await axiosInstance.put(UPDATE_API(id).updateInventory, formData);
            if (response.data.status === "success") {
                dispatch(UPDATE_INVENTORY({ id: id, quantity: quantity }))
            }

        } catch (e) {
            console.log(e)
        }
    }

    return {
        inventories,
        handleGetInventoriesByStore,
        handleUpdateQuantity
    }
}

export default useInventory