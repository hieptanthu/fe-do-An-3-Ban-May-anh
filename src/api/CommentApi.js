import axiosClient from "./axiosClient";
const URl="/api/v1/Comment/"



const CommentApi = {
    
    get: (ProductId) =>  axiosClient.get(URl+ProductId ),
    post: (ProductId,data,config) => axiosClient.post(URl+ProductId, data,config),
    put: (_id,data) => axiosClient.put(URl+_id, data),
    delete: (_id) => axiosClient.delete(URl+_id)
};


export default CommentApi