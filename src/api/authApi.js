
import axiosClient from "./axiosClient";


const authApi = {
    Signup: (params) => axiosClient.post('/api/v1/user/signup', params),
    Login: (params) => axiosClient.post('/api/v1/user/login', params),
    veryToken: (params) => axiosClient.post('/api/v1/user/veryToken', params)
};


export default authApi