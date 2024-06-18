import axiosClient from "./axiosClient";
const URl="/api/v1/Product/"


//  { Name, categoryId, TrademarkId, PriceMin, PriceMax ,ListProduct} get

const productApi = {
    
    get: (data) =>  axiosClient.post(URl+"find" , data),
    getById: (id) =>  axiosClient.get(URl+id),
    put: (_id,data,config) => axiosClient.put(URl+_id, data,config),
    post: (data,config) => axiosClient.post(URl, data,config),
    delete: (_id) => axiosClient.delete(URl+_id)
};


export default productApi