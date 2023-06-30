import axios from "axios";

 const axiosInstance = axios.create({
   baseURL: "http://localhost:8000",
   withCredentials: true,
   headers: {
     "X-Requested-With": "XMLHttpRequest",
    //  "X-XSRF-TOKEN": getCsrfToken(), 
   },
 });

export default axiosInstance;