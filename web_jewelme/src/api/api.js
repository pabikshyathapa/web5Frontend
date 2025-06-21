import axios from "axios"

const API_UR= import.meta.env.VITE_API_BASE_URL ||
"http://localhost:5050/api" //fallback
 const instance=axios.create(
    {
        baseURL : API_UR,
        headers:{
            "Content-Type":"application/json"
        }
    }
 )
 export default instance