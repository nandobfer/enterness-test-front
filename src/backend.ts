import axios from "axios";

export const hostname = "localhost:3000"

export const api = axios.create({baseURL: `http://${hostname}`})