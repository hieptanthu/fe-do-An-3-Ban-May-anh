import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { config } from 'process'
import queryString from 'query-string'



const baseUrl = 'http://localhost:5000/'

const getToken=()=>localStorage.getItem('token')

const axiosClient =axios.create({
    baseURL:baseUrl,
    paramsSerializer:params=>queryString.stringify({params})
})

axiosClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    };
});


axiosClient.interceptors.response.use(response=>{
    if(response && response) return response.data
},err=>{
    if(!err.response){
        console.log(err.message=='Network Error')

        return alert(err)
    }
    throw err.response
})



export default axiosClient
