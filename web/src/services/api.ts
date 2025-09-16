import axios from "axios";

export const api = axios.create({
    baseURL: 'https://nlwheat-backend-6aeddbdbfc66.herokuapp.com/',
});