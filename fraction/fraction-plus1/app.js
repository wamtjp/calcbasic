const { useState, useEffect, useRef } = React;

// --- GCD（最大公約数）を求める関数 ---
const gcd = (a, b) => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

// --- 問題を生成する関数 ---
const generateProblem = () => {
  let frac1_num, frac1_den, frac2_num, frac2_den;
  let commonDen, converted1_num, converted2_num, answer_num;
  
  // 条件を満たす問題が見つかるまで繰り返す
  let attempts = 0;
  while (attempts < 1000) {
    // 分母は2〜9のランダムな数
    frac1_den = Math.floor(Math.random() * 8) + 2;
    frac2_den = Math.floor(Math.random() * 8) + 2;
    
    // 分母が異なることを確認（通分が必要）
    if (frac1_den === frac2_den) continue;
    
    // 分子は1〜(分母-1)のランダムな数
    frac1_num = Math.floor(Math.random() * (frac1_den - 1)) + 1;
    frac2_num = Math.floor(Math.random() * (frac2_den - 1)) + 1;
    
    // 通分後の分母（最小公倍数）を計算
    commonDen = (frac1_den * frac2_den) / gcd(frac1_den, frac2_den);
    
    // 通分後の分母が1桁であることを確認
    if (commonDen > 9) continue;
    
    // 通分後の分子を計算
    converted1_num = frac1_num * (commonDen / frac1_den);
    converted2_num = frac2_num * (commonDen / frac2_den);
    
    // 答えの分子を計算
    answer_num = converted1_num + converted2_num;
    
    // 答えの分子が1桁であることを確認
    if (answer_num > 9) continue;
    
    // 答えが約分できないことを確認（分子と分母の最大公約数が1）
    if (gcd(answer_num, commonDen) !== 1) continue;
    
    // すべての条件を満たした
    return {
      frac1_num,
      frac1_den,
      frac2_num,
      frac2_den,
      commonDen,
      converted1_num,
      converted2_num,
      answer_num,
      answer_den: commonDen,
    };
  }
  
  // 条件を満たす問題が見つからなかった場合のフォールバック
  return {
    frac1_num: 1,
    frac1_den: 3,
    frac2_num: 1,
    frac2_den: 2,
    commonDen: 6,
    converted1_num: 2,
    converted2_num: 3,
    answer_num: 5,
    answer_den: 6,
  };
};

// --- メインのアプリケーションコンポーネント ---
function App() {
  const [problem, setProblem] = useState(generateProblem());
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    input1: '', // 通分後の分母（1回目）
    input2: '', // 通分後の分子（1つ目の分数）
    input3: '', // 通分後の分母（2回目）
    input4: '', // 通分後の分子（2つ目の分数）
    input5: '', // 答えの分母
    input6: '', // 答えの分子
  });

  const inputRefs = {
    input1: useRef(null),
    input2: useRef(null),
    input3: useRef(null),
    input4: useRef(null),
    input5: useRef(null),
    input6: useRef(null),
  };

  // ステップに応じてフォーカスを移動
  useEffect(() => {
    const focusMap = {
      1: 'input1',
      2: 'input2',
      3: 'input3',
      4: 'input4',
      5: 'input5',
      6: 'input6',
    };
    const refToFocus = inputRefs[focusMap[step]];
    if (refToFocus && refToFocus.current) {
      refToFocus.current.focus();
    }
  }, [step]);

  // 入力ハンドラ
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return; // 数字以外は入力させない

    setInputs(prev => ({ ...prev, [name]: value }));

    // 正解判定とステップの進行
    if (name === 'input1' && value === String(problem.commonDen)) setStep(2);
    if (name === 'input2' && value === String(problem.converted1_num)) setStep(3);
    if (name === 'input3' && value === String(problem.commonDen)) setStep(4);
    if (name === 'input4' && value === String(problem.converted2_num)) setStep(5);
    if (name === 'input5' && value === String(problem.answer_den)) setStep(6);
    if (name === 'input6' && value === String(problem.answer_num)) setStep(7);
  };

  // 次の問題へ
  const goToNextProblem = () => {
    setProblem(generateProblem());
    setInputs({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
    });
    setStep(1);
  };

  return (
    <div>
      <div className="problem-container">
        {/* 元の問題 */}
        <div className="fraction">
          <div className="fraction-numerator">{problem.frac1_num}</div>
          <div className="fraction-line"></div>
          <div className="fraction-denominator">{problem.frac1_den}</div>
        </div>
        
        <span className="operator">+</span>
        
        <div className="fraction">
          <div className="fraction-numerator">{problem.frac2_num}</div>
          <div className="fraction-line"></div>
          <div className="fraction-denominator">{problem.frac2_den}</div>
        </div>
        
        <span className="operator">=</span>
        
        {/* 通分後の式 */}
        <div className="fraction">
          <div className="fraction-numerator">
            <input
              ref={inputRefs.input2}
              name="input2"
              type="number"
              value={inputs.input2}
              onChange={handleInputChange}
              disabled={step !== 2}
            />
          </div>
          <div className="fraction-line"></div>
          <div className="fraction-denominator">
            <input
              ref={inputRefs.input1}
              name="input1"
              type="number"
              value={inputs.input1}
              onChange={handleInputChange}
              disabled={step !== 1}
            />
          </div>
        </div>
        
        <span className="operator">+</span>
        
        <div className="fraction">
          <div className="fraction-numerator">
            <input
              ref={inputRefs.input4}
              name="input4"
              type="number"
              value={inputs.input4}
              onChange={handleInputChange}
              disabled={step !== 4}
            />
          </div>
          <div className="fraction-line"></div>
          <div className="fraction-denominator">
            <input
              ref={inputRefs.input3}
              name="input3"
              type="number"
              value={inputs.input3}
              onChange={handleInputChange}
              disabled={step !== 3}
            />
          </div>
        </div>
        
        <span className="operator">=</span>
        
        {/* 答え */}
        <div className="fraction">
          <div className="fraction-numerator">
            <input
              ref={inputRefs.input6}
              name="input6"
              type="number"
              value={inputs.input6}
              onChange={handleInputChange}
              disabled={step !== 6}
            />
          </div>
          <div className="fraction-line"></div>
          <div className="fraction-denominator">
            <input
              ref={inputRefs.input5}
              name="input5"
              type="number"
              value={inputs.input5}
              onChange={handleInputChange}
              disabled={step !== 5}
            />
          </div>
        </div>
      </div>

      {/* フィードバック */}
      <div className="feedback">
        {step === 7 && (
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
