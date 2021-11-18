import axios from "axios";

const setAuthToken = token => {
    if(token) {
        // because in post man, In headers we set x-auth-token as a variable to carry the auth token
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-auth-token"]
    }
}

export default setAuthToken;