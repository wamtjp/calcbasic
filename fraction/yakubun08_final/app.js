const { useState, useEffect, useRef } = React;

// --- 問題リスト ---
let problemList = [];

// --- problem.txt 読込 ---
const loadProblems = async () => {
  try {
    const response = await fetch('problem.txt');
    const text = await response.text();
    problemList = text
      .trim()
      .split('\n')
      .map(line => {
        const [num, den, ansNum, ansDen] = line.split(',').map(Number);
        return { num, den, ansNum, ansDen };
      });
  } catch (error) {
    console.error('problem.txt 読み込み失敗', error);
    problemList = [{ num: 2, den: 4, ansNum: 1, ansDen: 2 }];
  }
};

// --- ランダム問題取得 ---
const getRandomProblem = () => {
  if (problemList.length === 0) return { num: 2, den: 4, ansNum: 1, ansDen: 2 };
  return problemList[Math.floor(Math.random() * problemList.length)];
};

// --- メインコンポーネント ---
function App() {
  const [problem, setProblem] = useState(null);
  const [step, setStep] = useState(1); // 1: 分母入力中, 2: 分子入力中, 3: 正解
  const [inputs, setInputs] = useState({ den: '', num: '' });

  const denRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    loadProblems().then(() => setProblem(getRandomProblem()));
  }, []);

  useEffect(() => {
    if (!problem) return;
    if (step === 1) denRef.current?.focus();
    else if (step === 2) numRef.current?.focus();
  }, [step, problem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return;
    setInputs(prev => ({ ...prev, [name]: value }));

    const val = parseInt(value, 10);
    if (name === 'den' && val === problem.ansDen) setStep(2);
    if (name === 'num' && val === problem.ansNum) setStep(3);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      const denVal = parseInt(inputs.den, 10);
      const numVal = parseInt(inputs.num, 10);
      if (denVal === problem.ansDen && numVal === problem.ansNum) setStep(3);
      else setStep(denVal === problem.ansDen ? 2 : 1);
    }
  };

  const goNextProblem = () => {
    const next = getRandomProblem();
    setProblem(next);
    setInputs({ den: '', num: '' });
    setStep(1);
  };

  if (!problem) return <div>読み込み中...</div>;

  return (
    <div>
      <div className="problem-container">
        {/* 元の分数 */}
        <div className="fraction">
          <div className="fraction-numerator">{problem.num}</div>
          <div className="fraction-line"></div>
          <div className="fraction-denominator">{problem.den}</div>
        </div>

        <span className="operator">=</span>

        {/* 解答欄（分母→分子） */}
        <div className="fraction">
          <div className="fraction-numerator">
            <input
              ref={numRef}
              name="num"
              type="number"
              value={inputs.num}
              onChange={handleInputChange}
              onKeyDown={handleKey}
              disabled={step !== 2 && step !== 3}
            />
          </div>
          <div className="fraction-line"></div>
          <div className="fraction-denominator">
            <input
              ref={denRef}
              name="den"
              type="number"
              value={inputs.den}
              onChange={handleInputChange}
              onKeyDown={handleKey}
              disabled={step !== 1 && step !== 3}
            />
          </div>
        </div>
      </div>

      <div className="feedback">
        {step === 3 && (
          <div>
            <span>せいかい！🎉</span>
            <button className="next-button" onClick={goNextProblem}>つぎのもんだいへ</button>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
