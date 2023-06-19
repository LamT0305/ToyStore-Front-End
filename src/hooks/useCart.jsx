import axiosInstance from "../utils/axios";
import { GET_API, POST_API, UPDATE_API, DELETE_API } from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { GET_CARTITEMS, HANDLE_ADD_ITEM, HANDLE_DELETEITEM, HANDLE_UPDATECART, SET_LOADING } from "../store/CartSlice"

const useCart = () => {
    const { isLoading, items } = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const handleGetCartItems = async () => {
        dispatch(SET_LOADING(true));
        try {
            const response = await axiosInstance.get(GET_API({}).getCart, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
                }
            })
            if (response.data.status === "success") {
                dispatch(GET_CARTITEMS(response.data.cart.items))
            }
        } catch (e) {
            dispatch(SET_LOADING(false))
            console.log(e)
        }
    }

    const handleAddToCart = async (form) => {
        dispatch(SET_LOADING(true));
        try {
            const response = await axiosInstance.post(POST_API().createCart, form, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
                }
            })
            if (response.data.status === "success") {
                dispatch(HANDLE_ADD_ITEM())
            }
        } catch (e) {
            dispatch(SET_LOADING(false))
            console.log(e)
        }
    }

    const handleRemoveItem = async (id) => {
        
    }
    return {
        handleGetCartItems,
        isLoading,
        items
    }
}

export default useCart