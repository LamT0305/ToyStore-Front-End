import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { GET_API, POST_API, UPDATE_API, DELETE_API } from "../utils/api";
import { LOADING, LOGOUT, SET_ROLE, SET_USER, SET_AUTHENTICATION } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";


const useAuth = () => {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated, user, role } = useSelector(state => state.Auth);

    const dispatch = useDispatch();

    const handleLogin = async (form) => {
        dispatch(LOADING(true));
        try {
            const response = await axiosInstance.post(POST_API().login, form)

            if (response.data.status === 'success') {
                sessionStorage.setItem("accessToken", response.data.accessToken);
                sessionStorage.setItem("isAuthenticated", true)
                navigate("/")
            }

            dispatch(LOADING(false))
        } catch (e) {
            dispatch(LOADING(false))
            console.log(e)
        }
    }

    const handleGetCurrentUser = async () => {
        dispatch(LOADING(true));
        try {

            const response = await axiosInstance.get(GET_API().getUser,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                    }
                })
            if (response.data.status === "success") {
                dispatch(SET_USER(response.data.user))
            }

            dispatch(LOADING(false))
        } catch (e) {
            dispatch(LOADING(false))
            console.log(e)
        }
    }


    return {
        isLoading,
        isAuthenticated,
        user,
        role,
        handleLogin,
        handleGetCurrentUser
    }
}

export default useAuth