import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { GET_API, POST_API, UPDATE_API, DELETE_API } from "../utils/api";
import { SET_LOADING, GET_STORE, HANDLE_DELETE, CREATE_STORE, GET_TOTALPAGES, UPDATE_STORE } from "../store/StoreSlice"

const useStore = () => {
    const { isLoading, store, totalPages } = useSelector(state => state.store);
    const dispatch = useDispatch();

    const handleGetStore = async () => {
        dispatch(SET_LOADING(true));
        try {
            const response = await axiosInstance.get(GET_API({}).getStore)
            if (response.data.status === "success") {
                dispatch(GET_STORE(response.data.store.results));
                dispatch(GET_TOTALPAGES(response.data.store.totalPages));
            }
            dispatch(SET_LOADING(false));
        } catch (err) {
            dispatch(SET_LOADING(false))
            console.log(err)
        }
    }

    const handleCreateStore = async (form) => {
        dispatch(SET_LOADING(true));
        try {
            const response = await axiosInstance.post(POST_API().createStore, form);
            if (response.data.status === "success") {

                const storeObject = {
                    _id: response.data.store._id,
                    name: response.data.store.name,
                    city: response.data.store.city
                }

                dispatch(CREATE_STORE([storeObject]))

                // alert("Store created successfully")
            } else if (response.data.error) {
                alert("Store has been existing")
            }
            dispatch(SET_LOADING(false));

        } catch (e) {
            console.log(e)
            dispatch(SET_LOADING(false))
        }
    }

    const handleDeleteStore = async (id) => {
        dispatch(SET_LOADING(true));
        try {
            const response = await axiosInstance.delete(DELETE_API(id).deleteStore)
            if (response.data.status === "success") {
                dispatch(HANDLE_DELETE(id))
                // alert("Store deleted successfully")
            }
            dispatch(SET_LOADING(false))
        } catch (e) {
            dispatch(SET_LOADING(false))
            console.log(e)
        }
    }

    const handleUpdateStore = async (form, id) => {
        dispatch(SET_LOADING(true));
        try {
            const response = await axiosInstance.put(UPDATE_API(id).updateStore, form)
            if (response.data.status === "success") {
                // alert("Store updated successfully")
            }
            dispatch(UPDATE_STORE({ id: id, form: form }))
            dispatch(SET_LOADING(false))
        } catch (e) {
            dispatch(SET_LOADING(false))
            console.log(e)
        }
    }



    return {
        isLoading,
        store,
        totalPages,
        handleGetStore,
        handleCreateStore,
        handleDeleteStore,
        handleUpdateStore
    }
}

export default useStore;