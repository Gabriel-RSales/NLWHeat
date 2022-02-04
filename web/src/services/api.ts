import axios from "axios";

export const api = axios.create({
    baseURL: 'https://nlwheat-backend.herokuapp.com/',
});