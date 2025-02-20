//横長：左に問題、右で操作
// 2桁+2桁=2桁
//計算トレーニング問題 データ読み込み方式取り入れる
//クラス使用

//----------------------------------------初期設定begin

// 確認が必要な準備
NOWversion="1.00"

b_disp = ["7","8","9","4","5","6","1","2","3","-","0","+","."]
//         0   1   2   3   4   5   6   7   8   9   10  11  12
// b_real = ["7","8","9","4","5","6","1","2","3","-","0",".","+"]

NEXTnum=20; DELETE1num=21; 
btnNumNOW=999
nowRcnt=0;
myAns = []; ox = []; ans=[];
array_jsonData=[];
posX = 0; posY = 0;
//	lbl=[];

//一応、確認が必要な準備

//////////begin-問題変更【1】

num_MyAns = 9;
MAXcontinuePoint = 5;

DATANAME = 'calc_waru3221A.json'

prb1=[]; prb2=[];prb3=[]; prb4=[]; prb5=[];
// prb6=[];
ans1 = []; ans2 = []; ans3 = []; ans4 = [];
ans5 = []; ans6 = []; ans7 = []; ans8 = []; ans9 = [];
// ans10 = [];

myAns[1] = ""; myAns[2] = ""; myAns[3] = ""; myAns[4] = "";
myAns[5] = ""; myAns[6] = ""; myAns[7] = ""; myAns[8] = ""; myAns[9] = "";
// myAns[10] = "";
ox[1] = ""; ox[2] = ""; ox[3] = ""; ox[4] = "";
ox[5] = ""; ox[6] = ""; ox[7] = ""; ox[8] = ""; ox[9] = "";
// ox[10] = "";

//////////end-問題変更【1】

//--------------------begin色指定

//問題画面:色指定
clr_background = [0,30,100];
clr_problem = [255,0,255];
clr_makeLabelMyAns = [0, 255, 0];
clr_NowAnsBox = [255, 0, 0];
clr_makeLabelMyAnsText = [0, 0, 255];
clr_makeLabelNoFillLblOX = [255 ,0 ,0];
clr_makeLabelNoFillLblAns = [255 ,255 ,255];


//操作画面:色指定
clr_ansRight = [0,255,0];
clr_ansWrong = [255,0,0];
clr_ansMid = [255,255,0];
clr_Continuous = [255 ,255 ,255];
clr_frameScore = [255,0,255];
clr_lblClear  = [255,255,0];
clr_Congratulation = [255 ,0 ,255];

clr_btnNum  = [0,0,255];
clr_btnSign  = [255, 128, 197];
clr_btnNumPoint  = [10, 190, 7];
clr_btnNumText  = [0, 255, 0];
clr_btnSignText  = [0, 0, 255];
clr_btnNumPointText  = [0, 0, 255];

clr_btnNext  = [0,255,255];
clr_btnDel  = [255,0,0];
clr_btnNextText  = [0, 0, 255];
clr_btnDelText  = [255, 255, 255];

clr_mystatus = [255 ,255 ,255];

//--------------------end色指定

//単なる準備
message = "try"
mystatus = 1
TRUE=0;FALSE=1;MID=2;
flgALLresult = MID;
point1=0;

//----------------------------------------初期設定end

// ProblemDataのデータを外部ファイルから読み込む

fetch(DATANAME) // 外部ファイルのパスを指定
    .then(response => response.json())
    .then(data => {
        array_jsonData = data; // 読み込んだデータをProblemDataに設定
        makeProblem(); // 問題の作成を呼び出す
    })
    .catch(error => console.error('Error loading ProblemData:', error));

function setup(){

//	s=1;//拡大率
	if(window.innerHeight/window.innerWidth >= 100/60){ //想定より縦長
		u=int(window.innerWidth/60);
	}else{ //想定より横長
		u=int(window.innerHeight/100);
	}

////★★★★begin-yoko2レイアウト変更【0-1】
	fontRateSize=u/8;//文字の拡大率
	W = u*100; H = u*60;
	w=u; h=u; r1=u;
	//W1 = -w*4; 
	W1 = w*0; 
	W2 = W1 + w*80; 
	//H1 = 0;
	H1 = u*(10);
	//H2=u*(40+15);
	H2 = u*(20);
////★★★★end-yoko2レイアウト変更【0-1】

//--------------------begin-レイアウト指定

//問題画面:レイアウト指定
	pos_lblprb1 = [W1+w*32, H1+h*24];
	pos_lblprb2 = [W1+w*40, H1+h*24];
	pos_lblprb3 = [W1+w*48, H1+h*24];
	pos_lblprb4 = [W1+w*12, H1+h*24];
	pos_lblprb5 = [W1+w*20, H1+h*24];////

	pos_lblMyAns1 = [W1+w*40, H1+h*12, w*6, h*10];
	pos_lblMyAns2 = [W1+w*40, H1+h*36, w*6, h*10];
	pos_lblMyAns3 = [W1+w*32, H1+h*36, w*6, h*10];
	pos_lblMyAns4 = [W1+w*40, H1+h*48, w*6, h*10];
	pos_lblMyAns5 = [W1+w*48, H1+h*48, w*6, h*10];
	pos_lblMyAns6 = [W1+w*48, H1+h*12, w*6, h*10];
	pos_lblMyAns7 = [W1+w*48, H1+h*60, w*6, h*10];
	pos_lblMyAns8 = [W1+w*40, H1+h*60, w*6, h*10];
	pos_lblMyAns9 = [W1+w*48, H1+h*72, w*6, h*10];
	//pos_lblMyAns10 = [W1+w*16, H1+h*54, w*6, h*10];

	pos_lblOX1 = [W1+w*40, H1+h*(12+4)];
	pos_lblOX2 = [W1+w*40, H1+h*(36+4)];
	pos_lblOX3 = [W1+w*32, H1+h*(36+4)];
	pos_lblOX4 = [W1+w*40, H1+h*(48+4)];
	pos_lblOX5 = [W1+w*48, H1+h*(48+4)];
	pos_lblOX6 = [W1+w*48, H1+h*(12+4)];
	pos_lblOX7 = [W1+w*48, H1+h*(60+4)];
	pos_lblOX8 = [W1+w*40, H1+h*(60+4)];
	pos_lblOX9 = [W1+w*48, H1+h*(72+4)];
	//pos_lblOX10 = [W1+w*16, H1+h*(54+4)];

	pos_lblAns1 = [W1+w*40, H1+h*(12+5)];
	pos_lblAns2 = [W1+w*40, H1+h*(36+5)];
	pos_lblAns3 = [W1+w*32, H1+h*(36+5)];
	pos_lblAns4 = [W1+w*40, H1+h*(48+5)];
	pos_lblAns5 = [W1+w*48, H1+h*(48+5)];
	pos_lblAns6 = [W1+w*48, H1+h*(12+5)];
	pos_lblAns7 = [W1+w*48, H1+h*(60+5)];
	pos_lblAns8 = [W1+w*40, H1+h*(60+5)];
	pos_lblAns9 = [W1+w*48, H1+h*(72+5)];
	//pos_lblAns10 = [W1+w*16, H1+h*(54+5)];
	
//操作画面:レイアウト指定

	margin_btnNumLeft = W2 + w*4;
	margin_btnNumTop = H2;
	W_btnNum = w*12;
	H_btnNum = h*12;

	margin_btnNextLeft = W2+w*43;
	margin_btnNextTop = H2+h*2;
	W_btnNext = w*14;
	H_btnNext = h*32;
	pos_btnNext = [margin_btnNextLeft, margin_btnNextTop, W_btnNext, H_btnNext];
	pos_btnNextText = [W2+w*50, H2+h*18+6];

	margin_btnDelLeft = W2+w*43;
	margin_btnDelTop = H2+h*38;
	W_btnDel = w*14;
	H_btnDel = h*8;
	pos_btnDel = [margin_btnDelLeft, margin_btnDelTop, W_btnDel, H_btnDel];
	pos_btnDelText = [W2+w*50, H2+h*(42+3)];

	pos_lblMessage  = [W2+w*30, h*(-5)+H2];
	pos_frameScore  = [W2+w*43, h*(-10)+H2, w*14, h*10];
	pos_lblScore = [W2+w*0,h*0, w*62, H*2];
	pos_lblScoreText1 = [W2+w*47.5, h*(-5)+H2];
	pos_lblScorePoint = [W2+w*54, h*(-5)+H2];
	pos_lblClearText1 = [W2+w*30, h* 15];
	pos_lblClearText2 = [W2+w*30, h* 30];

	pos_textMyAns = [W2+w*44, H2+h*(50)];

//--------------------end-レイアウト指定

	setLabelButtonMarginY = 0;
	createCanvas(window.innerWidth, window.innerHeight);

	rectMode(CENTER); textAlign(CENTER);FLG="";

	makeProblem()//★
}

function draw() {
	background(clr_background)

////★★★★begin-yoko2レイアウト変更【0-2】
	textAlign(LEFT); 
	textSize(12*fontRateSize); fill(clr_mystatus);
	text("mystatus " + mystatus, ...pos_textMyAns)
////★★★★end-yoko2レイアウト変更【0-2】

	//choiceProblem();
	dispProblem();	//問題表示
	dispMyAnswer();	//自分の解答表示
	dispOxMessage();//正解不正解〇× メッセージ表示
	dispScore();		//スコア表示
	dispButton();		//解答ボタン表示
}

function touchStarted(){
	btnNumNOW=buttonNumNOW()
	dealEachButton()
	return false
}

function makeProblem(){
	//★★★問題・解答作成
	//array_jsonData=[
	//["A1","A2","B1","B2","ans1","ans2"],
	console.log("array_jsonData.length[] =",array_jsonData.length);
	for(let i=1; i<array_jsonData.length; i++){

//////////begin-問題変更【2】
		prb1[i] = array_jsonData[i][0]	//A1
		prb2[i] = array_jsonData[i][1]	//A2
		prb3[i] = array_jsonData[i][2]	//B1
		prb4[i] = array_jsonData[i][3]	//B2
		prb5[i] = array_jsonData[i][4]	//B2	////

		ans1[i] = array_jsonData[i][5]	//ans1
		ans2[i] = array_jsonData[i][6]	//ans2
		ans3[i] = array_jsonData[i][7]	//ans3
		ans4[i] = array_jsonData[i][8]	//ans4
		ans5[i] = array_jsonData[i][9]	//ans5
		ans6[i] = array_jsonData[i][10]	//ans6
		ans7[i] = array_jsonData[i][11]	//ans7
		ans8[i] = array_jsonData[i][12]	//ans8
		ans9[i] = array_jsonData[i][13]	//ans9
		//ans10[i] = array_jsonData[i][13]	//ans10

		//console.log(i+"->>"+prb1[i]+":"+prb2[i]+"+"+prb3[i]+":"+prb4[i]
		//	+" = "+ans2[i]+":"+ans1[i]);
//////////end-問題変更【2】

	}
	choiceProblem()
}

function choiceProblem(){
	//★★★問題番号を乱数で決定
	nowRcnt=int(random(1, array_jsonData.length));
	let i=nowRcnt;

//////////begin-問題変更【3】
	console.log(nowRcnt+"->>"+prb1[i]+":"+prb2[i]+"+"+prb3[i]+":"+prb4[i]
		+" = "+ans2[i]+":"+ans1[i]);

	ans[1] = ans1[nowRcnt];
	ans[2] = ans2[nowRcnt];
	ans[3] = ans3[nowRcnt];
	ans[4] = ans4[nowRcnt];
	ans[5] = ans5[nowRcnt];
	ans[6] = ans6[nowRcnt];
	ans[7] = ans7[nowRcnt];
	ans[8] = ans8[nowRcnt];
	ans[9] = ans9[nowRcnt];
	//ans[10] = ans10[nowRcnt];

//////////end-問題変更【3】

}

class makeLabelNoFill {
	constructor(_str, _tsize, _x, _y, clr_makeLabelText){
		this.tstr = _str;
		this.x = _x; this.y = _y;
		this.tsize = _tsize; 
		this.tR = clr_makeLabelText[0]; this.tG = clr_makeLabelText[1]; this.tB = clr_makeLabelText[2];
	}

	disp(){
		let YT=this.y + this.tsize*0.38;
		noStroke();
		textAlign(CENTER); textSize(this.tsize);
		fill(this.tR, this.tG, this.tB);
		text(this.tstr, this.x, YT);
	}
}

class makeLabel {
	constructor(_str, _tsize, _x, _y, _w, _h, clr_makeLabelR, clr_makeLabelText){
		this.tstr = _str;
		this.x = _x; this.y = _y; this.w = _w; this.h = _h;
		this.tsize = _tsize; 
		this.rR = clr_makeLabelR[0]; this.rG = clr_makeLabelR[1]; this.rB = clr_makeLabelR[2]; this.rA = clr_makeLabelR[3]
		this.tR = clr_makeLabelText[0]; this.tG = clr_makeLabelText[1]; this.tB = clr_makeLabelText[2];
	}

	disp(){
		let YT=this.y + this.tsize*0.38;
		noStroke();
		rectMode(CENTER);
		fill(this.rR, this.rG, this.rB, this.rA);
		rect(this.x, this.y, this.w, this.h);
		textAlign(CENTER); textSize(this.tsize);
		fill(this.tR, this.tG, this.tB);
		text(this.tstr, this.x, YT);
	}
}

function dispProblem(){

	//●●●問題枠(色なし)

//////////begin-問題変更【4】
	lblprb1 = new makeLabelNoFill(prb1[nowRcnt], 60*fontRateSize, ...pos_lblprb1,  clr_problem)
	lblprb2 = new makeLabelNoFill(prb2[nowRcnt], 60*fontRateSize, ...pos_lblprb2,  clr_problem)
	lblprb3 = new makeLabelNoFill(prb3[nowRcnt], 60*fontRateSize, ...pos_lblprb3,  clr_problem)
	lblprb4 = new makeLabelNoFill(prb4[nowRcnt], 60*fontRateSize, ...pos_lblprb4,  clr_problem)
	lblprb5 = new makeLabelNoFill(prb5[nowRcnt], 60*fontRateSize, ...pos_lblprb5,  clr_problem)////
	lblprb1.disp(); lblprb2.disp(); lblprb3.disp(); lblprb4.disp();  lblprb5.disp();

	//●●●問題に関する記号・図形など
	stroke(clr_problem); strokeWeight(5);
	line(W1+w*32-36, H1+h*24-24, W1+w*60-20, H1+h*24-24)
	line(W1+w*32-20, H1+h*48-32, W1+w*60-20, H1+h*48-32)
	line(W1+w*40, H1+h*72-32, W1+w*60-24, H1+h*72-32)
	noStroke();
	textAlign(CENTER); textSize(50*fontRateSize); fill(clr_problem);
	text(")", W1+w*32-36, H1+h*24+12);
//////////end-問題変更【4】

}

function dispMyAnswer(){
	//●●●解答に関する記号・図形など

//////////begin-問題変更【5】
	//●●●符号枠
		//rectMode(CENTER); fill(255, 128, 197);
		//rect(W1+w*16, h*24, w*9, h*13);

	//●●●解答枠：自分の解答表示(緑)
	lblMyAns1 = new makeLabel(myAns[1], 40*fontRateSize, ...pos_lblMyAns1, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns2 = new makeLabel(myAns[2], 40*fontRateSize, ...pos_lblMyAns2, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns3 = new makeLabel(myAns[3], 40*fontRateSize, ...pos_lblMyAns3, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns4 = new makeLabel(myAns[4], 40*fontRateSize, ...pos_lblMyAns4, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns5 = new makeLabel(myAns[5], 40*fontRateSize, ...pos_lblMyAns5, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns6 = new makeLabel(myAns[6], 40*fontRateSize, ...pos_lblMyAns6, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns7 = new makeLabel(myAns[7], 40*fontRateSize, ...pos_lblMyAns7, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns8 = new makeLabel(myAns[8], 40*fontRateSize, ...pos_lblMyAns8, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns9 = new makeLabel(myAns[9], 40*fontRateSize, ...pos_lblMyAns9, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	//lblMyAns10 = new makeLabel(myAns[10], 40*fontRateSize, ...pos_lblMyAns10, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns1.disp(); lblMyAns2.disp(); lblMyAns3.disp(); lblMyAns4.disp();lblMyAns5.disp(); 
	lblMyAns6.disp(); lblMyAns7.disp(); lblMyAns8.disp(); lblMyAns9.disp();
	// lblMyAns10.disp();

	//●●●解答枠：今から解答する枠(赤)
	rectMode(CENTER); fill(clr_NowAnsBox)
	if(mystatus == 1){ rect(...pos_lblMyAns1); }
	if(mystatus == 2){ rect(...pos_lblMyAns2); }
	if(mystatus == 3){ rect(...pos_lblMyAns3); }
	if(mystatus == 4){ rect(...pos_lblMyAns4); }
	if(mystatus == 5){ rect(...pos_lblMyAns5); }
	if(mystatus == 6){ rect(...pos_lblMyAns6); }
	if(mystatus == 7){ rect(...pos_lblMyAns7); }
	if(mystatus == 8){ rect(...pos_lblMyAns8); }
	if(mystatus == 9){ rect(...pos_lblMyAns9); }
	//if(mystatus == 10){ rect(...pos_lblMyAns10); }
//////////end-問題変更【5】

}

function dispOxMessage(){
	//解答後、「ox」「正解・残念」表示
	textAlign(CENTER)
	if(mystatus >= num_MyAns+1){	//最後にまとめて「ox」表示
	//	if(mystatus >= 1){			//解答するごとに「ox」表示

//////////begin-問題変更【6】
		lblOX1 = new makeLabelNoFill(ox[1], 90*fontRateSize, ...pos_lblOX1,  clr_makeLabelNoFillLblOX);
		lblOX2 = new makeLabelNoFill(ox[2], 90*fontRateSize, ...pos_lblOX2,  clr_makeLabelNoFillLblOX);
		lblOX3 = new makeLabelNoFill(ox[3], 90*fontRateSize, ...pos_lblOX3,  clr_makeLabelNoFillLblOX);
		lblOX4 = new makeLabelNoFill(ox[4], 90*fontRateSize, ...pos_lblOX4,  clr_makeLabelNoFillLblOX);
		lblOX5 = new makeLabelNoFill(ox[5], 90*fontRateSize, ...pos_lblOX5,  clr_makeLabelNoFillLblOX);
		lblOX6 = new makeLabelNoFill(ox[6], 90*fontRateSize, ...pos_lblOX6,  clr_makeLabelNoFillLblOX);
		lblOX7 = new makeLabelNoFill(ox[7], 90*fontRateSize, ...pos_lblOX7,  clr_makeLabelNoFillLblOX);
		lblOX8 = new makeLabelNoFill(ox[8], 90*fontRateSize, ...pos_lblOX8,  clr_makeLabelNoFillLblOX);
		lblOX9 = new makeLabelNoFill(ox[9], 90*fontRateSize, ...pos_lblOX9,  clr_makeLabelNoFillLblOX);
		//lblOX10 = new makeLabelNoFill(ox[10], 90*fontRateSize, ...pos_lblOX10,  clr_makeLabelNoFillLblOX);

		lblOX1.disp(); lblOX2.disp(); lblOX3.disp(); lblOX4.disp(); lblOX5.disp(); 
		lblOX6.disp(); lblOX7.disp(); lblOX8.disp(); lblOX9.disp();
		// lblOX10.disp();
	}

	//解答入力が終了したら
	if(mystatus >= num_MyAns+1){
		//正解表示
		flgALLresult = TRUE;
		lblAns1 = new makeLabelNoFill(ans[1], 30*fontRateSize, ...pos_lblAns1,  clr_makeLabelNoFillLblAns);
		lblAns2 = new makeLabelNoFill(ans[2], 30*fontRateSize, ...pos_lblAns2,  clr_makeLabelNoFillLblAns);
		lblAns3 = new makeLabelNoFill(ans[3], 30*fontRateSize, ...pos_lblAns3,  clr_makeLabelNoFillLblAns);
		lblAns4 = new makeLabelNoFill(ans[4], 30*fontRateSize, ...pos_lblAns4,  clr_makeLabelNoFillLblAns);
		lblAns5 = new makeLabelNoFill(ans[5], 30*fontRateSize, ...pos_lblAns5,  clr_makeLabelNoFillLblAns);
		lblAns6 = new makeLabelNoFill(ans[6], 30*fontRateSize, ...pos_lblAns6,  clr_makeLabelNoFillLblAns);
		lblAns7 = new makeLabelNoFill(ans[7], 30*fontRateSize, ...pos_lblAns7,  clr_makeLabelNoFillLblAns);
		lblAns8 = new makeLabelNoFill(ans[8], 30*fontRateSize, ...pos_lblAns8,  clr_makeLabelNoFillLblAns);
		lblAns9 = new makeLabelNoFill(ans[9], 30*fontRateSize, ...pos_lblAns9,  clr_makeLabelNoFillLblAns);
		//lblAns10 = new makeLabelNoFill(ans[10], 30*fontRateSize, ...pos_lblAns10,  clr_makeLabelNoFillLblAns);
		lblAns1.disp(); lblAns2.disp(); lblAns3.disp(); lblAns4.disp(); lblAns5.disp(); 
		lblAns6.disp(); lblAns7.disp(); lblAns8.disp(); lblAns9.disp();
		// lblAns10.disp();

//////////end-問題変更【6】

		for(let i=1; i<=num_MyAns; i++){
			if(ox[i] == "x"){
				flgALLresult = FALSE;
			}
		}

////★★★★begin-yoko2レイアウト変更【1】
		//メッセージ表示
		if(flgALLresult==TRUE){
			message = "RIGHT"
			lblMessage = new makeLabelNoFill(message, 55*fontRateSize, ...pos_lblMessage,  clr_ansRight);
			lblMessage.disp();
		}else{
			message = "WRONG"
			lblMessage = new makeLabelNoFill(message, 50*fontRateSize, ...pos_lblMessage,  clr_ansWrong);
			lblMessage.diWRONG
		}
	}
	if(flgALLresult==MID){
		lblMessage = new makeLabelNoFill(message, 50*fontRateSize, ...pos_lblMessage,  clr_ansMid);
		lblMessage.disp();
	}
////★★★★end-yoko2レイアウト変更【1】
}

//------------------------------------
function dispScore(){

////★★★★begin-yoko2レイアウト変更【2】
	//スコア枠
	rectMode(CORNER)	
	fill(clr_frameScore);	
	rect(...pos_frameScore);

	//テキスト枠
	//スコア-ポイント1表示(連続正解記録)
	lblScoreText1 = new makeLabelNoFill("Continuous", 12*fontRateSize, ...pos_lblScoreText1,  clr_Continuous);
	lblScoreText1.disp();

	lblScorePoint = new makeLabelNoFill(point1, 50*fontRateSize, ...pos_lblScorePoint,  clr_Continuous);
	lblScorePoint.disp();

	//スコア-クリア表示
	if(point1==MAXcontinuePoint){
		fill(clr_lblClear);rectMode(CORNER);
		rect(...pos_lblScore);
		lblClearText1 = new makeLabelNoFill("Continuous  " + MAXcontinuePoint + " Clear", 40*fontRateSize, ...pos_lblClearText1,  clr_Congratulation);
		lblClearText1.disp();


//		fill(255,255,255);textSize(60*fontRateSize);
//		text("素晴らしい！",W2+w*30, h*30)
		lblClearText2 = new makeLabelNoFill("Congratulation !", 50*fontRateSize, ...pos_lblClearText2 ,  clr_Congratulation);
		lblClearText2.disp();
	}
////★★★★end-yoko2レイアウト変更【2】

}

function dispButton(){

////★★★★begin-yoko2レイアウト変更【3】
	//「ボタン」表示
	textAlign(CENTER)
	for(let n=0; n<=12; n++){
		i=n%3; j=int(n/3);
		posX = W_btnNum + i*W_btnNum; posY = H_btnNum/2 + j*H_btnNum
		//pos_buttunEllipse = [W2+posX,H2+posY,r1*8,r1*8];
		//pos_buttunEllipseText = [W2+posX, H2+posY +h*1];

		fill(clr_btnNum) // 数字ボタンの色
		if(n==9||n==11){fill(clr_btnSign)} // 符号ボタンの色
		if(n==12){fill(clr_btnNumPoint)} // 小数点ボタンの色
		ellipse(W2+posX,H2+posY,r1*8,r1*8) // 数字・符号・小数点 ボタンの形表示
		fill(clr_btnNumText); textSize(30*fontRateSize);// 数字ボタンのテキスト色
		if(n==9||n==11){fill(clr_btnSignText)} // 符号ボタンのテキスト色
		if(n==12){fill(clr_btnNumPointText)} // 小数点ボタンのテキスト色
		text(b_disp[n], W2+posX, H2+posY +h*1) // 数字・符号・小数点 ボタンのテキスト表示
	}

	rectMode(CORNER); textAlign(CENTER)
	//「次」表示
	fill(clr_btnNext)
	rect(...pos_btnNext)
	fill(clr_btnNextText); textSize(40*fontRateSize);
	text("NEXT", ...pos_btnNextText)

	//★★「取り消し」表示
	fill(clr_btnDel)
	rect(...pos_btnDel)
	fill(clr_btnDelText); textSize(40*fontRateSize);
	text("DEL",...pos_btnDelText)
////★★★★end-yoko2レイアウト変更【3】

}

function buttonNumNOW(){
	let btnNum=999;
	let tchX=mouseX; let tchY=mouseY;

////★★★★begin-yoko2レイアウト変更【4】
	//クリックを感知
	let tX=tchX-W2-W_btnNum/2; let tY=tchY-margin_btnNumTop;
	//感知：「数字・符号」
	//if((0+W1<=tX && tX+W1<=w*36) && (0<=tY && tY<=h*60)){
	if((0<=tX && tX<=W_btnNum*3) && (0<=tY && tY<=H_btnNum*5)){
			let ii = int(tX/(w*12));
		let jj = int(tY/(h*12));
		let nearN = jj*3+ii
		if(0<=nearN && nearN<=12 && nearN!=10 && nearN!=11){
			btnNum = nearN;
		}
	}

	//感知：「次」
	if(margin_btnNextLeft<=tchX && tchX<=margin_btnNextLeft+W_btnNext && margin_btnNextTop<=tchY && tchY<=margin_btnNextTop+H_btnNext){
		btnNum = NEXTnum;
	}
	//感知：「取り消し」
	if(margin_btnDelLeft<=tchX && tchX<=margin_btnDelLeft+W_btnDel && margin_btnDelTop<=tchY && tchY<=margin_btnDelTop+H_btnDel){
		btnNum = DELETE1num;
	}
////★★★★end-yoko2レイアウト変更【4】

	return btnNum;
}

function dealEachButton(){
	if(btnNumNOW != 999){
		myAns[mystatus]=b_disp[btnNumNOW];
		//★「次」
		if(btnNumNOW==NEXTnum){
			if(mystatus > num_MyAns){
				choiceProblem();
				for(let i=1; i<=num_MyAns; i++){ myAns[i]="";}
				for (i=1; i<=num_MyAns; i++){ ox[i] = "";}
				mystatus = 1;
				if(point1==MAXcontinuePoint){point1=0;}
				btnNumNOW=999; flgALLresult = MID; message="try"
			}
		}
		//★★「取り消し
		if(btnNumNOW==DELETE1num){
			if(2<=mystatus && mystatus<=num_MyAns){
				FLG=""
				myAns[mystatus]="";
				ox[mystatus] = "";

////★★★★begin-yoko2レイアウト変更【5】
				text(myAns[mystatus], ...pos_textMyAns)
////★★★★end-yoko2レイアウト変更【5】

                mystatus = int(mystatus)-1
				if(mystatus<0){mystatus	=0;}
			}
		}
		//★★「数字・符号」
		if(0<=btnNumNOW && btnNumNOW<=8 && point1 != MAXcontinuePoint){	//当面 1-9のみ、0は入力できない
		//if(0<=btnNumNOW && btnNumNOW<=12){
			//★ox[mystatus] = judge_ox(mystatus)
			if(mystatus <= num_MyAns){
				if(btnNumNOW<=8){
					if(ans[mystatus]==myAns[mystatus]){
						ox[mystatus] = "o";
						mystatus = int(mystatus)+1
					}else{
						ox[mystatus] = "x";
						mystatus = int(mystatus)+1;
					}
				}
			}
			//★自分の解答入力が終了->判定
			if (mystatus==num_MyAns+1) {
				flgALLresult = TRUE;
				for(let i=1; i<=num_MyAns; i++){
					if(ox[i] == "x"){flgALLresult = FALSE; point1 = 0;}
				}
				if(flgALLresult==TRUE){ point1 += 1;}
			}
		}
	}
}

function GCD(a, b){
		if(a<b){
		tmp = a;
		a = b;
		b = tmp;
	}
	r = a % b;
	while(r!=0){
		a = b;
		b = r;
		r = a % b;
	}
	return b;
}
