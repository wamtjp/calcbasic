const { useState, useEffect, useRef } = React;

// --- 問題を生成する関数 ---
// 繰り上がりが必ず発生する1桁のたし算を生成する
const generateProblem = (previousProblem = null) => {
  let num1, num2;
  do {
    // 6から9までの数字をランダムに選ぶ
    num1 = Math.floor(Math.random() * 4) + 6; 
    // 10からnum1を引いた数より大きい数字をランダムに選ぶ
    // (例: num1が7なら、3より大きい4〜9の数字を選ぶ)
    const minNum2 = 11 - num1;
    num2 = Math.floor(Math.random() * (9 - minNum2 + 1)) + minNum2;
  } while (previousProblem && previousProblem.num1 === num1 && previousProblem.num2 === num2); // 前回と同じ問題なら再生成

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
  // --- State管理 ---
  const [problem, setProblem] = useState(generateProblem()); // 問題全体をstateで管理
  const [step, setStep] = useState(0);
  const [sakuranbo1, setSakuranbo1] = useState('');
  const [sakuranbo2, setSakuranbo2] = useState('');
  const [intermediate, setIntermediate] = useState('10');
  const [finalAnswer, setFinalAnswer] = useState('');
  const [lineStartX, setLineStartX] = useState(250);

  // --- DOM要素への参照 ---
  const sakuranbo1Ref = useRef(null);
  const sakuranbo2Ref = useRef(null);
  const finalAnswerRef = useRef(null);
  const targetNumberRef = useRef(null);
  const containerRef = useRef(null);

  // --- エフェクトフック ---
  // ステップに応じたフォーカス移動
  useEffect(() => {
    if (step === 1) sakuranbo1Ref.current.focus();
    if (step === 2) sakuranbo2Ref.current.focus();
    if (step === 4) finalAnswerRef.current.focus();
  }, [step]);

  // 問題が変わるたびに、線の座標を再計算
  useEffect(() => {
    // 少し待たないと正しい座標が取れない場合があるためsetTimeoutを使用
    setTimeout(() => {
      if (targetNumberRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const targetRect = targetNumberRef.current.getBoundingClientRect();
        const targetCenterX = targetRect.left + targetRect.width / 2 - containerRect.left;
        setLineStartX(targetCenterX);
      }
    }, 0);
  }, [problem]); // problemが変更されたときに実行

  // --- 初期化・次の問題へ進む処理 ---
  const goToNextProblem = () => {
    setProblem(prev => generateProblem(prev)); // 前回と同じ問題が出ないようにする
    setStep(1);
    setSakuranbo1('');
    setSakuranbo2('');
    setIntermediate('10');
    setFinalAnswer('');
  };
  
  // 最初の読み込み時に初期化
  useEffect(() => {
    setStep(1);
  }, []);

  // --- 入力ハンドラ ---
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
        <span className="target-number" ref={targetNumberRef}>{problem.num2}</span>
        <span> = {step === 5 ? finalAnswer : '?'}</span>
      </div>

      <div className="sakuranbo-container">
        <svg className="sakuranbo-svg" viewBox="0 0 500 100">
          <line x1={lineStartX} y1="0" x2={lineStartX - 60} y2="60" stroke="black" strokeWidth="2" />
          <line x1={lineStartX} y1="0" x2={lineStartX + 60} y2="60" stroke="black" strokeWidth="2" />
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

      <div className="steps-container">
        {step >= 4 && (
          <div>
            <span className="highlight-step4">{intermediate} + {sakuranbo2} = </span>
            <input
              ref={finalAnswerRef}
              type="number"
              value={finalAnswer}
              onChange={handleFinalAnswerChange}
              disabled={step !== 4}
            />
          </div>
        )}
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
