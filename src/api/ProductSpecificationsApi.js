import axiosClient from "./axiosClient";
const URl="/api/v1/ProductSpecifications/"


//  { Name, categoryId, TrademarkId, PriceMin, PriceMax ,ListProduct} get

const ProductSpecificationsApi = {
    
    get: (ProductId) =>  axiosClient.get(URl+ProductId ),
    post: (data) => axiosClient.post(URl, data),
    put: (_id,data) => axiosClient.put(URl+_id, data),
    delete: (_id) => axiosClient.delete(URl+_id)
};


export default ProductSpecificationsApi