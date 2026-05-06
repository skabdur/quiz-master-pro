import { useState, useEffect, useCallback, useRef } from "react";
import { ALL_Q, CAT_NAMES, CAT_COLORS, type Question } from "@/data/questions";

type GameState = "playing" | "answered" | "end";
type Filter = "all" | "everyday" | "digital" | "india" | "street" | "body" | "home";

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
  const shuffledOpts = indices.map((i) => q.opts[i]);
  const shuffledAns = indices.indexOf(q.ans);
  return { ...q, shuffledOpts, shuffledAns };
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

function ConfettiParticle({ x, y, color }: { x: number; y: number; color: string }) {
  const style: React.CSSProperties = {
    position: "fixed",
    left: x,
    top: y,
    width: 8,
    height: 8,
    borderRadius: Math.random() > 0.5 ? "50%" : "2px",
    backgroundColor: color,
    animation: `confettiFloat ${0.8 + Math.random() * 0.6}s ease-out forwards`,
    pointerEvents: "none",
    zIndex: 9999,
  };
  return <div style={style} />;
}

function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    if (!active) return;
    const colors = ["#7c6fff", "#00ff88", "#ffcc44", "#ff69a0", "#4488ff", "#ff7744"];
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * 0.6 + Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
    const t = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <>
      {particles.map((p) => (
        <ConfettiParticle key={p.id} x={p.x} y={p.y} color={p.color} />
      ))}
    </>
  );
}

function CircularProgress({ pct, score, total }: { pct: number; score: number; total: number }) {
  const r = 80;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  const getColor = () => {
    if (pct >= 85) return "#00ff88";
    if (pct >= 65) return "#7c6fff";
    if (pct >= 40) return "#ffcc44";
    return "#ff7744";
  };

  return (
    <div style={{ position: "relative", width: 200, height: 200 }}>
      <svg width={200} height={200} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={100} cy={100} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={12}
        />
        <circle
          cx={100} cy={100} r={r}
          fill="none"
          stroke={getColor()}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            filter: `drop-shadow(0 0 12px ${getColor()})`,
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div className="score-reveal" style={{
          fontSize: 42, fontWeight: 800, color: getColor(),
          filter: `drop-shadow(0 0 8px ${getColor()})`,
          lineHeight: 1,
        }}>
          {score}
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
          of {total}
        </div>
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
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  const [scoreBump, setScoreBump] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [optStates, setOptStates] = useState<("idle" | "correct" | "wrong" | "reveal")[]>(["idle", "idle", "idle", "idle"]);
  const scoreRef = useRef(score);
  scoreRef.current = score;

  const initQuestions = useCallback((f: Filter) => {
    const base = f === "all" ? [...ALL_Q] : ALL_Q.filter((q) => q.cat === f);
    return shuffleArray(base).map(shuffleOptions);
  }, []);

  useEffect(() => {
    setQuestions(initQuestions("all"));
  }, [initQuestions]);

  const handleFilter = (f: Filter) => {
    setFilter(f);
    setQuestions(initQuestions(f));
    setCur(0);
    setScore(0);
    setGameState("playing");
    setSelected(null);
    setShowHint(false);
    setShowReveal(false);
    setCardKey((k) => k + 1);
    setOptStates(["idle", "idle", "idle", "idle"]);
  };

  const q = questions[cur];

  const pick = (idx: number) => {
    if (gameState !== "playing" || !q) return;
    setSelected(idx);
    setGameState("answered");
    setShowReveal(true);

    const newStates: ("idle" | "correct" | "wrong" | "reveal")[] = ["idle", "idle", "idle", "idle"];
    if (idx === q.shuffledAns) {
      newStates[idx] = "correct";
      setScore((s) => s + 1);
      setScoreBump(true);
      setConfetti(true);
      setTimeout(() => setScoreBump(false), 500);
      setTimeout(() => setConfetti(false), 100);
    } else {
      newStates[idx] = "wrong";
      newStates[q.shuffledAns] = "reveal";
    }
    setOptStates(newStates);
  };

  const next = () => {
    if (cur + 1 >= questions.length) {
      setGameState("end");
    } else {
      setCur((c) => c + 1);
      setGameState("playing");
      setSelected(null);
      setShowHint(false);
      setShowReveal(false);
      setCardKey((k) => k + 1);
      setOptStates(["idle", "idle", "idle", "idle"]);
    }
  };

  const skip = () => {
    next();
  };

  const restart = () => {
    setQuestions(initQuestions(filter));
    setCur(0);
    setScore(0);
    setGameState("playing");
    setSelected(null);
    setShowHint(false);
    setShowReveal(false);
    setCardKey((k) => k + 1);
    setOptStates(["idle", "idle", "idle", "idle"]);
  };

  const progress = questions.length > 0 ? (cur / questions.length) * 100 : 0;

  const getGrade = (pct: number) => {
    if (pct >= 85) return { grade: "Design Detective", msg: "You see the story behind everything. That is exactly the eye NID is looking for.", color: "#00ff88" };
    if (pct >= 65) return { grade: "Curious Observer", msg: "You notice things others walk past. Keep asking why about everything you touch.", color: "#7c6fff" };
    if (pct >= 40) return { grade: "Waking Up", msg: "Every wrong answer today is a story you'll never forget. That's how design education works.", color: "#ffcc44" };
    return { grade: "Just Beginning", msg: "Every single object around you has a wild story. You just started finding them. Keep going.", color: "#ff7744" };
  };

  const getOptStyle = (state: "idle" | "correct" | "wrong" | "reveal", idx: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      padding: "13px 16px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.04)",
      fontSize: 14,
      color: "rgba(255,255,255,0.85)",
      cursor: gameState === "playing" ? "pointer" : "default",
      textAlign: "left" as const,
      lineHeight: 1.45,
      transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
      position: "relative" as const,
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      width: "100%",
    };
    if (state === "correct") return {
      ...base,
      background: "rgba(0,255,136,0.12)",
      border: "1px solid rgba(0,255,136,0.4)",
      color: "#00ff88",
      boxShadow: "0 0 20px rgba(0,255,136,0.2), inset 0 0 20px rgba(0,255,136,0.05)",
    };
    if (state === "wrong") return {
      ...base,
      background: "rgba(255,80,80,0.12)",
      border: "1px solid rgba(255,80,80,0.4)",
      color: "#ff7777",
      boxShadow: "0 0 20px rgba(255,80,80,0.15)",
    };
    if (state === "reveal") return {
      ...base,
      background: "rgba(0,255,136,0.07)",
      border: "1px solid rgba(0,255,136,0.25)",
      color: "rgba(0,255,136,0.8)",
    };
    return base;
  };

  const getOptIcon = (state: "idle" | "correct" | "wrong" | "reveal") => {
    if (state === "correct") return <span style={{ fontSize: 16, flexShrink: 0 }}>✓</span>;
    if (state === "wrong") return <span style={{ fontSize: 16, flexShrink: 0 }}>✗</span>;
    if (state === "reveal") return <span style={{ fontSize: 16, flexShrink: 0, opacity: 0.7 }}>✓</span>;
    return null;
  };

  const catColor = q ? CAT_COLORS[q.cat] : CAT_COLORS.everyday;

  if (!q && gameState !== "end") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }}>Loading questions...</div>
      </div>
    );
  }

  if (gameState === "end") {
    const pct = Math.round((score / questions.length) * 100);
    const { grade, msg, color } = getGrade(pct);

    return (
      <div style={{ minHeight: "100vh", padding: "20px 16px 40px", maxWidth: 500, margin: "0 auto" }}>
        <Confetti active={pct >= 65} />

        <div style={{ textAlign: "center", padding: "32px 0 24px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(124,111,255,0.1)",
            border: "1px solid rgba(124,111,255,0.2)",
            borderRadius: 100,
            padding: "6px 16px",
            fontSize: 12,
            color: "#a599ff",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}>
            Quiz Complete
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <CircularProgress pct={pct} score={score} total={questions.length} />
          </div>

          <div style={{
            fontSize: 28,
            fontWeight: 800,
            color,
            marginBottom: 10,
            filter: `drop-shadow(0 0 12px ${color}60)`,
          }}>
            {grade}
          </div>

          <div style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.65,
            maxWidth: 340,
            margin: "0 auto 32px",
          }}>
            {msg}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            marginBottom: 32,
          }}>
            {[
              { label: "Correct", value: score, color: "#00ff88" },
              { label: "Accuracy", value: `${pct}%`, color },
              { label: "Questions", value: questions.length, color: "#4488ff" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card" style={{
                borderRadius: 14,
                padding: "14px 10px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: stat.color, marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={restart}
            style={{
              width: "100%",
              padding: "16px 24px",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #7c6fff 0%, #534AB7 100%)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(124,111,255,0.35), 0 0 0 1px rgba(124,111,255,0.2)",
              transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(124,111,255,0.5), 0 0 0 1px rgba(124,111,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,111,255,0.35), 0 0 0 1px rgba(124,111,255,0.2)";
            }}
          >
            Play Again
          </button>

          <button
            onClick={() => handleFilter("all")}
            style={{
              width: "100%",
              marginTop: 10,
              padding: "14px 24px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
          >
            Change Category
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "16px 16px 40px", maxWidth: 560, margin: "0 auto" }}>
      <Confetti active={confetti} />

      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingTop: 8,
      }}>
        <div>
          <div className="gradient-text" style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Who Designed That?
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 1, letterSpacing: "0.06em" }}>
            DESIGN HISTORY QUIZ
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div className={`glass ${scoreBump ? "score-bump" : ""}`} style={{
            padding: "6px 14px",
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 700,
            color: "#00ff88",
            border: "1px solid rgba(0,255,136,0.25)",
            background: "rgba(0,255,136,0.08)",
            boxShadow: score > 0 ? "0 0 12px rgba(0,255,136,0.2)" : "none",
            transition: "all 0.3s",
          }}>
            {score} pts
          </div>
          <div className="glass" style={{
            padding: "6px 14px",
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            {cur + 1}/{questions.length}
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginBottom: 16,
      }}>
        {FILTERS.map((f) => {
          const isOn = filter === f.key;
          const col = f.key !== "all" ? CAT_COLORS[f.key] : null;
          return (
            <button
              key={f.key}
              onClick={() => handleFilter(f.key)}
              style={{
                fontSize: 12,
                padding: "5px 13px",
                borderRadius: 100,
                border: isOn
                  ? `1px solid ${col ? col.border : "rgba(124,111,255,0.4)"}`
                  : "1px solid rgba(255,255,255,0.07)",
                background: isOn
                  ? (col ? col.bg : "rgba(124,111,255,0.15)")
                  : "rgba(255,255,255,0.03)",
                color: isOn
                  ? (col ? col.text : "#a599ff")
                  : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                fontWeight: isOn ? 600 : 400,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                boxShadow: isOn && col ? `0 0 8px ${col.glow}30` : "none",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{
        height: 4,
        background: "rgba(255,255,255,0.05)",
        borderRadius: 2,
        marginBottom: 20,
        overflow: "hidden",
      }}>
        <div className="progress-bar-inner" style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #7c6fff, #ff69a0)",
          borderRadius: 2,
          transition: "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: "0 0 8px rgba(124,111,255,0.5)",
        }} />
      </div>

      {/* Question Card */}
      <div key={cardKey} className="glass-card slide-in-up" style={{ borderRadius: 20, overflow: "hidden", marginBottom: 12 }}>

        {/* Card top */}
        <div style={{ padding: "18px 18px 0" }}>
          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>
              {cur + 1} of {questions.length}
            </span>
            <span style={{
              fontSize: 10,
              padding: "3px 10px",
              borderRadius: 100,
              background: catColor.bg,
              color: catColor.text,
              border: `1px solid ${catColor.border}`,
              fontWeight: 600,
              letterSpacing: "0.04em",
              boxShadow: `0 0 8px ${catColor.glow}30`,
            }}>
              {CAT_NAMES[q.cat]}
            </span>
            <span style={{
              fontSize: 10,
              padding: "3px 10px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.07)",
              letterSpacing: "0.04em",
            }}>
              {q.diff}
            </span>
            <button
              onClick={() => setShowHint(true)}
              disabled={showHint}
              style={{
                marginLeft: "auto",
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.08)",
                background: showHint ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                color: showHint ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.45)",
                cursor: showHint ? "default" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {showHint ? "Hint shown" : "Hint"}
            </button>
          </div>

          {/* Visual */}
          <div style={{
            width: "100%",
            height: 100,
            borderRadius: 12,
            background: q.visual.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
            }} />
            <svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg"
              dangerouslySetInnerHTML={{ __html: q.visual.svg }}
            />
          </div>

          {/* Wow strip */}
          <div style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 10,
            padding: "8px 13px",
            marginBottom: 13,
            lineHeight: 1.6,
            fontStyle: "italic",
            borderLeft: `2px solid ${catColor.glow}50`,
          }}>
            {q.wow}
          </div>

          {/* Question */}
          <div style={{
            fontSize: 16,
            fontWeight: 600,
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.55,
            marginBottom: 6,
            letterSpacing: "-0.01em",
          }}>
            {q.q}
          </div>

          {/* Hint box */}
          {showHint && (
            <div style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              background: "rgba(255,204,68,0.06)",
              borderRadius: 10,
              padding: "8px 13px",
              marginBottom: 12,
              lineHeight: 1.55,
              border: "1px solid rgba(255,204,68,0.15)",
            }}>
              Think about the time period: <strong style={{ color: "rgba(255,204,68,0.8)" }}>{q.year}</strong>. What problem existed then that this solved?
            </div>
          )}
        </div>

        {/* Options */}
        <div className="stagger-children" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          padding: "14px 18px 16px",
        }}>
          {q.shuffledOpts.map((opt, i) => (
            <button
              key={i}
              className={`opt-btn ${optStates[i] === "correct" ? "correct-pulse" : ""} ${optStates[i] === "wrong" ? "wrong-shake" : ""}`}
              onClick={() => pick(i)}
              disabled={gameState !== "playing"}
              style={getOptStyle(optStates[i], i)}
            >
              {getOptIcon(optStates[i])}
              <span>{opt}</span>
            </button>
          ))}
        </div>

        {/* Reveal panel */}
        {showReveal && (
          <div className="reveal-slide" style={{ padding: "0 18px 18px" }}>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 14,
              padding: "16px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 3 }}>
                {q.name}
              </div>
              <div style={{
                fontSize: 11,
                color: catColor.text,
                fontFamily: "monospace",
                marginBottom: 12,
                letterSpacing: "0.02em",
              }}>
                {q.year}
              </div>
              <div style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginBottom: 12,
              }}>
                {q.story}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {q.facts.map((f, i) => (
                  <div key={i} style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    padding: "7px 11px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    gap: 8,
                    lineHeight: 1.5,
                  }}>
                    <span style={{ color: catColor.text, flexShrink: 0, fontWeight: 700 }}>—</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Nav row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px 16px",
          gap: 8,
        }}>
          <button
            onClick={skip}
            disabled={gameState === "answered"}
            style={{
              fontSize: 13,
              color: gameState === "answered" ? "transparent" : "rgba(255,255,255,0.3)",
              border: "none",
              background: "none",
              cursor: gameState === "answered" ? "default" : "pointer",
              padding: "8px 0",
              transition: "all 0.2s",
            }}
          >
            Skip
          </button>

          <button
            onClick={next}
            disabled={gameState === "playing"}
            style={{
              padding: "10px 28px",
              borderRadius: 12,
              border: "none",
              background: gameState === "answered"
                ? "linear-gradient(135deg, #7c6fff 0%, #534AB7 100%)"
                : "rgba(255,255,255,0.05)",
              color: gameState === "answered" ? "#fff" : "rgba(255,255,255,0.2)",
              fontSize: 14,
              fontWeight: 700,
              cursor: gameState === "answered" ? "pointer" : "default",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: gameState === "answered" ? "0 4px 20px rgba(124,111,255,0.4)" : "none",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              if (gameState === "answered") {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(124,111,255,0.5)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = gameState === "answered" ? "0 4px 20px rgba(124,111,255,0.4)" : "none";
            }}
          >
            {cur + 1 >= questions.length && gameState === "answered" ? "See Results" : "Next →"}
          </button>
        </div>
      </div>

      {/* Bottom mini stats */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        paddingTop: 8,
      }}>
        {[
          { label: "Answered", value: cur + (gameState === "answered" ? 1 : 0) },
          { label: "Correct", value: score },
          { label: "Remaining", value: questions.length - cur - (gameState === "answered" ? 1 : 0) },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
