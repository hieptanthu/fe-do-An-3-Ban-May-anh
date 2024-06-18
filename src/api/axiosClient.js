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

    const updatedHeaders = {
        ...config.headers,
        "Authorization": `Bearer ${getToken()}`,
      };
    
      // Conditionally add the Content-Type header if it doesn't already exist
      if (!config.headers['Content-Type']) {
        updatedHeaders['Content-Type'] = 'application/json';
      }
    return {
        ...config,
        headers: {

            "Authorization": `Bearer ${getToken()}`,  
        }
    };
});


axiosClient.interceptors.response.use(response=>{
    if(response && response) return response.data
},err=>{
    if(!err.response){
        console.log(err.message=='Network Error')

        return alert(baseUrl)
    }
    throw err.response
})



export default axiosClient
