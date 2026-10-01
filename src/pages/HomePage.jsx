import { useState, useEffect } from "react";  
import { useNavigate } from 'react-router-dom';
import { getCustInfo } from "../api/authApi"; //  고객 list
import { getTodayCustInfo } from "../api/authApi"; // 오늘의 예약 고객 list 
import { logout } from "../api/authApi"; // 로그아웃

const weekDays = [
  { label: "월", date: 15, count: 3 },
  { label: "화", date: 16, count: 5 },
  { label: "수", date: 17, count: 2 },
  { label: "목", date: 18, count: 4 },
  { label: "금", date: 19, count: 6, isToday: true },
  { label: "토", date: 20, count: 1 },
  { label: "일", date: 21, count: 0 },
];

const reservationStatus = (status) => {

  if(status == "COMPLETED"){
    return { label : "예약완료", className: "status-completed" };
  }else if(status == "PENDING"){
    return { label : "예약대기", className: "status-pending" };
  }else if(status == "CANCELLED"){
    return { label : "예약취소", className: "status-cancelled" }; 
  }else if(status == "NO_SHOW"){
    return { label : "노쇼", className: "status-cancelled" }; 
  }else{
    return { label : status, className: "status-pending" };
  }

}


export default function HomePage() {
  
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      window.location.replace("/");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };  

  const [custList, setCustList] = useState([]);
  useEffect(() => {

    const fetchCustInfo = async () => {
      const data  = await getCustInfo();
      console.log("data", data); // 유니크 키값 : custId
      setCustList(data.custList);

    };

    fetchCustInfo();
  }, []);

  const [todayCustList, setTodayCustList] = useState([]);
  useEffect(() => {

    const fetchTodayCustInfo = async () => {
      const data = await getTodayCustInfo();
      console.log("today data", data);
      setTodayCustList(data.custList);
    };

    fetchTodayCustInfo();
  }, []);

  return (
    <div className="home-page">
      <style>{`
        /* 색상 변수, 폰트, 배경색은 index.css의 :root를 따르므로 삭제되었습니다 */
        .home-page {
          min-height: 100vh;
        }

        .home-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
        }

        .home-logo {
          font-size: 18px;
          font-weight: 700;
          color: var(--blue);
        }

        .logout-btn {
          font-size: 14px;
          color: var(--sub);
          background: none;
          border: none;
          cursor: pointer;
        }

        .home-content {
          max-width: 720px;
          margin: 0 auto;
          padding: 32px 24px 80px;
        }

        .section {
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 16px;
        }

        /* 오늘의 예약 목록 */
       .reservation-list { display: flex; flex-direction: column; gap: 8px; }

.reservation-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: var(--field-bg);
  border-radius: 12px;
}

.reservation-time { width: 48px; flex-shrink: 0; text-align: center; line-height: 1.3; }
.time-start { font-size: 15px; font-weight: 700; }
.time-end   { font-size: 12px; color: var(--sub); }

.reservation-info { flex: 1; min-width: 0; }
.reservation-line { display: flex; align-items: baseline; gap: 8px; }
.reservation-customer { font-size: 15px; font-weight: 600; }
.reservation-course { font-size: 13px; color: var(--sub); }
.reservation-memo {
  font-size: 12px;
  color: var(--sub);
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reservation-status {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  flex-shrink: 0;
}
.status-completed { color: #3182F6; background: #E8F1FF; }
.status-pending   { color: #B26B00; background: #FFF4E0; }
.status-noshow    { color: #E5484D; background: #FDECEC; }
.status-canceled  { color: var(--sub); background: #EAEBEE; }

        .empty-state {
          padding: 32px 18px;
          text-align: center;
          color: var(--sub);
          font-size: 14px;
          background: var(--field-bg);
          border-radius: 12px;
        }

        /* 주간 캘린더 미니뷰 */
        .week-calendar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }

        .week-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 14px 4px;
          border-radius: 12px;
          background: var(--field-bg);
          cursor: pointer;
        }

        .week-day.is-today {
          background: var(--blue);
        }

        .week-day-label {
          font-size: 12px;
          color: var(--sub);
        }

        .week-day.is-today .week-day-label {
          color: rgba(255, 255, 255, 0.8);
        }

        .week-day-date {
          font-size: 15px;
          font-weight: 700;
        }

        .week-day.is-today .week-day-date {
          color: #FFFFFF;
        }

        .week-day-count {
          font-size: 11px;
          color: var(--sub);
        }

        .week-day.is-today .week-day-count {
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>

      <header className="home-header">
        <div className="home-logo">SKINOTE</div>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </header>

      <main className="home-content">
        <section className="section">
          <h2 className="section-title">오늘의 예약</h2>

        {todayCustList.length > 0 ? (
        <div className="reservation-list"> 
          {todayCustList.map((r) => (
          <div className="reservation-item" key={r.reservId}>
            <div className="reservation-time">
              <div className="time-start">{r.startTime} ~ {r.endTime}</div>
            </div>

            <div className="reservation-info">
              <div className="reservation-line">
                <span className="reservation-customer">{r.custName}</span>
                <span className="reservation-course">{r.courseName}</span>
              </div>
              {r.custMemo && <div className="reservation-memo">{r.custMemo}</div>}
            </div>

            <span className={`reservation-status ${reservationStatus(r.reservStat).className}`}>
              {reservationStatus(r.reservStat).label}
            </span>
          </div>
        ))}
        </div>
        ) : (
          <div className="empty-state">오늘 예정된 예약이 없습니다.</div>
        )}
        </section>

        <section className="section">
          <h2 className="section-title">이번 주</h2>

          <div className="week-calendar">
            {weekDays.map((d) => (
              <div
                className={`week-day${d.isToday ? " is-today" : ""}`}
                key={d.date}
              >
                <div className="week-day-label">{d.label}</div>
                <div className="week-day-date">{d.date}</div>
                <div className="week-day-count">{d.count}건</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      </div>
  );
}