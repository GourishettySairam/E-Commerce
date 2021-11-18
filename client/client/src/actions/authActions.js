import { SET_CURRENT_USER, SUCCESSFUL_REGISTER, FAILURE_REGISTER, ERRORS } from "./types";
import axios from "axios";

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    };
};

export const register = (userData) => dispatch =>  {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    try {
        const res = axios.post("localhost:5000/api/users", userData, config)
        dispatch({
            type: SUCCESSFUL_REGISTER,
            payload: res.data
        });
    } catch(err) {
        const error = err.response.data.errors;
        dispatch({
            type: FAILURE_REGISTER,
            payload: error
        })
    }
}
