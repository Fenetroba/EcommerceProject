import axios from "axios";

const axiosInstance = axios.create({
  baseURL:import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true,
});

export default axiosInstance;
// import axios from 'axios'

// // Set config defaults when creating the instance
// const axiosInstance = axios.create({
//   baseURL: 'https://api.example.com'
// });

// // Alter defaults after instance has been created
// axiosInstance.defaults.headers.common['token'] = process.env.REACT_APP_SITE_TOKEN;

// export default axiosInstance;