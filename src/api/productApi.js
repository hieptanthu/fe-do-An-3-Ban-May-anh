import axiosClient from "./axiosClient";
const URl="/api/v1/Product/"


//  { Name, categoryId, TrademarkId, PriceMin, PriceMax ,ListProduct} get

const productApi = {
    
    get: (data) =>  axiosClient.post(URl+"find" , data),
    getById: (id) =>  axiosClient.post(URl+id),
    put: (data) => axiosClient.put(URl+data._id, data),
    post: (data) => axiosClient.post(URl, data),
    delete: (_id) => axiosClient.delete(URl+_id)
};


export default productApi