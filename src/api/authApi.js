import client from "./client";

// 로그인 기능
export const login = async ({ id, password }) => {
  const res = await client.post("/auth/login", { id, password });
  return res.data;
};

// 로그아웃 기능

// 로그인 후 고객 정보 가져오기
export const getCustInfo = async (param = {}) => {
  const res = await client.post("/cust/searchCustList", param);
  return res.data;
}

// 오늘의 예약 고객 정보 가져오기
export const getTodayCustInfo = async (param = {}) => {
  const res = await client.post("/cust/searchTodayCustList", param);
  return res.data;
}