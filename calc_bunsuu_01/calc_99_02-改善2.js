//九九（1桁×1桁=2桁）	

NOWversion="1.00" // 現在のバージョン

//初期設定begin

	// 確認が必要な準備

	num_MyAns = 2; // 自分の解答数
	MAXcontinuePoint = 10; // 最大連続正解数
	b_disp = ["7","8","9","4","5","6","1","2","3","-","0","+","."]
	// b_real = ["7","8","9","4","5","6","1","2","3","-","0",".","+"]
	NEXTnum=20; DELETE1num=21; 
	btnNumNOW=999 // 現在のボタン番号
	// 解答欄の高さ基準h
	KaitouHeight = 1
	wProblem1 = 0; wProblem2 = 0; // 問題の幅
	wOthers1  = 0; wOthers2  = 0; // その他の幅
	wMyanswer1 = 0; wMyanswer2 = 0; // 自分の解答の幅

	// 記号など
	tOthers1 = "x" // 記号1
	tOthers2 = "=" // 記号2

	// 一応、確認が必要な準備
	prb_a=[]; prb_b=[]; // 問題の配列
	ans1 = []; ans2 = []; // 解答の配列
	myAns = []; myAns[0] = ""; myAns[1] = ""; myAns[2] = ""; // 自分の解答
	ox = []; ox[1] = ""; ox[2] = ""; // 正誤の配列
	nowRcnt=0; // 現在の問題カウント
	ans=[]; // 解答の配列
	//	lbl=[];

	// 単なる準備
	message = "解答中" // メッセージ
	mystatus = 1 // 現在の状態
	TRUE=0;FALSE=1;MID=2; // 真偽値
	flgALLresult = MID; // 全体の結果フラグ
	point1=0; // ポイント
	//t=[]

	let ProblemData = []; // ProblemDataを初期化

//初期設定end

// ProblemDataのデータを外部ファイルから読み込む
fetch('data99.json') // 外部ファイルのパスを指定
    .then(response => response.json())
    .then(data => {
        ProblemData = data; // 読み込んだデータをProblemDataに設定
        makeProblem(); // 問題の作成を呼び出す
    })
    .catch(error => console.error('Error loading ProblemData:', error));

function setup(){

	createCanvas(window.innerWidth, window.innerHeight); // キャンバスの作成
	u=int(window.innerHeight/100); // スケールの計算
	s=u/8; // 拡大率
	W = u*60; H = u*100; // 幅と高さの設定
	w=u; h=u; r1=u; // 幅、高さ、半径の設定
	W1 = -w*4; H1 = 0; // 問題の位置
	W2=0; H2=u*40; // その他の位置

	KaitouHeight = h*18 // 解答の高さ
	wProblem1 = W1+w* 8;	// 問題1の幅
	wOthers1  = W1+w*14;	// その他1の幅
	wProblem2 = W1+w*20;	// 問題2の幅
	wOthers2  = W1+w*26;	// その他2の幅

	wMyanswer1 = W1+w*32;	// 自分の解答1の幅
	wMyanswer2 = W1+w*40;	// 自分の解答2の幅

	rectMode(CENTER); textAlign(CENTER, CENTER);FLG=""; // 描画モードの設定

	// 不要？	init();
	makeProblem() // 問題の作成
	choiceProblem() // 問題の選択
}

function draw() {
	//background(0,(point1*25)+5,(point1*26)) // 背景の設定
	background(220,125,90) // 背景の設定
	textSize(12*s); fill(255,255,255); // テキストサイズと色の設定
	text("mystatus " + mystatus,w*44,h*94) // 現在の状態を表示
	dispProblem();	// 問題表示
	dispOthers();		// 記号など表示
	dispMyAnswer();	// 自分の解答表示
	dispOxMessage();// 正解不正解〇× メッセージ表示
	dispScore();		// スコア表示
	dispButton();		// 解答ボタン表示
}

function touchStarted(){
	btnNumNOW=buttonNumNOW() // ボタン番号の取得
	dealEachButton() // ボタンの処理
	return false
}

//---------------------------------------------

function makeProblem(){
	//★★★問題・解答作成

	//for(let i=1; i<=5; i++){ // 配列数★★★★★★
	//for(let i=1; i<=ProblemData[0].length; i++){
	for(let i=1; i<=ProblemData.length-1; i++){
		prb_a[i]=ProblemData[i][0] // 問題Aの設定
		prb_b[i]=ProblemData[i][1] // 問題Bの設定

		ans1[i] =ProblemData[i][2] // 解答1の設定
		ans2[i] =ProblemData[i][3] // 解答2の設定
		console.log(i+"->>"+prb_a[i]+" x "+prb_b[i]
		+" = "+ans1[i]+" "+ans2[i]); // 問題と解答の表示
	}
}

function choiceProblem(){
	//★★★問題番号を乱数で決定(1～ProblemData.length でOK!)
	//nowRcnt=int(random(1,9));
	nowRcnt=int(random(1,ProblemData.length)); // 現在の問題をランダムに選択
	let i=nowRcnt;
	console.log(nowRcnt+"->>"+prb_a[i]+" x "+prb_b[i]); // 選択した問題の表示
	ans[1] = ans1[nowRcnt]; // 解答1の設定
	ans[2] = ans2[nowRcnt]; // 解答2の設定
}

//---------------------------------------------

class makeLabelNoFill {
	constructor(_str, _tsize, _x, _y, _tR, _tG, _tB){
		this.tstr = _str; // テキスト
		this.x = _x; this.y = _y; // 位置
		this.tsize = _tsize; // テキストサイズ
		this.tR = _tR; this.tG = _tG; this.tB = _tB; // 色
	}

	disp(){
		let YT=this.y; // Y座標
		noStroke(); // 枠線なし
		textAlign(CENTER, CENTER); textSize(this.tsize); // テキストの配置とサイズ
		fill(this.tR, this.tG, this.tB); // 色の設定
		text(this.tstr, this.x, YT); // テキストの表示
	}
}

class lblProblem {
	constructor(_str, _x){
		this.tstr = _str; // テキスト
		this.x = _x; // X座標
		this.y = KaitouHeight; // Y座標
		this.tsize = 50*s; // テキストサイズ
		this.tR = 255; this.tG = 0; this.tB = 255; // 色
	}

	disp(){
		let YT=this.y; // Y座標
		noStroke(); // 枠線なし
		textAlign(CENTER, CENTER); textSize(this.tsize); // テキストの配置とサイズ
		fill(this.tR, this.tG, this.tB); // 色の設定
		text(this.tstr, this.x, YT); // テキストの表示
	}
}

class lblOXMessage {
	constructor(_str, _x){
		this.tstr = _str; // テキスト
		this.x = _x; // X座標
		this.y = KaitouHeight + u*5; // Y座標
		this.tsize = 50*s; // テキストサイズ
		this.tR = 255; this.tG = 0; this.tB = 0; // 色
	}

	disp(){
		let YT=this.y; // Y座標
		noStroke(); // 枠線なし
		textAlign(CENTER, CENTER); textSize(this.tsize); // テキストの配置とサイズ
		fill(this.tR, this.tG, this.tB); // 色の設定
		text(this.tstr, this.x, YT); // テキストの表示
	}
}

class makeLabelFill {
	constructor(_str, _tsize, _x, _y, _w, _h, _rR, _rG, _rB, _tR, _tG, _tB){
		this.tstr = _str; // テキスト
		this.x = _x; this.y = _y; // 位置
		this.w = _w; this.h = _h; // 幅と高さ
		this.tsize = _tsize; // テキストサイズ
		this.rR = _rR; this.rG = _rG; this.rB = _rB; // 背景色
		this.tR = _tR; this.tG = _tG; this.tB = _tB; // テキスト色
	}

	disp(){
		let YT=this.y; // Y座標
		noStroke(); // 枠線なし
		rectMode(CENTER); // 矩形の描画モード
		fill(this.rR, this.rG, this.rB); // 背景色の設定
		rect(this.x, this.y, this.w, this.h); // 矩形の描画
		textAlign(CENTER, CENTER); textSize(this.tsize); // テキストの配置とサイズ
		fill(this.tR, this.tG, this.tB); // テキスト色の設定
		text(this.tstr, this.x, YT); // テキストの表示
	}
}

//---------------------------------------------

function dispProblem(){
	lblPrb_a = new lblProblem(prb_a[nowRcnt], wProblem1) // 問題Aの表示
	lblPrb_b = new lblProblem(prb_b[nowRcnt], wProblem2) // 問題Bの表示

	lblPrb_a.disp(); lblPrb_b.disp(); // 問題の描画
}

function dispOthers(){
	// 解答に関する記号など
	stroke(255,0,255); strokeWeight(5); // 線の色と太さ
	noStroke(); // 枠線なし
	textAlign(CENTER, CENTER); textSize(50*s); fill(255,0,255); // テキストの配置とサイズ
	text(tOthers1, wOthers1, KaitouHeight); // 記号1の表示
	text(tOthers2, wOthers2, KaitouHeight); // 記号2の表示
}

function dispMyAnswer(){
	// 符号枠
		//rectMode(CENTER); fill(255, 128, 197);
		//rect(W1+w*16, h*24, w*9, h*13);
	// 解答枠(緑)
	// 自分の解答表示
	lblMyAns1 = new makeLabelFill(myAns[1], 40*s, wMyanswer1,KaitouHeight, w*6, h*6, 0,255,0,  0,0,255);
	lblMyAns2 = new makeLabelFill(myAns[2], 40*s, wMyanswer2,KaitouHeight, w*6, h*6, 0,255,0,  0,0,255);
	lblMyAns1.disp(); lblMyAns2.disp(); 

// 今から解答する枠(赤)
	rectMode(CENTER); fill(255,0,0) // 矩形の描画モードと色
	if(mystatus == 1){ rect(wMyanswer1, KaitouHeight, w*6, h*6); } // 解答1の枠
	if(mystatus == 2){ rect(wMyanswer2, KaitouHeight, w*6, h*6); } // 解答2の枠
}

function dispOxMessage(){
	// 解答後、「ox」「正解・残念」表示
	textAlign(CENTER, CENTER) // テキストの配置
	if(mystatus >= num_MyAns+1){	// 最後にまとめて「ox」表示
	//	if(mystatus >= 1){							// 解答するごとに「ox」表示
		lblOX1 = new lblOXMessage(ox[1], wMyanswer1); // 正誤メッセージ1の表示
		lblOX2 = new lblOXMessage(ox[2], wMyanswer2); // 正誤メッセージ2の表示
		lblOX1.disp(); lblOX2.disp(); // メッセージの描画
	}

	// 解答入力が終了したら
	if(mystatus >= num_MyAns+1){
		// 正解表示
		flgALLresult = TRUE; // 結果フラグを真に設定
		lblAns1 = new makeLabelNoFill(ans[1], 30*s, wMyanswer1, KaitouHeight+u*5,  255,255,255); // 解答1の表示
		lblAns2 = new makeLabelNoFill(ans[2], 30*s, wMyanswer2, KaitouHeight+u*5,  255,255,255); // 解答2の表示
		lblAns1.disp(); lblAns2.disp(); // 解答の描画

		for(let i=1; i<=num_MyAns; i++){
			if(ox[i] == "x"){ // 不正解があれば
				flgALLresult = FALSE; // 結果フラグを偽に設定
			}
		}

		// メッセージ表示
		if(flgALLresult==TRUE){
			message = "正解" // 正解メッセージ
			lblMessage = new makeLabelNoFill(message, 55*s, W1+w*30, h*36,  0,255,0); // メッセージの表示
			lblMessage.disp();
		}else{
			message = "残念" // 残念メッセージ
			lblMessage = new makeLabelNoFill(message, 50*s, W1+w*30, h*36,  255,0,0); // メッセージの表示
			lblMessage.disp();
		}
	}
	if(flgALLresult==MID){
		lblMessage = new makeLabelNoFill(message, 50*s, W1+w*30, h*36,  255,255,0); // 中間メッセージの表示
		lblMessage.disp();
	}
}

//---------------------------------------------

function dispScore(){
	// スコア枠
	rectMode(CORNER)	
	fill(255,0,255); // スコア枠の色
	rect(W1+w*43, h*31, w*14, h*10); // スコア枠の描画

	// テキスト枠
	// スコア-ポイント1表示(連続正解記録)
	lblScoreText1 = new makeLabelNoFill("連続正解", 12*s, W1+w*47.5, h*36,  255,255,255); // スコアテキストの表示
	lblScoreText1.disp();

	lblScorePoint = new makeLabelNoFill(point1, 50*s, W1+w*54, h*36,  255,255,255); // ポイントの表示
	lblScorePoint.disp();

	// スコア-クリア表示
	if(point1==MAXcontinuePoint){ // 最大連続正解数に達した場合
		fill(255,0,0);rectMode(CORNER); // 色と描画モードの設定
		rect(W1+w*0,h*0, w*62, h*41); // クリアメッセージの描画
		lblClearText1 = new makeLabelNoFill("連続" + MAXcontinuePoint + "回クリア", 60*s, W1+w*30, h* 15,  255,255,255); // クリアメッセージの表示
		lblClearText1.disp();

		// fill(255,255,255);textSize(60*s);
		// text("素晴らしい！",W1+w*30, h*30)
		lblClearText2 = new makeLabelNoFill("素晴らしい！", 60*s, W1+w*30, h* 30,  255,255,255); // 素晴らしいメッセージの表示
		lblClearText2.disp();
	}
}

function dispButton(){
	// 解答ボタン表示
	textAlign(CENTER, CENTER) // テキストの配置
	for(let n=0; n<=12; n++){
		i=n%3; j=int(n/3); // ボタンの位置計算
		posX=w*12+i*w*12; posY=h*6+j*h*12 // ボタンの座標
		fill(0,0,255) // ボタンの色
		if(n==9||n==11){fill(255, 128, 197)} // 符号ボタンの色
		if(n==12){fill(10, 190, 7)} // 小数点ボタンの色
		ellipse(W1+posX,H2+posY,r1*8,r1*8) // ボタンの描画
		fill(0, 255, 0); textSize(30*s); // テキストの色とサイズ
		if(n==9||n==11){fill(0, 0, 255)} // 符号ボタンのテキスト色
		if(n==12){fill(0, 0, 255)} // 小数点ボタンのテキスト色
		text(b_disp[n], W1+posX, H2+posY) // ボタンのテキスト表示
	}

	// 「次」表示
	rectMode(CENTER); textAlign(CENTER, CENTER) // 矩形の描画モードとテキストの配置
	fill(0,255,255) // 色の設定
	rect(W1+w*50, H2+h*18,w*14,h*32) // 「次」ボタンの描画
	fill(0, 0, 255); textSize(40*s); // テキストの色とサイズ
	text("次",W1+w*50, H2+h*18) // 「次」のテキスト表示

	//★★「取り消し」表示
	rectMode(CENTER); textAlign(CENTER, CENTER) // 矩形の描画モードとテキストの配置
	fill(255,0,0) // 色の設定
	rect(W1+w*50, H2+h*42,w*14,h*8) // 「取り消し」ボタンの描画
	fill(255, 255, 255); textSize(40*s); // テキストの色とサイズ
	text("消",W1+w*50, H2+h*(42)) // 「消」のテキスト表示
}

//---------------------------------------------

function buttonNumNOW(){
	let btnNum=999; // ボタン番号の初期化
	let tchX=mouseX; let tchY=mouseY; // マウスの座標
	let tX=tchX-w*6-W1; let tY=tchY-H2; // ボタンの座標計算
	// 「数字・符号」
	if((0+W1<=tX && tX+W1<=w*36) && (0<=tY && tY<=h*60)){
		let ii = int(tX/(w*12)); // X座標からボタンの列を計算
		let jj = int(tY/(h*12)); // Y座標からボタンの行を計算
		let nearN = jj*3+ii // ボタン番号の計算
		if(0<=nearN && nearN<=12 && nearN!=10 && nearN!=11){ // ボタン番号の範囲チェック
			btnNum = nearN; // ボタン番号を設定
		}
	}
	// 「次」
	if(W1+w*44<=tchX && W1+tchX<=w*56 && H2+h*2<=tchY && tchY<=H2+h*34){
		btnNum = NEXTnum; // 「次」ボタンの番号を設定
	}
	// 「取り消し」
	if(W1+w*44<=tchX && W1+tchX<=w*56 && H2+h*38<=tchY && tchY<=H2+h*46){
		btnNum = DELETE1num; // 「取り消し」ボタンの番号を設定
	}
	return btnNum; // ボタン番号を返す
}

function dealEachButton(){
	if(btnNumNOW != 999){ // ボタンが押された場合
		myAns[mystatus]=b_disp[btnNumNOW]; // 自分の解答を設定

		// 「次」ボタンの処理
		if(btnNumNOW==NEXTnum){ 
			handleNextButton();
		}
		
		// 「取り消し」ボタンの処理
		if(btnNumNOW==DELETE1num){ 
			handleDeleteButton();
		}
		
		// 数字または符号ボタンの処理
		if(0<=btnNumNOW && btnNumNOW<=12){ 
			handleNumberButton();
		}
	}
}

function handleNextButton() {
	if(mystatus > num_MyAns){ // 解答が全て入力された場合
		choiceProblem(); // 新しい問題を選択
		resetAnswers(); // 自分の解答をリセット
	}
}

function handleDeleteButton() {
	if(2<=mystatus && mystatus<=num_MyAns){ // 解答が2つ以上入力されている場合
		myAns[mystatus]=""; // 自分の解答をリセット
		ox[mystatus] = ""; // 正誤をリセット
		mystatus = int(mystatus)-1; // 状態を1つ戻す
		if(mystatus<0){ mystatus = 0; } // 状態が負にならないように
	}
}

function resetAnswers() {
	for(let i=1; i<=num_MyAns; i++){ 
		myAns[i]=""; 
		ox[i] = ""; 
	}
	mystatus = 1; // 状態をリセット
	if(point1==MAX_CONTINUE_POINT){ point1=0; } // ポイントをリセット
	btnNumNOW=999; flgALLresult = MID; message="解答中"; // ボタン番号とフラグをリセット
}

function handleNumberButton() {
	//★ox[mystatus] = judge_ox(mystatus)
	if(mystatus <= num_MyAns){ // 現在の状態が解答数以下の場合
		if(btnNumNOW<=8){ // 数字ボタンの場合
			if(ans[mystatus]==myAns[mystatus]){ // 正解の場合
				ox[mystatus] = "o"; // 正解フラグを設定
				mystatus = int(mystatus)+1 // 状態を1つ進める
			}else{ // 不正解の場合
				ox[mystatus] = "x"; // 不正解フラグを設定
				mystatus = int(mystatus)+1; // 状態を1つ進める
			}
		}
	}
	//★自分の解答入力が終了->判定
	if (mystatus==num_MyAns+1) { // 解答が全て入力された場合
		flgALLresult = TRUE; // 結果フラグを真に設定
		for(let i=1; i<=num_MyAns; i++){
			if(ox[i] == "x"){flgALLresult = FALSE; point1 = 0;} // 不正解があればフラグを偽に設定
		}
		if(flgALLresult==TRUE){ point1 += 1;} // 正解の場合はポイントを加算
	}
}
