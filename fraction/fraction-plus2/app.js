const { useState, useEffect, useRef } = React;

// --- 問題リストを格納する変数 ---
let problemList = [];

// --- problems.txtを読み込む関数 ---
const loadProblems = async () => {
  try {
    const response = await fetch('problems.txt');
    const text = await response.text();
    const lines = text.trim().split('\n');
    
    problemList = lines.map(line => {
      const [frac1_num, frac1_den, frac2_num, frac2_den, answer_num, answer_den] = line.split(',').map(Number);
      
      // 通分後の分子を計算
      const commonDen = answer_den;
      const converted1_num = frac1_num * (commonDen / frac1_den);
      const converted2_num = frac2_num * (commonDen / frac2_den);
      
      return {
        frac1_num,
        frac1_den,
        frac2_num,
        frac2_den,
        commonDen,
        converted1_num,
        converted2_num,
        answer_num,
        answer_den,
      };
    });
  } catch (error) {
    console.error('問題ファイルの読み込みに失敗しました:', error);
    // フォールバック：デフォルトの問題を1つ用意
    problemList = [{
      frac1_num: 1,
      frac1_den: 2,
      frac2_num: 1,
      frac2_den: 3,
      commonDen: 6,
      converted1_num: 3,
      converted2_num: 2,
      answer_num: 5,
      answer_den: 6,
    }];
  }
};

// --- ランダムに問題を選ぶ関数 ---
const getRandomProblem = () => {
  if (problemList.length === 0) {
    // フォールバック
    return {
      frac1_num: 1,
      frac1_den: 2,
      frac2_num: 1,
      frac2_den: 3,
      commonDen: 6,
      converted1_num: 3,
      converted2_num: 2,
      answer_num: 5,
      answer_den: 6,
    };
  }
  const randomIndex = Math.floor(Math.random() * problemList.length);
  return problemList[randomIndex];
};

// --- メインのアプリケーションコンポーネント ---
function App() {
  const [problem, setProblem] = useState(null);
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

  // 初回読み込み時に問題リストを読み込む
  useEffect(() => {
    loadProblems().then(() => {
      setProblem(getRandomProblem());
    });
  }, []);

  // ステップに応じてフォーカスを移動
  useEffect(() => {
    if (!problem) return;
    
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
  }, [step, problem]);

  // 入力ハンドラ
  const handleInputChange = (e) => {
    if (!problem) return;
    
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
    setProblem(getRandomProblem());
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

  // 問題が読み込まれるまで待機
  if (!problem) {
    return <div>読み込み中...</div>;
  }

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
