import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { GET_API, POST_API, UPDATE_API, DELETE_API } from "../utils/api";
import { SET_LOADING, GET_CATEGORY, HANDLE_DELETE, CREATE_CATEGORY, UPDATE_CATEGORY } from "../store/CategorySlice"

const useCategory = () => {

    const { isLoading, category } = useSelector(state => state.category)
    const dispatch = useDispatch();

    const handleGetCategory = async () => {
        dispatch(SET_LOADING(true))
        try {
            const response = await axiosInstance.get(GET_API({}).getCategory)

            if (response.data.status === "success") {
                dispatch(GET_CATEGORY(response.data.category))
            }
            dispatch(SET_LOADING(false))
        } catch (error) {
            dispatch(SET_LOADING(false))
            console.log(error)
        }

    }

    const handleCreateCategory = async (name) => {
        dispatch(SET_LOADING(true))
        try {
            const response = await axiosInstance.post(POST_API().createCategory, name)

            if (response.data.status === "success") {
                alert("Created category successfully")
                const array = {
                    _id: response.data.category._id,
                    name: response.data.category.name
                }
                dispatch(CREATE_CATEGORY([array]))
            } else if (response.data.error) {
                alert(response.data.message)
            }
            dispatch(SET_LOADING(false))
        } catch (e) {
            console.log(e)
            dispatch(SET_LOADING(false))
        }
    }

    const handleDeleteCategory = async (id) => {
        dispatch(SET_LOADING(true))
        try {
            const response = await axiosInstance.delete(DELETE_API(id).deleteCategory)

            if (response.data.status === "success") {
                dispatch(HANDLE_DELETE(id))

            }
            dispatch(SET_LOADING(false))
        } catch (e) {
            console.log(e)
            dispatch(SET_LOADING(false))
        }
    }

    const handleUpdateCategory = async (id, form) => {
        dispatch(SET_LOADING(true))
        try {
            const response = await axiosInstance.put(UPDATE_API(id).updateCategory, form)
            if (response.data.status === "success") {
                // alert("Updated category successfully")
                dispatch(UPDATE_CATEGORY({ id: id, form: form }))
            }
            dispatch(SET_LOADING(false))
        } catch (e) {
            console.log(e)
            dispatch(SET_LOADING(false))
        }
    }
    return {
        isLoading,
        category,
        handleGetCategory,
        handleCreateCategory,
        handleDeleteCategory,
        handleUpdateCategory
    }
}

export default useCategory;