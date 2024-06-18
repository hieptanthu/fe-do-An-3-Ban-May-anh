import axiosClient from "./axiosClient";
const URl="/api/v1/Blog/"


const BlogApi = {
    get: (data) => axiosClient.post(URl+"find",data),
    getById: (_id) => axiosClient.get(URl+_id),
    put: (_id,data) => axiosClient.put(URl+_id, data),
    post: (data) =>axiosClient.post(URl, data),
    delete: (_id) => axiosClient.delete(URl+_id)
};


export default BlogApi