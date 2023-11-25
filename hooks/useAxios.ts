import axios from "axios"

const paxios = axios.create({
    baseURL: "https://www.example.org/",
    timeout: 1000,
    headers: {},
})

export default paxios