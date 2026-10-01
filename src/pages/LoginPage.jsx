import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from 'react-router-dom';

/**
 * src/pages/LoginPage.jsx 위치 기준으로 작성했습니다.
*/
export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!id.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      console.log("[요청 시작] id, password:", id, password);

      const data = await login({ id, password });

      console.log("[응답 받음]", data);

      if (data.success === false) {
        // 로그인 실패 (HTTP는 200이지만 내용상 실패)
        setError(data.message || "로그인에 실패했습니다.");
        return;
      }

      // 로그인 성공
      localStorage.setItem("token", data.token);
      if (keepLoggedIn) {
        localStorage.setItem("keepLoggedIn", "true");
      }
      navigate('/home');

    } catch (err) {
      // 여기는 이제 네트워크 에러, 서버 다운, 500 에러 등 진짜 "요청 자체가 실패"한 경우만 옴
      console.log("[네트워크/서버 에러]", err);
      setError(err.message || "로그인 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <style>{`
        /* 색상 변수, 폰트, 배경색은 index.css의 :root를 따르므로 삭제되었습니다 */
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .login-card {
          width: 100%;
          max-width: 360px;
        }

        .logo {
          font-size: 20px;
          font-weight: 700;
          color: var(--blue);
          margin-bottom: 48px;
        }

        .heading {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px;
          line-height: 1.4;
        }

        .subheading {
          font-size: 15px;
          color: var(--sub);
          margin: 0 0 36px;
        }

        .field {
          margin-bottom: 12px;
        }

        .field input {
          width: 100%;
          box-sizing: border-box;
          padding: 16px 18px;
          font-size: 16px;
          border: none;
          border-radius: 12px;
          background: var(--field-bg);
          color: var(--ink);
          outline: none;
          transition: box-shadow 0.15s ease;
        }

        .field input::placeholder {
          color: var(--sub);
        }

        .field input:focus {
          box-shadow: 0 0 0 2px var(--blue);
        }

        .row-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 16px 2px 32px;
          font-size: 14px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--sub);
          cursor: pointer;
          user-select: none;
        }

        .checkbox-label input {
          width: 16px;
          height: 16px;
          accent-color: var(--blue);
        }

        .link {
          color: var(--sub);
          text-decoration: none;
        }

        .link:hover {
          color: var(--ink);
        }

        .error-msg {
          margin: -4px 2px 16px;
          font-size: 13px;
          color: var(--error);
        }

        .submit-btn {
          width: 100%;
          padding: 17px;
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
          background: var(--blue);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--blue-hover);
        }

        .submit-btn:focus-visible {
          outline: 2px solid var(--blue);
          outline-offset: 2px;
        }

        .submit-btn:disabled {
          background: var(--border);
          color: var(--sub);
          cursor: not-allowed;
        }

        .signup-note {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: var(--sub);
        }

        .signup-note a {
          color: var(--blue);
          font-weight: 600;
          text-decoration: none;
        }

        .signup-note a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="login-card">
        <div className="logo">SKINOTE</div>
        <h1 className="heading">로그인</h1>
        <p className="subheading">아이디와 비밀번호를 입력해주세요.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <input
              type="text"
              autoComplete="username"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <div className="field">
            <input
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="row-between">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
              />
              로그인 상태 유지
            </label>
            <a className="link" href="#find-password">비밀번호 찾기</a>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="signup-note">
          계정이 없으신가요? <a href="#signup">회원가입</a>
        </div>
      </div>
    </div>
  );
}