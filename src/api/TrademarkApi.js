import axiosClient from "./axiosClient";
const URl="/api/v1/Trademark/"


const TrademarkApi = {
    get: () => axiosClient.get(URl),
    put: (_id,data,config) => axiosClient.put(URl+_id, data,config),
    post: (data,config) =>axiosClient.post(URl, data,config),
    delete: (_id) => axiosClient.delete(URl+_id)
};


export default TrademarkApi