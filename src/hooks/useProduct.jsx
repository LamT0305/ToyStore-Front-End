import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { GET_API, POST_API, UPDATE_API, DELETE_API } from "../utils/api";
import { SET_LOADING, GET_TOYS, HANDLE_DELETE, GET_TOTALPAGES, GET_TOYID } from "../store/ProductSlice";

const useProduct = () => {
    const { isLoading, toys, totalPages, toy } = useSelector(state => state.toys)
    const dispatch = useDispatch();

    const handleGetToys = async (page) => {
        dispatch(SET_LOADING(true));
        try {
            const response = await axiosInstance.get(GET_API({ page: page }).getToys)
            if (response.data.status === "success") {
                dispatch(GET_TOYS(response.data.toys.results));
                dispatch(GET_TOTALPAGES(response.data.toys.totalPages));
            }
            dispatch(SET_LOADING(false));
        } catch (e) {
            console.log(e)
            dispatch(SET_LOADING(false))
        }
    }

    const handleCreateToy = async (form) => {
        dispatch(SET_LOADING(true));
        try {
            const response = await axiosInstance.post(POST_API().createToy, form, {
                headers: { "Content-type": "multipart/form-data" }
            });

            if (response.data.status === "success") {
                alert("Toy created successfully");
            } else if (response.data.status === "error") {
                alert(response.data.message);
            }
            dispatch(SET_LOADING(false));
        } catch (e) {
            console.log(e)
            dispatch(SET_LOADING(false));
        }
    }

    const handleDeleteToy = async (id) => {
        dispatch(SET_LOADING(true));
        try {
            const response = await axiosInstance.delete(DELETE_API(id).deleteToy)
            if (response.data.status === "success") {
                // alert("Toy deleted successfully");
                dispatch(HANDLE_DELETE(id));
            }
            dispatch(SET_LOADING(false))
        } catch (e) {
            console.log(e)
            dispatch(SET_LOADING(false));
        }
    }

    const handleGetproductById = async (id) => {
        dispatch(SET_LOADING(true));
        try {
            const response = await axiosInstance.get(GET_API({id:id}).getToyByID)
            if (response.data.status === "success") {
                dispatch(GET_TOYID(response.data.toy))
                // console.log(response.data)
            }
            dispatch(SET_LOADING(false));
        } catch (e) {
            dispatch(SET_LOADING(false));
            console.log(e)
        }
    }

    const handleUpdateProduct = async (id, form) => {
        dispatch(SET_LOADING(true))
        try {
            const response = await axiosInstance.put(UPDATE_API(id).updateToy, form)
            if (response.data.status === "success") {
                alert("Updated product successfully")
            }
            dispatch(SET_LOADING(false))
        } catch (e) {
            console.log(e)
            dispatch(SET_LOADING(false))
        }
    }
    return {
        isLoading,
        toys,
        toy,
        totalPages,
        handleGetToys,
        handleCreateToy,
        handleDeleteToy,
        handleGetproductById,
        handleUpdateProduct
    }
}

export default useProduct