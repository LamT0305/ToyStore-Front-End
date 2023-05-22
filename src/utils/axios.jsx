import axios from "axios";

const ENDPOINT_URL = 'http://127.0.0.1:5001/api/';


const axiosInstance = axios.create({
    baseURL: ENDPOINT_URL,
    headers: {
        "Content-type": "application/json",
      },
})


export default axiosInstance;