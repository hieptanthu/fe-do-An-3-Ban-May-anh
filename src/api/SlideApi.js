
import axiosClient from "./axiosClient";
const URl="/api/v1/Silde/"


const SlideApi = {
    get: () => axiosClient.get(URl),
    put: (_id,data,config) => axiosClient.put(URl+_id, data,config),
    post: (params) => axiosClient.post(URl, params),
    delete: (_id) => axiosClient.delete(URl+_id)
};


export default SlideApi