import axiosInstance from "../utils/axios";
import { GET_API, POST_API, UPDATE_API, DELETE_API } from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { GET_CARTITEMS, HANDLE_DELETEITEM, HANDLE_UPDATECART, SET_LOADING } from "../store/CartSlice"
import { useNavigate } from "react-router-dom";

const useCart = () => {
    const { isLoading, items } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
            } else if (response.data.error === "User is not authorized") {
                alert("Expired session, log in again");
                navigate("/login");
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
                //
            }
        } catch (e) {
            dispatch(SET_LOADING(false))
            console.log(e)
        }
    }

    const handleRemoveItem = async (id) => {
        dispatch(SET_LOADING(true))
        try {
            const response = await axiosInstance.delete(DELETE_API(id).deleteCartItem, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken")
                }
            })
            if (response.data.status === "success") {
                dispatch(HANDLE_DELETEITEM(id));
            }
            console.log(response)
            dispatch(SET_LOADING(false))
        } catch (e) {
            console.log(e)
            dispatch(SET_LOADING(false))
        }
    }

    const handleUpdateItem = async (form, toy_id) => {
        dispatch(SET_LOADING(true))
        try {
            const body = {
                quantity: form.get("quantity"),
            }
            const response = await axiosInstance.put(UPDATE_API(toy_id).updateCart, body, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken")
                }
            })
            console.log(response)
            if (response.data.status === "success") {
                dispatch(HANDLE_UPDATECART(form))
            }
        } catch (e) {
            console.log(e)
            dispatch(SET_LOADING(false))
        }
    }
    return {
        handleGetCartItems,
        isLoading,
        items,
        handleAddToCart,
        handleRemoveItem,
        handleUpdateItem
    }
}

export default useCart