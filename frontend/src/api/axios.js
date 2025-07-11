import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // Your backend URL
});
export const login = async(username, password)=>{
    const response = await axios.post('http://localhost:8080/login',{
        username,
        password
    });
    return response;
};
export const register = async(username, password)=>{
    const response = await axios.post('http://localhost:8080/register',{
        username,
        password
    });
    return response;
};
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;