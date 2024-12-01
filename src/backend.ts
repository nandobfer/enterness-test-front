import axios from "axios";

export const hostname = "localhost:8105"

export const api = axios.create({baseURL: `http://${hostname}`})