const { useState, useEffect, useRef } = React;

// --- 問題を生成する関数 (ひき算用) ---
// (変更なし)
const generateProblem = (previousProblem = null) => {
  let num1, num2;
  do {
    num1 = Math.floor(Math.random() * 8) + 11;
    const minNum2 = (num1 % 10) + 1;
    num2 = Math.floor(Math.random() * (9 - minNum2 + 1)) + minNum2;
  } while (previousProblem && previousProblem.num1 === num1 && previousProblem.num2 === num2);

  const remainder1 = num1 % 10;
  const intermediateAnswer = 10 - num2;

  return {
    num1,
    num2,
    sakuranbo1: 10,
    sakuranbo2: remainder1,
    intermediateAnswer,
    answer: num1 - num2,
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
  const [intermediateAnswer, setIntermediateAnswer] = useState('');
  const [finalAnswer, setFinalAnswer] = useState('');
  const [lineStartX, setLineStartX] = useState(0);

  const sakuranbo1Ref = useRef(null);
  const sakuranbo2Ref = useRef(null);
  const intermediateRef = useRef(null);
  const finalAnswerRef = useRef(null);
  const targetNumberRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (step === 1) sakuranbo1Ref.current.focus();
    if (step === 2) sakuranbo2Ref.current.focus();
    if (step === 3) intermediateRef.current.focus();
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
    setIntermediateAnswer('');
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
    if (val === String(problem.sakuranbo1)) setStep(2);
  };
  const handleSakuranbo2Change = (e) => {
    const val = e.target.value;
    setSakuranbo2(val);
    if (val === String(problem.sakuranbo2)) setStep(3);
  };
  const handleIntermediateChange = (e) => {
    const val = e.target.value;
    setIntermediateAnswer(val);
    if (val === String(problem.intermediateAnswer)) setStep(4);
  };
  const handleFinalAnswerChange = (e) => {
    const val = e.target.value;
    setFinalAnswer(val);
    if (val === String(problem.answer)) setStep(5);
  };

  return (
    <div ref={containerRef}>
      {/* 【ここから変更】 問題の式の部分に span を追加 */}
      <div className="problem">
        <span className="target-number" ref={targetNumberRef}>
          {problem.num1}
        </span>
        <span className={`problem-operator ${step === 3 ? 'highlight-step3' : ''}`}>
          - {problem.num2}
        </span>
        <span className="problem-equal"> = </span>
        <input
          ref={finalAnswerRef}
          type="number"
          className="final-answer-input"
          value={finalAnswer}
          onChange={handleFinalAnswerChange}
          disabled={step < 4}
        />
      </div>
      {/* 【ここまで変更】 */}
      
      <div className="hint-container">
        {step === 4 && (
          <span className="hint-text highlight-step4">{intermediateAnswer} + {sakuranbo2} = ?</span>
        )}
      </div>

      <div className="sakuranbo-container">
        <svg className="sakuranbo-svg" viewBox="0 0 500 150">
          <line x1={lineStartX-30} y1="0" x2={lineStartX - 60-30} y2="60" stroke="black" strokeWidth="2" />
          <line x1={lineStartX-30} y1="0" x2={lineStartX + 60-30} y2="60" stroke="black" strokeWidth="2" />
        </svg>
        <div className="sakuranbo-inputs">
          <input
            ref={sakuranbo1Ref}
            type="number"
            value={sakuranbo1}
            onChange={handleSakuranbo1Change}
            disabled={step !== 1}
            placeholder={String(problem.sakuranbo1)}
            className={step >= 3 ? 'highlight-step3' : ''}
          />
          <input
            ref={sakuranbo2Ref}
            type="number"
            value={sakuranbo2}
            onChange={handleSakuranbo2Change}
            disabled={step !== 2}
            className={step === 4 ? 'highlight-step4' : ''}
          />
        </div>
      </div>
      
      <div className="intermediate-step">
        <input
          ref={intermediateRef}
          type="number"
          value={intermediateAnswer}
          onChange={handleIntermediateChange}
          disabled={step !== 3}
          /*  placeholder={step === 3 ? '?' : ''} ? を非表示に*/
          placeholder={step === 3 ? '' : ''}
          className={`intermediate-input ${step === 4 ? 'highlight-step4' : ''}`}
        />
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
