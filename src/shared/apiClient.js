import axios from 'axios'
// import {ConfigureStore} from "../Redux/Store";
import { createBrowserHistory } from "history"
import {readLS, removeLS} from "./LS";
import {handleError} from "./handleError";
import {openNotificationWithIcon} from "./notification";

// const store = ConfigureStore()
let history = createBrowserHistory()

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // baseURL: "http://api.dev.com/eagle-studio-api/public/api",
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
});

apiClient.interceptors.request.use(function(config){
    config.headers.Authorization =  `Bearer ${(readLS('findMeToken') !== undefined && readLS('findMeToken') !=null && readLS('findMeToken') !== '') ? readLS('findMeToken') : ''}`;
    return config
}, function (error){
    console.log(handleError(error))
    console.log(error)
})

apiClient.interceptors.response.use(response => {
    return response
}, error => {
        if (error.response.status === 401) {
            removeLS('findMeToken')
            // history.push('/login')
            // window.location.reload()
            openNotificationWithIcon("error", "Please Login")
            return Promise.resolve()
        }
    return Promise.reject(error)
});

export default apiClient
