// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:3054",
// });

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = token;
//   }
//   return config;
// });

// export default instance;



import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3054",
});

// ✅ Automatically attach token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
