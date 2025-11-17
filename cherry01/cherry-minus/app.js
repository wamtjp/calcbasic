const { useState, useEffect, useRef } = React;

// --- 問題を生成する関数 (ひき算用) ---
const generateProblem = (previousProblem = null) => {
  let num1, num2;
  do {
    // ★問題の難易度を変えたい場合は、ここの数値を変更
    // num1: 11〜18の数を生成
    num1 = Math.floor(Math.random() * 8) + 11;
    // num2: num1から引いたときに繰り下がりが発生する数を生成
    const minNum2 = (num1 % 10) + 1;
    num2 = Math.floor(Math.random() * (9 - minNum2 + 1)) + minNum2;
  } while (previousProblem && previousProblem.num1 === num1 && previousProblem.num2 === num2);

  // --- 計算の答えを定義 ---
  const remainder1 = num1 % 10; // さくらんぼ2 (13なら3)
  const intermediateAnswer = 10 - num2; // 中間計算の答え (10-5=5)

  return {
    num1, // 問題の数字1 (例: 13)
    num2, // 問題の数字2 (例: 5)
    sakuranbo1: 10, // さくらんぼ1 (常に10)
    sakuranbo2: remainder1, // さくらんぼ2
    intermediateAnswer, // 中間計算の答え
    answer: num1 - num2, // 最終的な答え
  };
};

// --- メインのアプリケーションコンポーネント ---
function App() {
  // --- state管理 (アプリの状態を記憶する変数) ---
  const [problem, setProblem] = useState(generateProblem());
  const [step, setStep] = useState(0);
  const [sakuranbo1, setSakuranbo1] = useState('');
  const [sakuranbo2, setSakuranbo2] = useState('');
  const [intermediateAnswer, setIntermediateAnswer] = useState('');
  const [finalAnswer, setFinalAnswer] = useState('');

  // --- DOM要素への参照 ---
  const sakuranbo1Ref = useRef(null);
  const sakuranbo2Ref = useRef(null);
  const intermediateRef = useRef(null);
  const finalAnswerRef = useRef(null);
  const targetNumberRef = useRef(null);
  const containerRef = useRef(null);

  const [lineStartX, setLineStartX] = useState(0); // さくらんぼの枝の開始X座標

  // --- ステップが進んだら、次の入力欄に自動でフォーカスを移動させる ---
  useEffect(() => {
    if (step === 1) sakuranbo1Ref.current.focus();
    if (step === 2) sakuranbo2Ref.current.focus();
    if (step === 3) intermediateRef.current.focus();
    if (step === 4) finalAnswerRef.current.focus();
  }, [step]);

  // --- 問題が変わったら、さくらんぼの枝の開始位置を再計算する ---
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

  // --- 「次の問題へ」ボタンが押されたときの処理 ---
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

  // --- 入力欄の値が変更されたときの処理 ---
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

  // --- 画面に表示する内容 ---
  return (
    <div ref={containerRef}>
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
      
      <div className="hint-container">
        {/* ステップ4のときだけヒントを表示 */}
        {step === 4 && (
          <span className="hint-text highlight-step4">{intermediateAnswer} + {sakuranbo2} = ?</span>
        )}
      </div>

      <div className="sakuranbo-container">
        {/* ★さくらんぼの枝の位置や角度を調整したい場合は、ここの数値を変更 */}
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
      
      <div className="intermediate-step">
        <input
          ref={intermediateRef}
          type="number"
          value={intermediateAnswer}
          onChange={handleIntermediateChange}
          disabled={step !== 3}
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
