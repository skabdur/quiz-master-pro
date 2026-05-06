import { useState, useEffect, useCallback } from "react";
import { ALL_Q, CAT_NAMES, CAT_COLORS, CAT_VISUAL_BG, type Question } from "@/data/questions";

type GameState = "playing" | "answered" | "end";
type Filter = "all" | "everyday" | "digital" | "india" | "street" | "body" | "home";
type OptState = "idle" | "correct" | "wrong" | "reveal";

interface ShuffledQuestion extends Question {
  shuffledOpts: string[];
  shuffledAns: number;
}

function shuffleOptions(q: Question): ShuffledQuestion {
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return { ...q, shuffledOpts: indices.map((i) => q.opts[i]), shuffledAns: indices.indexOf(q.ans) };
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "everyday", label: "Everyday" },
  { key: "digital", label: "Digital" },
  { key: "india", label: "India" },
  { key: "street", label: "Streets" },
  { key: "body", label: "Body" },
  { key: "home", label: "Home" },
];

const OPT_LETTERS = ["A", "B", "C", "D"];

function ConfettiParticle({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <div style={{
      position: "fixed",
      left: x,
      top: y,
      width: 9,
      height: 9,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      backgroundColor: color,
      animation: `confettiFloat ${0.8 + Math.random() * 0.7}s ease-out forwards`,
      pointerEvents: "none",
      zIndex: 9999,
    }} />
  );
}

function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    if (!active) return;
    const colors = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#8b5cf6", "#06b6d4"];
    const newParticles = Array.from({ length: 28 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * 0.55 + Math.random() * 120,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
    const t = setTimeout(() => setParticles([]), 1600);
    return () => clearTimeout(t);
  }, [active]);

  return <>{particles.map((p) => <ConfettiParticle key={p.id} x={p.x} y={p.y} color={p.color} />)}</>;
}

function CircularProgress({ pct, score, total }: { pct: number; score: number; total: number }) {
  const r = 80;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  const color = pct >= 85 ? "#10b981" : pct >= 65 ? "#6366f1" : pct >= 40 ? "#f59e0b" : "#ef4444";
  const trackColor = pct >= 85 ? "#d1fae5" : pct >= 65 ? "#e0e7ff" : pct >= 40 ? "#fef3c7" : "#fee2e2";

  return (
    <div style={{ position: "relative", width: 200, height: 200 }}>
      <svg width={200} height={200} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={100} cy={100} r={r} fill="none" stroke={trackColor} strokeWidth={14} />
        <circle
          cx={100} cy={100} r={r}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            filter: `drop-shadow(0 0 8px ${color}80)`,
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontSize: 44, fontWeight: 900, color,
          lineHeight: 1,
          animation: "scoreReveal 0.8s cubic-bezier(0.34,1.56,0.64,1) both",
        }}>
          {score}
        </div>
        <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 3, fontWeight: 600 }}>of {total}</div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [cur, setCur] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [showHint, setShowHint] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  const [scoreBump, setScoreBump] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [optStates, setOptStates] = useState<OptState[]>(["idle", "idle", "idle", "idle"]);

  const initQuestions = useCallback((f: Filter) => {
    const base = f === "all" ? [...ALL_Q] : ALL_Q.filter((q) => q.cat === f);
    return shuffleArray(base).map(shuffleOptions);
  }, []);

  useEffect(() => { setQuestions(initQuestions("all")); }, [initQuestions]);

  const reset = (f: Filter, keepFilter = false) => {
    if (!keepFilter) setFilter(f);
    setQuestions(initQuestions(f));
    setCur(0);
    setScore(0);
    setGameState("playing");
    setShowHint(false);
    setShowReveal(false);
    setCardKey((k) => k + 1);
    setOptStates(["idle", "idle", "idle", "idle"]);
  };

  const handleFilter = (f: Filter) => reset(f);

  const q = questions[cur];

  const pick = (idx: number) => {
    if (gameState !== "playing" || !q) return;
    setGameState("answered");
    setShowReveal(true);
    const states: OptState[] = ["idle", "idle", "idle", "idle"];
    if (idx === q.shuffledAns) {
      states[idx] = "correct";
      setScore((s) => s + 1);
      setScoreBump(true);
      setConfetti(true);
      setTimeout(() => setScoreBump(false), 500);
      setTimeout(() => setConfetti(false), 100);
    } else {
      states[idx] = "wrong";
      states[q.shuffledAns] = "reveal";
    }
    setOptStates(states);
  };

  const next = () => {
    if (cur + 1 >= questions.length) {
      setGameState("end");
    } else {
      setCur((c) => c + 1);
      setGameState("playing");
      setShowHint(false);
      setShowReveal(false);
      setCardKey((k) => k + 1);
      setOptStates(["idle", "idle", "idle", "idle"]);
    }
  };

  const progress = questions.length > 0 ? (cur / questions.length) * 100 : 0;
  const progressPct = Math.round(progress);

  const getGrade = (pct: number) => {
    if (pct >= 85) return { grade: "Design Detective", msg: "You see the story behind everything. That is exactly the eye NID is looking for.", color: "#10b981" };
    if (pct >= 65) return { grade: "Curious Observer", msg: "You notice things others walk past. Keep asking why about everything you touch.", color: "#6366f1" };
    if (pct >= 40) return { grade: "Waking Up", msg: "Every wrong answer today is a story you'll never forget. That's how design education works.", color: "#f59e0b" };
    return { grade: "Just Beginning", msg: "Every single object around you has a wild story. You just started finding them. Keep going.", color: "#ef4444" };
  };

  const catColor = q ? CAT_COLORS[q.cat] : CAT_COLORS.everyday;
  const catVisualBg = q ? CAT_VISUAL_BG[q.cat] : CAT_VISUAL_BG.everyday;

  if (!q && gameState !== "end") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#94a3b8", fontSize: 16, fontWeight: 600 }}>Loading questions…</div>
      </div>
    );
  }

  /* ─── End screen ─── */
  if (gameState === "end") {
    const pct = Math.round((score / questions.length) * 100);
    const { grade, msg, color } = getGrade(pct);

    return (
      <div className="end-page">
        <Confetti active={pct >= 65} />
        <div className="end-container">
          <div style={{ paddingTop: 24 }}>
            <div className="end-badge">Quiz Complete</div>

            <div className="circle-wrap">
              <CircularProgress pct={pct} score={score} total={questions.length} />
            </div>

            <div className="end-grade" style={{ color }}>{grade}</div>

            <div className="end-msg">{msg}</div>

            <div className="stats-grid">
              {[
                { label: "Correct", value: score, color: "#10b981" },
                { label: "Accuracy", value: `${pct}%`, color },
                { label: "Questions", value: questions.length, color: "#6366f1" },
              ].map((s) => (
                <div key={s.label} className="stat-card">
                  <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
                  <div className="stat-card-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="end-btn-group">
              <button className="btn-primary" onClick={() => reset(filter, true)}>
                Play Again
              </button>
              <button className="btn-secondary" onClick={() => handleFilter("all")}>
                Change Category
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Quiz screen ─── */
  return (
    <div className="quiz-page">
      <Confetti active={confetti} />
      <div className="quiz-container">

        {/* Header */}
        <header className="quiz-header">
          <div>
            <div className="quiz-title">Who Designed That?</div>
            <div className="quiz-subtitle">Design History Quiz</div>
          </div>
          <div className="header-badges">
            <div className={`score-badge${scoreBump ? " bumped" : ""}`}>
              <span>✦</span>
              <span>{score} pts</span>
            </div>
            <div className="counter-badge">{cur + 1}/{questions.length}</div>
          </div>
        </header>

        {/* Filter chips */}
        <div className="filter-bar">
          {FILTERS.map((f) => {
            const isOn = filter === f.key;
            const col = f.key !== "all" ? CAT_COLORS[f.key] : null;
            return (
              <button
                key={f.key}
                className={`filter-chip${isOn ? " active" : ""}`}
                onClick={() => handleFilter(f.key)}
                style={isOn && col ? {
                  background: col.text,
                  borderColor: col.text,
                  color: "#fff",
                  boxShadow: `0 3px 12px ${col.text}55`,
                } : isOn ? undefined : undefined}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Progress */}
        <div className="progress-wrap">
          <div className="progress-row">
            <span className="progress-label">Progress</span>
            <span className="progress-pct">{progressPct}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question card */}
        <div key={cardKey} className="question-card">
          <div className="card-inner-top">

            {/* Meta row */}
            <div className="card-meta">
              <span className="meta-num">{cur + 1} of {questions.length}</span>
              <span
                className="cat-pill"
                style={{
                  background: catColor.bg,
                  color: catColor.text,
                  borderColor: catColor.border,
                }}
              >
                {CAT_NAMES[q.cat]}
              </span>
              <span className="diff-pill">{q.diff}</span>
              <button
                className="hint-btn"
                onClick={() => setShowHint(true)}
                disabled={showHint || gameState === "answered"}
              >
                {showHint ? "Hint shown" : "💡 Hint"}
              </button>
            </div>

            {/* Visual */}
            <div
              className="visual-block"
              style={{ background: catVisualBg }}
            >
              <svg
                width="110"
                height="110"
                viewBox="0 0 110 110"
                xmlns="http://www.w3.org/2000/svg"
                dangerouslySetInnerHTML={{ __html: q.visual.svg }}
              />
            </div>

            {/* Wow strip */}
            <div
              className="wow-strip"
              style={{ borderLeftColor: catColor.text }}
            >
              {q.wow}
            </div>

            {/* Question */}
            <div className="question-text">{q.q}</div>

            {/* Hint box */}
            {showHint && (
              <div className="hint-box">
                <span className="hint-icon">💡</span>
                <span>
                  Think about the time period: <strong style={{ color: "#d97706" }}>{q.year}</strong>. What problem existed then that this solved?
                </span>
              </div>
            )}
          </div>

          {/* Answer options */}
          <div className="answer-grid">
            {q.shuffledOpts.map((opt, i) => {
              const state = optStates[i];
              return (
                <button
                  key={i}
                  className={`opt-btn state-${state}`}
                  onClick={() => pick(i)}
                  disabled={gameState !== "playing"}
                >
                  <span className="opt-letter">
                    {state === "correct" ? "✓" : state === "wrong" ? "✗" : state === "reveal" ? "✓" : OPT_LETTERS[i]}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Reveal panel */}
          {showReveal && (
            <div className="reveal-panel">
              <div className="reveal-inner" style={{ borderColor: catColor.border }}>
                <div className="reveal-name">{q.name}</div>
                <div className="reveal-year" style={{ color: catColor.text }}>{q.year}</div>
                <div className="reveal-story">{q.story}</div>
                <div className="fact-list">
                  {q.facts.map((f, i) => (
                    <div key={i} className="fact-item">
                      <span className="fact-dot" style={{ color: catColor.text }}>—</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Nav row */}
          <div className="nav-row">
            <button
              className="skip-btn"
              onClick={next}
              disabled={gameState === "answered"}
            >
              Skip →
            </button>
            <button
              className={`next-btn ${gameState === "answered" ? "active" : "inactive"}`}
              onClick={next}
              disabled={gameState !== "answered"}
            >
              {cur + 1 >= questions.length && gameState === "answered" ? "See Results 🎉" : "Next →"}
            </button>
          </div>
        </div>

        {/* Mini stats */}
        <div className="mini-stats">
          {[
            { label: "Answered", value: cur + (gameState === "answered" ? 1 : 0) },
            { label: "Correct", value: score },
            { label: "Left", value: questions.length - cur - (gameState === "answered" ? 1 : 0) },
          ].map((s) => (
            <div key={s.label} className="mini-stat">
              <div className="mini-stat-value">{s.value}</div>
              <div className="mini-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
