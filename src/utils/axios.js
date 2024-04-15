import axios from "axios";

const baseURL = "http://localhost:9000";

const instance = axios.create({
    baseURL
})

export default instance;