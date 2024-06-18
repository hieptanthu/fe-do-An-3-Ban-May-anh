
import axiosClient from "./axiosClient";


const authApi = {
    Signup: (params) => axiosClient.post('/api/v1/user/signup', params),
    Login: (params) => axiosClient.post('/api/v1/user/login', params),
    veryToken: (params) => axiosClient.post('/api/v1/user/veryToken', params),
    verifyTokenAdmin: (params) => axiosClient.post('/api/v1/user/verifyTokenAdmin', params),
    get: (ListId) => axiosClient.post('/api/v1/user/find', ListId),

    
};


export default authApi