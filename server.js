import axios from "axios"

export const server = axios.create({
  baseURL: "https://shorts-summary-node-api.onrender.com",
})
