const { useState, useEffect, useRef } = React;

// --- 問題を生成する関数 ---
// (変更なし)
const generateProblem = (previousProblem = null) => {
  let num1, num2;
  do {
    num1 = Math.floor(Math.random() * 4) + 6;
    const minNum2 = 11 - num1;
    num2 = Math.floor(Math.random() * (9 - minNum2 + 1)) + minNum2;
  } while (previousProblem && previousProblem.num1 === num1 && previousProblem.num2 === num2);

  const neededFor10 = 10 - num1;
  const remainder = num2 - neededFor10;

  return {
    num1,
    num2,
    neededFor10,
    remainder,
    answer: num1 + num2,
  };
};

// --- メインのアプリケーションコンポーネント ---
function App() {
  // --- State管理, DOM参照, エフェクトフック ---
  // (変更なし)
  const [problem, setProblem] = useState(generateProblem());
  const [step, setStep] = useState(0);
  const [sakuranbo1, setSakuranbo1] = useState('');
  const [sakuranbo2, setSakuranbo2] = useState('');
  const [finalAnswer, setFinalAnswer] = useState('');
  const [lineStartX, setLineStartX] = useState(0);

  const sakuranbo1Ref = useRef(null);
  const sakuranbo2Ref = useRef(null);
  const finalAnswerRef = useRef(null);
  const targetNumberRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (step === 1) sakuranbo1Ref.current.focus();
    if (step === 2) sakuranbo2Ref.current.focus();
    if (step === 4) finalAnswerRef.current.focus();
  }, [step]);

  useEffect(() => {
    setTimeout(() => {
      if (targetNumberRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const targetRect = targetNumberRef.current.getBoundingClientRect();
        const targetCenterX = targetRect.left + targetRect.width / 2 - containerRect.left;
        setLineStartX(targetCenterX);
      }
    }, 0);
  }, [problem]);

  // --- 初期化・次の問題へ進む処理 ---
  // (変更なし)
  const goToNextProblem = () => {
    setProblem(prev => generateProblem(prev));
    setStep(1);
    setSakuranbo1('');
    setSakuranbo2('');
    setFinalAnswer('');
  };
  
  useEffect(() => {
    setStep(1);
  }, []);

  // --- 入力ハンドラ ---
  // (変更なし)
  const handleSakuranbo1Change = (e) => {
    const val = e.target.value;
    setSakuranbo1(val);
    if (val === String(problem.neededFor10)) setStep(2);
  };
  const handleSakuranbo2Change = (e) => {
    const val = e.target.value;
    setSakuranbo2(val);
    if (val === String(problem.remainder)) setStep(4);
  };
  const handleFinalAnswerChange = (e) => {
    const val = e.target.value;
    setFinalAnswer(val);
    if (val === String(problem.answer)) setStep(5);
  };

  return (
    <div ref={containerRef}>
      <div className="problem">
        <span className={step >= 2 ? 'highlight-step3' : ''}>{problem.num1} + </span>
        <span className="target-number" ref={targetNumberRef}>
          {problem.num2}
        </span>
        <span> = </span>
        <input
          ref={finalAnswerRef}
          type="number"
          className="final-answer-input"
          value={finalAnswer}
          onChange={handleFinalAnswerChange}
          disabled={step < 4}
        />
      </div>
      
      <div className="hint-container">
        {step >= 4 && step < 5 && (
          <span className="hint-text highlight-step4">10 + {sakuranbo2} = ?</span>
        )}
      </div>

      <div className="sakuranbo-container">
        <svg className="sakuranbo-svg" viewBox="0 0 500 150">
          {/* 左の枝は変更なし */}
          <line x1={lineStartX} y1="0" x2={lineStartX - 60} y2="60" stroke="black" strokeWidth="2" />
          {/* 【ここを変更】右の枝の終点(x2)を少し左にずらす (60 -> 50) */}
          <line x1={lineStartX} y1="0" x2={lineStartX + 50} y2="60" stroke="black" strokeWidth="2" />
        </svg>
        <div className="sakuranbo-inputs">
          <input
            ref={sakuranbo1Ref}
            type="number"
            value={sakuranbo1}
            onChange={handleSakuranbo1Change}
            disabled={step !== 1}
            placeholder={String(problem.neededFor10)}
          />
          <input
            ref={sakuranbo2Ref}
            type="number"
            value={sakuranbo2}
            onChange={handleSakuranbo2Change}
            disabled={step !== 2}
          />
        </div>
      </div>

      <div className="feedback">
        {step === 5 && (
          <div>
            <span>せいかい！🎉</span>
            <button className="next-button" onClick={goToNextProblem}>
              つぎのもんだいへ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
