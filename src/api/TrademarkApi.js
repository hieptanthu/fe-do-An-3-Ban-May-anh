import axiosClient from "./axiosClient";
const URl="/api/v1/Trademark/"


const TrademarkApi = {
    get: () => axiosClient.get(URl),
    put: (params) => axiosClient.put(URl+params._id, params),
    post: (params) => axiosClient.post(URl, params),
    delete: (_id) => axiosClient.delete(URl+_id)
};


export default TrademarkApi