import axios from "axios";

const ENDPOINT_URL = 'https://toy-store-server-api.onrender.com/api/';


const axiosInstance = axios.create({
    baseURL: ENDPOINT_URL,
    headers: {
        "Content-type": "application/json",
      },
})


export default axiosInstance;