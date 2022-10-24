import axios from "axios";

export const axiosComments = axios.create({
    baseURL:
    'https://firestore.googleapis.com/v1/projects/vuejs-http-f75d6/databases/(default)/documents'
})

export const axiosAuth = axios.create({
    baseURL:
    'https://identitytoolkit.googleapis.com/v1'
})

export const axiosRefresh = axios.create({
    baseURL:
    'https://securetoken.googleapis.com/v1'
})