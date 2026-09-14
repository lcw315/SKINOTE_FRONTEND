import { useState } from "react";
import {
  Home as HomeIcon,
  Calendar,
  Users,
  Settings,
  Plus,
  Clock,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

// ---- 목업 데이터 (백엔드 연동 전 임시) ----
const STORE_NAME = "라온 에스테틱";
const OWNER_NAME = "김하늘";

const TODAY_RESERVATIONS = [
  {
    id: "RES001",
    time: "10:00",
    customer: "이서연",
    course: "얼굴 리프팅 관리 · 80분",
    status: "confirmed",
  },
  {
    id: "RES002",
    time: "13:30",
    customer: "박지민",
    course: "바디 순환 관리 · 60분",
    status: "cutoff",
    cutoffLabel: "취소마감 1시간 전",
  },
  {
    id: "RES003",
    time: "14:30",
    customer: "김민지",
    course: "골드 관리 · 60분",
    status: "next",
  },
  {
    id: "RES004",
    time: "17:00",
    customer: "최유정",
    course: "얼굴+바디 풀코스 · 120분",
    status: "confirmed",
  },
];

const STATS = [
  { label: "오늘 예약", value: "4건" },
  { label: "이번달 매출", value: "320만원" },
  { label: "회원권 만료임박", value: "2명" },
  { label: "노쇼 위험", value: "1건" },
];

const NAV_ITEMS = [
  { key: "home", label: "홈", icon: HomeIcon },
  { key: "calendar", label: "캘린더", icon: Calendar },
  { key: "customers", label: "고객", icon: Users },
  { key: "settings", label: "설정", icon: Settings },
];

function statusMeta(item) {
  if (item.status === "next") {
    return { barColor: "#3182F6", tag: "다음 예약", tagBg: "#EAF2FF", tagColor: "#3182F6" };
  }
  if (item.status === "cutoff") {
    return { barColor: "#FF5757", tag: item.cutoffLabel, tagBg: "#FFEDED", tagColor: "#E5484D" };
  }
  return { barColor: "#00C4B3", tag: "확정", tagBg: "#E6FBF8", tagColor: "#00A895" };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const nextReservation = TODAY_RESERVATIONS.find((r) => r.status === "next");

  return (
    <div className="skinote-shell">
      <style>{`
        .skinote-shell {
          --ink: #191F28;
          --ink-2: #6B7684;
          --ink-3: #B0B8C1;
          --bg: #F5F6F8;
          --card: #FFFFFF;
          --blue: #3182F6;
          --blue-bg: #EAF2FF;
          --divider: #EEF0F2;
          font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
            "Pretendard", "Malgun Gothic", sans-serif;
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
        }
        .skinote-shell *, .skinote-shell *::before, .skinote-shell *::after {
          box-sizing: border-box;
        }
        .skinote-frame {
          width: 100%;
          max-width: 430px;
          min-height: 100vh;
          background: var(--bg);
          position: relative;
          padding-bottom: 96px;
        }

        .skinote-header {
          padding: 28px 20px 8px;
        }
        .skinote-store {
          font-size: 13px;
          color: var(--ink-2);
          font-weight: 500;
          margin: 0 0 6px;
        }
        .skinote-greeting {
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
          line-height: 1.4;
        }

        .skinote-hero {
          margin: 16px 20px 0;
          background: var(--ink);
          border-radius: 20px;
          padding: 24px 22px;
          color: white;
        }
        .skinote-hero-label {
          font-size: 13px;
          color: rgba(255,255,255,0.64);
          margin: 0 0 10px;
          font-weight: 500;
        }
        .skinote-hero-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .skinote-hero-time {
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .skinote-hero-name {
          font-size: 16px;
          font-weight: 600;
          color: rgba(255,255,255,0.88);
        }
        .skinote-hero-course {
          margin-top: 8px;
          font-size: 14px;
          color: rgba(255,255,255,0.64);
        }

        .skinote-stats {
          display: flex;
          gap: 10px;
          padding: 18px 20px 4px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .skinote-stats::-webkit-scrollbar { display: none; }
        .skinote-stat-chip {
          flex: 0 0 auto;
          background: var(--card);
          border-radius: 14px;
          padding: 14px 16px;
          min-width: 108px;
        }
        .skinote-stat-value {
          font-size: 18px;
          font-weight: 700;
          color: var(--ink);
        }
        .skinote-stat-label {
          font-size: 12.5px;
          color: var(--ink-2);
          margin-top: 4px;
          font-weight: 500;
        }

        .skinote-section {
          margin-top: 22px;
          padding: 0 20px;
        }
        .skinote-section-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 12px;
        }

        .skinote-list {
          background: var(--card);
          border-radius: 18px;
          overflow: hidden;
        }
        .skinote-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 16px 16px 14px;
          border-bottom: 1px solid var(--divider);
        }
        .skinote-item:last-child { border-bottom: none; }
        .skinote-item-bar {
          width: 3px;
          align-self: stretch;
          border-radius: 2px;
          flex: 0 0 auto;
        }
        .skinote-item-time {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          width: 46px;
          flex: 0 0 auto;
        }
        .skinote-item-body { flex: 1; min-width: 0; }
        .skinote-item-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 3px;
        }
        .skinote-item-course {
          font-size: 13px;
          color: var(--ink-2);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .skinote-item-tag {
          font-size: 12px;
          font-weight: 600;
          padding: 5px 9px;
          border-radius: 8px;
          flex: 0 0 auto;
          white-space: nowrap;
        }

        .skinote-fab {
          position: fixed;
          bottom: 88px;
          right: max(20px, calc((100vw - 430px) / 2 + 20px));
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--blue);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(49, 130, 246, 0.35);
          cursor: pointer;
        }

        .skinote-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          background: var(--card);
          border-top: 1px solid var(--divider);
        }
        .skinote-nav-inner {
          width: 100%;
          max-width: 430px;
          display: flex;
        }
        .skinote-nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 0 14px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .skinote-nav-label {
          font-size: 11px;
          font-weight: 600;
        }
      `}</style>

      <div className="skinote-frame">
        <header className="skinote-header">
          <p className="skinote-store">{STORE_NAME}</p>
          <h1 className="skinote-greeting">
            안녕하세요, {OWNER_NAME} 원장님
          </h1>
        </header>

        {nextReservation && (
          <div className="skinote-hero">
            <p className="skinote-hero-label">다음 예약까지</p>
            <div className="skinote-hero-row">
              <span className="skinote-hero-time">{nextReservation.time}</span>
              <span className="skinote-hero-name">{nextReservation.customer}님</span>
            </div>
            <p className="skinote-hero-course">{nextReservation.course}</p>
          </div>
        )}

        <div className="skinote-stats">
          {STATS.map((s) => (
            <div className="skinote-stat-chip" key={s.label}>
              <div className="skinote-stat-value">{s.value}</div>
              <div className="skinote-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="skinote-section">
          <h2 className="skinote-section-title">오늘의 예약</h2>
          <div className="skinote-list">
            {TODAY_RESERVATIONS.map((item) => {
              const meta = statusMeta(item);
              return (
                <div className="skinote-item" key={item.id}>
                  <div
                    className="skinote-item-bar"
                    style={{ background: meta.barColor }}
                  />
                  <span className="skinote-item-time">{item.time}</span>
                  <div className="skinote-item-body">
                    <p className="skinote-item-name">{item.customer}님</p>
                    <p className="skinote-item-course">{item.course}</p>
                  </div>
                  <span
                    className="skinote-item-tag"
                    style={{ background: meta.tagBg, color: meta.tagColor }}
                  >
                    {item.status === "cutoff" && (
                      <AlertCircle size={12} style={{ marginRight: 3, verticalAlign: -2 }} />
                    )}
                    {meta.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <button className="skinote-fab" aria-label="새 예약 등록">
          <Plus size={26} strokeWidth={2.4} />
        </button>

        <nav className="skinote-nav">
          <div className="skinote-nav-inner">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  className="skinote-nav-item"
                  onClick={() => setActiveTab(item.key)}
                >
                  <Icon
                    size={22}
                    color={active ? "#3182F6" : "#B0B8C1"}
                    strokeWidth={active ? 2.4 : 2}
                  />
                  <span
                    className="skinote-nav-label"
                    style={{ color: active ? "#3182F6" : "#B0B8C1" }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}