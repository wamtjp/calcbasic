const { useState, useEffect, useRef } = React;

// --- 問題を生成する関数 ---
const generateProblem = () => {
  // ★問題の難易度を変えたい場合は、ここの数値を変更
  // num1: 11〜18の数を生成
  const num1 = Math.floor(Math.random() * 8) + 11;
  const num1_one = num1 % 10;
  // num2: num1から引いたときに繰り下がりが発生する1桁の数を生成
  const num2 = Math.floor(Math.random() * (9 - num1_one)) + num1_one + 1;

  return {
    num1, // 問題の数字1 (例: 13)
    num1_ten: Math.floor(num1 / 10), // 13の「1」
    num1_one: num1_one,              // 13の「3」
    num2, // 問題の数字2 (例: 6)
    sakuranbo1: 10, // 答え1 (常に10)
    sakuranbo2: num1_one, // 答え2 (13の3)
    intermediate: 10 - num2, // 答え3 (10-6=4)
    answer: num1 - num2, // 最終的な答え (13-6=7)
  };
};

// --- メインのアプリケーションコンポーネント ---
function App() {
  // --- state管理 ---
  const [problem, setProblem] = useState(generateProblem());
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    sakuranbo1: '',
    sakuranbo2: '',
    intermediate: '',
    answer: '',
  });

  // --- DOM要素への参照 ---
  const inputRefs = {
    sakuranbo1: useRef(null),
    sakuranbo2: useRef(null),
    intermediate: useRef(null),
    answer: useRef(null),
  };

  // --- ステップが進んだら、次の入力欄に自動でフォーカスを移動 ---
  useEffect(() => {
    const focusMap = { 1: 'sakuranbo1', 2: 'sakuranbo2', 3: 'intermediate', 4: 'answer' };
    const refToFocus = inputRefs[focusMap[step]];
    if (refToFocus && refToFocus.current) refToFocus.current.focus();
  }, [step]);

  // --- 入力ハンドラ ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return;
    setInputs(prev => ({ ...prev, [name]: value }));
    // 正解判定とステップの進行
    if (name === 'sakuranbo1' && value === String(problem.sakuranbo1)) setStep(2);
    if (name === 'sakuranbo2' && value === String(problem.sakuranbo2)) setStep(3);
    if (name === 'intermediate' && value === String(problem.intermediate)) setStep(4);
    if (name === 'answer' && value === String(problem.answer)) setStep(5);
  };

  // --- 「次の問題へ」ボタンが押されたときの処理 ---
  const goToNextProblem = () => {
    setProblem(generateProblem());
    setInputs({ sakuranbo1: '', sakuranbo2: '', intermediate: '', answer: '' });
    setStep(1);
  };

  // --- 画面に表示する内容 ---
  return (
    <div>
      <div className="calculation-container">
        {/* 筆算エリア */}
        <div className="grid-item num1-ten">{problem.num1_ten}</div>
        <div className="grid-item num1-one">{problem.num1_one}</div>
        <div className="grid-item operator">-</div>
        <div className="grid-item num2-one">{problem.num2}</div>
        <div className="hissan-line"></div>
        <div className="grid-item answer-one">
          <input ref={inputRefs.answer} name="answer" type="number" value={inputs.answer} onChange={handleInputChange} disabled={step < 4} />
        </div>

        {/* 入力エリア */}
        <div className="grid-item sakuranbo1">
          <input ref={inputRefs.sakuranbo1} name="sakuranbo1" type="number" value={inputs.sakuranbo1} onChange={handleInputChange} disabled={step !== 1} />
        </div>
        <div className="grid-item sakuranbo2">
          <input ref={inputRefs.sakuranbo2} name="sakuranbo2" type="number" value={inputs.sakuranbo2} onChange={handleInputChange} disabled={step !== 2} />
        </div>
        <div className="grid-item intermediate">
          <input ref={inputRefs.intermediate} name="intermediate" type="number" value={inputs.intermediate} onChange={handleInputChange} disabled={step !== 3} />
        </div>

        {/* --- 枝の描画エリア (ユーザー指定の最終版) --- */}
        {/* SVGの座標は、左上が原点(0,0)です。xが大きいほど右に、yが大きいほど下になります。 */}
        <svg className="line-svg">
            {/* --- 枝1: num1(13) から さくらんぼ(10, 3) へ --- */}
            
            {/* 1-1: 筆算エリアの右側から、さくらんぼエリアの中間分岐点へ向かう斜めの線 */}
            {/* (x1,y1)が始点, (x2,y2)が終点です */}
            <line x1="375" y1="150" x2="460" y2="100" stroke="black" strokeWidth="2" />
            
            {/* 1-2: 中間分岐点から、上の入力箱（さくらんぼ1）へ向かう斜めの線 */}
            <line x1="460" y1="100" x2="490" y2="50"  stroke="black" strokeWidth="2" />
            
            {/* 1-3: 中間分岐点から、下の入力箱（さくらんぼ2）へ向かう斜めの線 */}
            <line x1="460" y1="100" x2="490" y2="150" stroke="black" strokeWidth="2" />
            
            
            {/* --- 枝2: num2(6) から 中間計算(4) へ --- */}
            
            {/* 2-1: 筆算エリアの右側から、中間計算の入力箱へ向かう水平の線 */}
            <line x1="375" y1="250" x2="490" y2="250" stroke="black" strokeWidth="2" />
        </svg>
      </div>

      {/* フィードバック */}
      <div className="feedback">
        {step === 5 && (
          <div>
            <span>せいかい！🎉</span>
            <button className="next-button" onClick={goToNextProblem}>つぎのもんだいへ</button>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
