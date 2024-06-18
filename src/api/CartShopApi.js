
import axiosClient from "./axiosClient";
const URl="/api/v1/CardShop/"

const CartShopApi = {
    get: (userId) => axiosClient.get(URl+userId),
        // post  {ProductId,QuanIity}
    post: (userId,ProductId,Quantity) => axiosClient.post(URl+userId,{ProductId,Quantity}),
    // put  [{_id,QuanIity}]
    put: (userId,items) => axiosClient.put(URl+userId,{items}),
    // delete ["_id ojb"]
    delete: (userId,items) => axiosClient.put(URl+"delete/"+userId,{items:items}),
};


export default CartShopApi