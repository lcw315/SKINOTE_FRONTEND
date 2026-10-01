import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      {/* 기본 접속 주소(/)일 때 LoginPage를 보여줍니다 */}
      <Route path="/" element={<LoginPage />} />
      
      {/* /home 주소일 때 HomePage를 보여줍니다 */}
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;