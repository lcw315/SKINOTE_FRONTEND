import client from "./client";

// 백엔드가 { id, password } 를 그대로 받고,
// { success, message, token } 을 그대로 응답합니다 (감싸는 껍데기 없음).
// 이 파일은 client.js의 주소를 빌려 쓰면서, 
// **"로그인이라는 요청은 /auth/login으로, 이런 모양({id, password})으로 보내야 해"**라는 세부 규칙을 압니다. 
// 나중에 회원가입 기능 만들면 signup 함수를 여기 추가하거나, signupApi.js를 새로 만들면 되고요.
export const login = async ({ id, password }) => {
  const res = await client.post("/auth/login", { id, password });

  const modelBox = res.data; // { success, message, token }
  if (!modelBox.success) {
    throw new Error(modelBox.message || "로그인에 실패했습니다.");
  }
  return modelBox; // { success, message, token }
};