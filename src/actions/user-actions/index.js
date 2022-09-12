import {readLS} from "../../shared/LS";
import {handleError} from "../../shared/handleError";
import apiClient from "../../shared/apiClient";

export const userLoggedIN = () => dispatch => {
    apiClient(`getUser/${readLS('id')}`).then(r => dispatch(LoggedIN(r.data))).catch(e => console.log(handleError(e)))
}

const LoggedIN = data => ({'type': 'USER_LOGGED_IN', payload: data})