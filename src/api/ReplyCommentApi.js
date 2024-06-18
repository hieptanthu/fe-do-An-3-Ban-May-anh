import axiosClient from "./axiosClient";
const URl="/api/v1/ReplyComment/"



const ReplyCommentApi = {
    
    get: (_idComment) =>  axiosClient.get(URl+_idComment ),
    post: (_idComment,data,config) => axiosClient.post(URl+_idComment, data,config),
    put: (_id,data) => axiosClient.put(URl+_id, data),
    delete: (_id) => axiosClient.delete(URl+_id)
};


export default ReplyCommentApi