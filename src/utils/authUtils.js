import authApi from "../api/authApi";


const authUtils={
    isAuthenticated:async ()=>{
        
        const token = localStorage.getItem('token')
        
        if(!token) return false
        try{
            const res =await authApi.veryToken({token})
            if(res){
                return res
            }
            else{
                return res
            }
            
        } catch (error) {
            console.error(error);
            throw new Error('There was a problem verifying your token');
          }
    },

    isAuthenticatedAdmin:async ()=>{
        
        const token = localStorage.getItem('token')
        
        if(!token) return false
        try{
            const res =await authApi.verifyTokenAdmin({token})
            if(res){
                return res
            }
            else{
                return res
            }
            
        } catch (error) {
            console.error(error);
            throw new Error('There was a problem verifying your token');
          }
    }
}


export default authUtils