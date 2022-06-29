import axios from "axios";

export const api = ({dispatch}) => (next) => (action) =>{

    if(action.type !== 'api/apiCall'){
        next(action)
        return
    }
    const {url, method, data, onSuccess, onFail} = action.payload
    axios({
        baseURL: 'http://localhost:3001/api/',
        url,
        method,
        data,
    }).then(response=>{
        dispatch({
            type: onSuccess,
            payload: response.data
        })
    }).catch(response=>{
            dispatch({
                type: onFail,
                payload: response.data
            })
        }
    )
    next(action)
}