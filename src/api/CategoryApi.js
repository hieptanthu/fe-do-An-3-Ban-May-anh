
import axiosClient from "./axiosClient";


const CategoryApi = {
    get: () => axiosClient.get('/api/v1/category/'),
    getById: (categoryId) => axiosClient.post('/api/v1/category/ById',{categoryId}),
    put: (params) => axiosClient.put('/api/v1/category/', params),
    post: (params) => axiosClient.post('/api/v1/category/', params),
    delete: (_id) => axiosClient.delete('/api/v1/category/'+_id)
};


export default CategoryApi