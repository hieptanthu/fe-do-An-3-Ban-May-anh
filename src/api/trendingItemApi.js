import axiosClient from "./axiosClient";
const URl="/api/v1/TrendingItem/"


// {"Name":"Hot Mua xuan",
//  "ListProduct":["665d805ce93af90ab78b33cc","665d80c482bd7f54a3a88889","665d82468ab6d6ccd0743224"]
// }

const trendingItemApi = {
    get: () => axiosClient.get(URl),
    put: (params) => axiosClient.put(URl+params._id, params),
    post: (params) => axiosClient.post(URl, params),
    delete: (_id) => axiosClient.delete(URl+_id)
};


export default trendingItemApi