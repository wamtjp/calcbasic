const { useState, useEffect, useRef } = React;

// --- 問題を生成する関数 ---
const generateProblem = () => {
  // ★問題の難易度を変えたい場合は、ここの数値を変更
  // num1: 2〜9の数を生成
  const num1 = Math.floor(Math.random() * 8) + 2;
  // num2: num1と足して10を超える数を生成
  const num2 = Math.floor(Math.random() * (9 - (10 - num1))) + (10 - num1) + 1;
  
  const neededFor10 = 10 - num1; // さくらんぼ1 (8に対して2)
  const remainder = num2 - neededFor10; // さくらんぼ2 (3-2=1)
  const answer = num1 + num2;

  return {
    num1, // 問題の数字1 (例: 8)
    num2, // 問題の数字2 (例: 3)
    neededFor10, // 答え1
    remainder,   // 答え2
    answerOne: answer % 10, // 答えの一の位 (例: 1)
    answerTen: Math.floor(answer / 10), // 答えの十の位 (例: 1)
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
    answerOne: '',
    answerTen: '',
  });
  
  // --- DOM要素への参照 ---
  const inputRefs = {
    sakuranbo1: useRef(null),
    sakuranbo2: useRef(null),
    answerOne: useRef(null),
    answerTen: useRef(null),
  };

  // --- ステップが進んだら、次の入力欄に自動でフォーカスを移動 ---
  useEffect(() => {
    const focusMap = {
      1: 'sakuranbo1',
      2: 'sakuranbo2',
      3: 'answerOne',
      4: 'answerTen',
    };
    const refToFocus = inputRefs[focusMap[step]];
    if (refToFocus && refToFocus.current) {
      refToFocus.current.focus();
    }
  }, [step]);

  // --- 入力ハンドラ ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return; // 数字以外は入力させない

    setInputs(prev => ({ ...prev, [name]: value }));

    // 正解判定とステップの進行
    if (name === 'sakuranbo1' && value === String(problem.neededFor10)) setStep(2);
    if (name === 'sakuranbo2' && value === String(problem.remainder)) setStep(3);
    if (name === 'answerOne' && value === String(problem.answerOne)) setStep(4);
    if (name === 'answerTen' && value === String(problem.answerTen)) setStep(5);
  };

  // --- 「次の問題へ」ボタンが押されたときの処理 ---
  const goToNextProblem = () => {
    setProblem(generateProblem());
    setInputs({ sakuranbo1: '', sakuranbo2: '', answerOne: '', answerTen: '' });
    setStep(1);
  };

  // --- 画面に表示する内容 ---
  return (
    <div>
      <div className="hissan-container">
        <div className="hissan-area">
          {/* 1行目 */}
          <div className="hissan-row">
            <div className="number"></div> {/* 十の位の空白 */}
            <div className="number">{problem.num1}</div>
          </div>
          {/* 2行目 */}
          <div className="hissan-row">
            <span className="operator">+</span>
            <div className="number">{problem.num2}</div>
          </div>
          {/* 横線 */}
          <div className="hissan-line"></div>
          {/* 答えの行 */}
          <div className="answer-area">
            <input
              ref={inputRefs.answerTen}
              name="answerTen"
              type="number"
              className="answer-input"
              value={inputs.answerTen}
              onChange={handleInputChange}
              disabled={step < 4}
            />
            <input
              ref={inputRefs.answerOne}
              name="answerOne"
              type="number"
              className="answer-input"
              value={inputs.answerOne}
              onChange={handleInputChange}
              disabled={step < 3}
            />
          </div>
        </div>

        {/* さくらんぼエリア */}
        <div className="sakuranbo-container">
          {/* ★さくらんぼの枝の位置や角度を調整したい場合は、ここの数値を変更 */}
          <svg className="sakuranbo-svg">
            <line x1="20" y1="30" x2="70" y2="80" stroke="black" strokeWidth="2" />
            <line x1="20" y1="30" x2="70" y2="140" stroke="black" strokeWidth="2" />
          </svg>
          <div className="sakuranbo-inputs">
            <input
              ref={inputRefs.sakuranbo1}
              name="sakuranbo1"
              type="number"
              className="sakuranbo"
              value={inputs.sakuranbo1}
              onChange={handleInputChange}
              disabled={step !== 1}
            />
            <input
              ref={inputRefs.sakuranbo2}
              name="sakuranbo2"
              type="number"
              className="sakuranbo"
              value={inputs.sakuranbo2}
              onChange={handleInputChange}
              disabled={step !== 2}
            />
          </div>
        </div>
      </div>

      {/* 正解フィードバック */}
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
