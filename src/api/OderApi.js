import axiosClient from "./axiosClient";
const URl="/api/v1/Oder/"


//  { Name, categoryId, TrademarkId, PriceMin, PriceMax ,ListProduct} get

const OderApi = {
    
    get: (data) =>  axiosClient.post(URl+"/find" , data),
    getQuantity: () =>  axiosClient.get(URl+"Quantity"),
    getById: (id) =>  axiosClient.get(URl+id),
    put: (_id,Status) => axiosClient.put(URl+_id, {Status}),
    post: (data) => axiosClient.post(URl, data)
};


export default OderApi