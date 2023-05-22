import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axios";
import { GET_API, POST_API, UPDATE_API, DELETE_API } from "../utils/api";
import { LOADING, LOGOUT, SET_ROLE, SET_USER } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { setSession } from "../utils/jwt"

const useAuth = () => {
    const navigate = useNavigate();
    const { isLoading, user, role } = useSelector(state => state.Auth);

    const dispatch = useDispatch();

    const handleLogin = async (form) => {
        dispatch(LOADING(true));
        try {
            const response = await axiosInstance.post(POST_API().login, form)

            if (response.data.status === 'success') {
                setSession(response.data.accessToken);
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
            } else if (response.data.error === "User is not authorized") {
                alert("Your login has been cancelled, please re-login and try again")
                navigate('/login');
                sessionStorage.removeItem("isAuthenticated");
                sessionStorage.removeItem("accessToken");
            }
            console.log()
            dispatch(LOADING(false))
        } catch (e) {
            dispatch(LOADING(false))
            console.log(e)
        }
    }

    const handleLogout = async () => {
        dispatch(LOADING(true));

        try {
            dispatch(LOGOUT());
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("isAuthenticated");
            sessionStorage.removeItem("role");

            navigate("/");
        } catch (e) {
            dispatch(LOADING(false));
            console.log(e)
        }
    }

    const handleRegister = async (form) => {
        dispatch(LOADING(true));
        try {
            const response = await axiosInstance.post(POST_API().registerUser, form);

            if (response.data.status === "success") {
                alert("Register successfully registered")
            }
        } catch (e) {
            dispatch(LOADING(false));
            console.log(e)
        }
    }


    return {
        isLoading,
        user,
        role,
        handleLogin,
        handleGetCurrentUser,
        handleLogout,
        handleRegister
    }
}

export default useAuth