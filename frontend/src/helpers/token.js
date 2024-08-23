import axios from "axios"



const setToken = () => {
    const token = localStorage.getItem('token')

    if(token){
        axios.defaults.headers.common["access-token"] = token
    }else{
        delete axios.defaults.headers.common["access-token"]
    }
}

export default setToken