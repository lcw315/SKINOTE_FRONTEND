import axios from "axios";

// 백엔드가 어디에 있는 지 알려주는 곳
const client = axios.create({
  baseURL: "http://localhost:8080",
});

export default client;