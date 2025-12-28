//v033
//九九の計算（１桁×１桁＝２）

//初期設定begin

//確認が必要な準備
num_MyAns = 3
MAXcontinuePoint = 3;
b_disp = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "-", "0", ".", "+"];
// b_real = ["7","8","9","4","5","6","1","2","3","-","0",".","+"]
NEXTnum = 20;
DELETE1num = 21;
btnNumNOW = 999;
//解答欄の高さ基準h
KaitouHeight = 1;
wProblem1 = 0;
wProblem2 = 0;
wOthers1 = 0;
wOthers2 = 0;
wMyanswer1 = 0;
wMyanswer2 = 0;

//記号など
tOthers1 = "x";
tOthers2 = "=";

//一応、確認が必要な準備
prb_a = [];
prb_b = [];
ans1 = [];
ans2 = [];
myAns = [];
myAns[0] = "";
myAns[1] = "";
myAns[2] = "";
ox = [];
ox[1] = "";
ox[2] = "";
nowRcnt = 0;
ans = [];
//	lbl=[];

//単なる準備
message = "かいとう";
mystatus = 1;
TRUE = 0;
FALSE = 1;
MID = 2;
flgALLresult = MID;
point1 = 0;
//t=[]

//初期設定end

ProblemData = [
  ["a", "b", "c", "d"],
  [6, 2, 1, 2],
  [7, 2, 1, 4],
  [8, 2, 1, 6],
  [9, 2, 1, 8],
  [4, 3, 1, 2],
  [5, 3, 1, 5],
  [6, 3, 1, 8],
  [7, 3, 2, 1],
  [8, 3, 2, 4],
  [9, 3, 2, 7],
  [3, 4, 1, 2],
  [4, 4, 1, 6],
  [6, 4, 2, 4],
  [7, 4, 2, 8],
  [8, 4, 3, 2],
  [9, 4, 3, 6],
  [3, 5, 1, 5],
  [5, 5, 2, 5],
  [7, 5, 3, 5],
  [9, 5, 4, 5],
  [2, 6, 1, 2],
  [3, 6, 1, 8],
  [4, 6, 2, 4],
  [6, 6, 3, 6],
  [7, 6, 4, 2],
  [8, 6, 4, 8],
  [9, 6, 5, 4],
  [2, 7, 1, 4],
  [3, 7, 2, 1],
  [4, 7, 2, 8],
  [5, 7, 3, 5],
  [6, 7, 4, 2],
  [7, 7, 4, 9],
  [8, 7, 5, 6],
  [9, 7, 6, 3],
  [2, 8, 1, 6],
  [3, 8, 2, 4],
  [4, 8, 3, 2],
  [6, 8, 4, 8],
  [7, 8, 5, 6],
  [8, 8, 6, 4],
  [9, 8, 7, 2],
  [2, 9, 1, 8],
  [3, 9, 2, 7],
  [4, 9, 3, 6],
  [5, 9, 4, 5],
  [6, 9, 5, 4],
  [7, 9, 6, 3],
  [8, 9, 7, 2],
  [9, 9, 8, 1],
];

function setup() {
  NOWversion = "0.33";
  createCanvas(window.innerWidth, window.innerHeight);
  u = int(window.innerHeight / 100);
  //	s=1;//拡大率
  s = u / 8; //拡大率
  W = u * 60;
  H = u * 100;
  w = u;
  h = u;
  r1 = u;
  W1 = -w * 4;
  H1 = 0;
  W2 = 0;
  H2 = u * 40;

  KaitouHeight = h * 18;
  wProblem1 = W1 + w * 8; //prb1
  wOthers1 = W1 + w * 14; //*
  wProblem2 = W1 + w * 20; //prb2
  wOthers2 = W1 + w * 26; //=

  wMyanswer1 = W1 + w * 32; //ans1
  wMyanswer2 = W1 + w * 40; //ans2

  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  FLG = "";

  // 不要？	init();
  makeProblem();
  choiceProblem();

  // 背景色をよりモダンな深い紺色に
  background(25, 35, 60);
}

function draw() {
  // 背景色を深い紺色のグラデーションに
  background(25, 35, 60);

  textSize(12 * s);
  fill(255, 255, 255);
  text("mystatus " + mystatus, w * 44, h * 94);
  dispProblem(); //問題表示
  dispOthers(); //記号など表示
  dispMyAnswer(); //自分の解答表示
  dispOxMessage(); //正解不正解〇× メッセージ表示
  dispScore(); //スコア表示
  dispButton(); //解答ボタン表示
}

function touchStarted() {
  btnNumNOW = buttonNumNOW();
  dealEachButton();
  return false;
}

//---------------------------------------------

function makeProblem() {
  //★★★問題・解答作成

  //for(let i=1; i<=5; i++){ //配列数★★★★★★
  //for(let i=1; i<=ProblemData[0].length; i++){
  for (let i = 1; i <= ProblemData.length - 1; i++) {
    prb_a[i] = ProblemData[i][0];
    prb_b[i] = ProblemData[i][1];

    ans1[i] = ProblemData[i][2];
    ans2[i] = ProblemData[i][3];
    console.log(
      i + "->>" + prb_a[i] + " x " + prb_b[i] + " = " + ans1[i] + " " + ans2[i]
    );
  }
}

function choiceProblem() {
  //★★★問題番号を乱数で決定(1～ProblemData.length でOK!)
  //nowRcnt=int(random(1,9));
  nowRcnt = int(random(1, ProblemData.length));
  let i = nowRcnt;
  console.log(nowRcnt + "->>" + prb_a[i] + " x " + prb_b[i]);
  ans[1] = ans1[nowRcnt];
  ans[2] = ans2[nowRcnt];
}

//---------------------------------------------

class makeLabelNoFill {
  constructor(_str, _tsize, _x, _y, _tR, _tG, _tB) {
    this.tstr = _str;
    this.x = _x;
    this.y = _y;
    this.tsize = _tsize;
    this.tR = _tR;
    this.tG = _tG;
    this.tB = _tB;
  }

  disp() {
    let YT = this.y;
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(this.tsize);
    fill(this.tR, this.tG, this.tB);
    text(this.tstr, this.x, YT);
  }
}

class lblProblem {
  constructor(_str, _x) {
    this.tstr = _str;
    this.x = _x;
    this.y = KaitouHeight;
    this.tsize = 50 * s;
    this.tR = 255;
    this.tG = 0;
    this.tB = 255;
  }

  disp() {
    let YT = this.y;
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(this.tsize);
    fill(this.tR, this.tG, this.tB);
    text(this.tstr, this.x, YT);
  }
}

class lblOXMessage {
  constructor(_str, _x) {
    this.tstr = _str;
    this.x = _x;
    this.y = KaitouHeight + u * 5;
    this.tsize = 50 * s;
    this.tR = 255;
    this.tG = 0;
    this.tB = 0;
  }

  disp() {
    let YT = this.y;
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(this.tsize);
    fill(this.tR, this.tG, this.tB);
    text(this.tstr, this.x, YT);
  }
}

class makeLabelFill {
  constructor(_str, _tsize, _x, _y, _w, _h, _rR, _rG, _rB, _tR, _tG, _tB) {
    this.tstr = _str;
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.tsize = _tsize;
    this.rR = _rR;
    this.rG = _rG;
    this.rB = _rB;
    this.tR = _tR;
    this.tG = _tG;
    this.tB = _tB;
  }

  disp() {
    let YT = this.y;
    noStroke();
    rectMode(CENTER);
    fill(this.rR, this.rG, this.rB);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    textSize(this.tsize);
    fill(this.tR, this.tG, this.tB);
    text(this.tstr, this.x, YT);
  }
}

//---------------------------------------------

function dispProblem() {
  lblPrb_a = new lblProblem(prb_a[nowRcnt], wProblem1);
  lblPrb_b = new lblProblem(prb_b[nowRcnt], wProblem2);

  lblPrb_a.disp();
  lblPrb_b.disp();
}

function dispOthers() {
  //解答に関する記号など
  stroke(255, 0, 255);
  strokeWeight(5);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(50 * s);
  fill(255, 0, 255);
  text(tOthers1, wOthers1, KaitouHeight);
  text(tOthers2, wOthers2, KaitouHeight);
}

function dispMyAnswer() {
  //符号枠
  //rectMode(CENTER); fill(255, 128, 197);
  //rect(W1+w*16, h*24, w*9, h*13);
  //解答(緑)
  //自分の解答表示
  lblMyAns1 = new makeLabelFill(
    myAns[1],
    40 * s,
    wMyanswer1,
    KaitouHeight,
    w * 6,
    h * 6,
    0,
    255,
    0,
    0,
    0,
    255
  );
  lblMyAns2 = new makeLabelFill(
    myAns[2],
    40 * s,
    wMyanswer2,
    KaitouHeight,
    w * 6,
    h * 6,
    46,
    204,
    113,
    0,
    0,
    0,
    255
  );
  lblMyAns1.disp();
  lblMyAns2.disp();

  //今から解答する枠(赤)
  rectMode(CENTER);
  fill(231, 76, 60);
  if (mystatus == 1) {
    rect(wMyanswer1, KaitouHeight, w * 6, h * 6);
  }
  if (mystatus == 2) {
    rect(wMyanswer2, KaitouHeight, w * 6, h * 6);
  }
}

function dispOxMessage() {
  //解答後、「ox」「正解・残念」表示
  textAlign(CENTER, CENTER);
  if (mystatus >= num_MyAns + 1) {
    //最後にまとめて「ox」表示
    //	if(mystatus >= 1){							//解答するごとに「ox」表示
    lblOX1 = new lblOXMessage(ox[1], wMyanswer1);
    lblOX2 = new lblOXMessage(ox[2], wMyanswer2);
    lblOX1.disp();
    lblOX2.disp();
  }

  //解答入力が終了した
  if (mystatus >= num_MyAns + 1) {
    //正解表示
    flgALLresult = TRUE;
    lblAns1 = new makeLabelNoFill(
      ans[1],
      30 * s,
      wMyanswer1,
      KaitouHeight + u * 5,
      255,
      255,
      255
    );
    lblAns2 = new makeLabelNoFill(
      ans[2],
      30 * s,
      wMyanswer2,
      KaitouHeight + u * 5,
      255,
      255,
      255
    );
    lblAns1.disp();
    lblAns2.disp();

    for (let i = 1; i <= num_MyAns; i++) {
      if (ox[i] == "x") {
        flgALLresult = FALSE;
      }
    }

    //メッセージ表示
    if (flgALLresult == TRUE) {
      message = "せいかい";
      lblMessage = new makeLabelNoFill(
        message,
        55 * s,
        W1 + w * 30,
        h * 36,
        0,
        255,
        0
      );
      lblMessage.disp();
    } else {
      message = "ざんねん";
      lblMessage = new makeLabelNoFill(
        message,
        50 * s,
        W1 + w * 30,
        h * 36,
        255,
        0,
        0
      );
      lblMessage.disp();
    }
  }
  if (flgALLresult == MID) {
    lblMessage = new makeLabelNoFill(
      message,
      50 * s,
      W1 + w * 30,
      h * 36,
      255,
      255,
      0
    );
    lblMessage.disp();
  }
}

function dispScore() {
  //スコア枠
  rectMode(CORNER);
  fill(255, 0, 255);
  rect(W1 + w * 43, h * 31, w * 14, h * 10);

  //テキスト枠
  //スコア-ポイント1表示(連続正解記録)
  lblScoreText1 = new makeLabelNoFill(
    "れんぞく",
    12 * s,
    W1 + w * 47.5,
    h * 36,
    41,
    128,
    185 // ← ここだけ変更：深みのあるブルー
  );
  lblScoreText1.disp();

  lblScorePoint = new makeLabelNoFill(
    point1,
    50 * s,
    W1 + w * 54,
    h * 36,
    255,
    255,
    255
  );
  lblScorePoint.disp();

  //スコア-クリア表示
  // if (point1 == MAXcontinuePoint) {
  if (point1 == MAXcontinuePoint) {  //20251105 一回早いのを防ぐ
    fill(255, 0, 0); 
    rectMode(CORNER);
    rect(W1 + w * 0, h * 0, w * 62, h * 41);
    lblClearText1 = new makeLabelNoFill(
      "" + MAXcontinuePoint + "かい クリア",
      60 * s,
      W1 + w * 30,
      h * 15,
      255,
      255,
      255
    );
    lblClearText1.disp();

    //		fill(255,255,255);textSize(60*s);
    //		text("素晴らしい！",W1+w*30, h*30)
    lblClearText2 = new makeLabelNoFill(
      "すばらしい！",
      60 * s,
      W1 + w * 30,
      h * 30,
      255,
      255,
      255
    );
    lblClearText2.disp();
  }
}

function dispButton() {
  //解答ボタン表示
  textAlign(CENTER, CENTER);
  for (let n = 0; n <= 12; n++) {
    i = n % 3;
    j = int(n / 3);
    posX = w * 12 + i * w * 12;
    posY = h * 6 + j * h * 12;

    // 数字ボタンの色を変更
    if (n <= 9) {
      fill(65, 105, 225); // ロイヤルブルー
    } else if (n == 9 || n == 12) {
      fill(147, 112, 219); // ミディアムパープル
    }
    ellipse(W1 + posX, H2 + posY, r1 * 8, r1 * 8);

    fill(255, 255, 255); // ボタンの文字色を白に
    textSize(30 * s);
    if (n == 9 || n == 12) {
      fill(0, 0, 255);
    }
    text(b_disp[n], W1 + posX, H2 + posY);
  }

  //「次」表示
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill(41, 128, 185);
  rect(W1 + w * 50, H2 + h * 18, w * 14, h * 32);
  fill(0, 0, 255);
  textSize(40 * s);
  text("つぎ", W1 + w * 50, H2 + h * 18);

  //★★「取り消し」表示
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill(52, 152, 219);
  rect(W1 + w * 50, H2 + h * 42, w * 14, h * 8);
  fill(255, 255, 255);
  textSize(40 * s);
  text("けす", W1 + w * 50, H2 + h * 42);

  //「かいとう」の文字色だけ変更
  fill(0);
  textSize(30 * s);
  fill(240, 248, 255); // ← ここだけ変更：文字色をアリスブルーに
  //text("かいとうちゅう", W1 + w * 25, H2 - h * 20);

  // 「れんぞく」ボタンの色だけを変更
  fill(41, 128, 185); // ← ここだけ変更：深みのあるブルー
  //rect(W1 + w * 50, H2 + h * 52, w * 14, h * 8);
  fill(240, 248, 255); // ← 文字色もアリスブルーに
  textSize(40 * s);
  //text("れんぞく", W1 + w * 50, H2 + h * 52);
}
//---------------------------------------------

function buttonNumNOW() {
  let btnNum = 999;
  let tchX = mouseX;
  let tchY = mouseY;
  let tX = tchX - w * 6 - W1;
  let tY = tchY - H2;
  //数字・符号」
  if (0 + W1 <= tX && tX + W1 <= w * 36 && 0 <= tY && tY <= h * 60) {
    let ii = int(tX / (w * 12));
    let jj = int(tY / (h * 12));
    let nearN = jj * 3 + ii;
    if (0 <= nearN && nearN <= 12 && nearN != 10 && nearN != 11) {
      btnNum = nearN;
    }
  }
  //「次」
  if (
    W1 + w * 44 <= tchX &&
    W1 + tchX <= w * 56 &&
    H2 + h * 2 <= tchY &&
    tchY <= H2 + h * 34
  ) {
    btnNum = NEXTnum;
  }
  //「取り消し」
  if (
    W1 + w * 44 <= tchX &&
    W1 + tchX <= w * 56 &&
    H2 + h * 38 <= tchY &&
    tchY <= H2 + h * 46
  ) {
    btnNum = DELETE1num;
  }
  return btnNum;
}

function dealEachButton() {
  if (btnNumNOW != 999) {
    myAns[mystatus] = b_disp[btnNumNOW];
    //★「次」
    if (btnNumNOW == NEXTnum) {
      if (mystatus > num_MyAns) {
        choiceProblem();
        for (let i = 1; i <= num_MyAns; i++) {
          myAns[i] = "";
        }
        for (i = 1; i <= num_MyAns; i++) {
          ox[i] = "";
        }
        mystatus = 1;
        if (point1 == MAXcontinuePoint) {
          point1 = 0;
        }
        btnNumNOW = 999;
        flgALLresult = MID;
        message = "かいとう";
      }
    }
    //★★「取り消$FFFD$FFFD$FFFD
    if (btnNumNOW == DELETE1num) {
      if (2 <= mystatus && mystatus <= num_MyAns) {
        FLG = "";
        myAns[mystatus] = "";
        ox[mystatus] = "";
        text(myAns[mystatus], W1 + w * 16 + (1 - 1) * w * 12, h * 24);
        mystatus = int(mystatus) - 1;
        if (mystatus < 0) {
          mystatus = 0;
        }
      }
    }
    //★★「数字・符号」
    if (0 <= btnNumNOW && btnNumNOW <= 12) {
      //★ox[mystatus] = judge_ox(mystatus)
      if (mystatus <= num_MyAns) {
        if (btnNumNOW <= 8) {
          if (ans[mystatus] == myAns[mystatus]) {
            ox[mystatus] = "o";
            mystatus = int(mystatus) + 1;
          } else {
            ox[mystatus] = "x";
            mystatus = int(mystatus) + 1;
          }
        }
      }
      //★自分の解答入力が終了->判定
      if (mystatus == num_MyAns + 1) {
        flgALLresult = TRUE;
        for (let i = 1; i <= num_MyAns; i++) {
          if (ox[i] == "x") {
            flgALLresult = FALSE;
            point1 = 0;
          }
        }
        if (flgALLresult == TRUE) {
          point1 += 1;
        }
      }
    }
  }
}
