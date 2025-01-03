import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://royalestate.onrender.com",
  withCredentials: true,
});

export default apiRequest;