
// 3桁×1桁=3桁
//計算トレーニング問題 データ読み込み方式取り入れる
//クラス使用

//初期設定begin

// 確認が必要な準備
NOWversion="1.03"
num_MyAns = 3;
MAXcontinuePoint = 10;
b_disp = ["7","8","9","4","5","6","1","2","3","-","0","+","."]
// b_real = ["7","8","9","4","5","6","1","2","3","-","0",".","+"]
NEXTnum=20; DELETE1num=21; 
btnNumNOW=999

//一応、確認が必要な準備

prb1=[]; prb2=[];prb3=[]; prb4=[];

ans1 = []; ans2 = []; ans3 = [];
myAns = []; myAns[0] = ""; myAns[1] = ""; myAns[2] = ""; myAns[3] = "";
ox = []; ox[1] = ""; ox[2] = ""; ox[3] = "";
nowRcnt=0;
ans=[];

array_jsonData=[];

clr_background = [0,30,100];
clr_problem = [255,0,255];
clr_makeLabelMyAns = [0, 255, 0];
clr_NowAnsBox = [255, 0, 0];
clr_makeLabelMyAnsText = [0, 0, 255];
clr_makeLabelNoFillLblOX = [255 ,0 ,0];
clr_makeLabelNoFillLblAns = [255 ,255 ,255];
clr_ansRight = [0,255,0];
clr_ansWrong = [255,0,0];
clr_ansMid = [255,255,0];
clr_Continuous = [255 ,255 ,255];
clr_Congratulation = [255 ,255 ,255];
clr_frameScore = [255,0,255];

//	lbl=[];

//単なる準備
message = "try"
mystatus = 1
TRUE=0;FALSE=1;MID=2;
flgALLresult = MID;
point1=0;

//初期設定end

// ProblemDataのデータを外部ファイルから読み込む

fetch('datacalc_hitsukake.json') // 外部ファイルのパスを指定
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

	s=u/8;//拡大率
	W = u*60; H = u*100;
	w=u; h=u; r1=u;
	W1 = -w*4; H1 = 0;
	W2=0; H2=u*(40+15);
	setLabelButtonMarginY = 0;
	createCanvas(window.innerWidth, window.innerHeight);

	rectMode(CENTER); textAlign(CENTER);FLG="";

	makeProblem()//★
}

function draw() {
	background(clr_background)
	textAlign(LEFT); textSize(12*s); fill(255,255,255);
	text("mystatus " + mystatus,w*44,h*94)
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
	//["A3","A2","A1","B1","ans1","ans2","ans3"],
	console.log("array_jsonData.length[] =",array_jsonData.length);
	for(let i=1; i<array_jsonData.length; i++){

		prb1[i] = array_jsonData[i][0]	//A3
		prb2[i] = array_jsonData[i][1]	//A2
		prb3[i] = array_jsonData[i][2]	//A1
		prb4[i] = array_jsonData[i][3]	//B1
		ans1[i] = array_jsonData[i][4]	//ans1
		ans2[i] = array_jsonData[i][5]	//ans2
		ans3[i] = array_jsonData[i][6]	//ans3

		console.log(i+"->>"+prb1[i]+":"+prb2[i]+":"+prb3[i]+"*"+prb4[i]
		+" = "+ans3[i]+":"+ans2[i]+":"+ans1[i]);
	}
	choiceProblem()
}

function choiceProblem(){
	//★★★問題番号を乱数で決定
	nowRcnt=int(random(1, array_jsonData.length));
	let i=nowRcnt;
	console.log(nowRcnt+"->>"+prb1[i]+":"+prb2[i]+":"+prb3[i]+"*"+prb4[i]+" = "+ans3[i]+":"+ans2[i]+":"+ans1[i]
	);
//	nowRcnt=1;//1～3までの乱数
	ans[1] = ans1[nowRcnt];
	ans[2] = ans2[nowRcnt];
	ans[3] = ans3[nowRcnt];
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
		this.rR = clr_makeLabelR[0]; this.rG = clr_makeLabelR[1]; this.rB = clr_makeLabelR[2];
		this.tR = clr_makeLabelText[0]; this.tG = clr_makeLabelText[1]; this.tB = clr_makeLabelText[2];
	}

	disp(){
		let YT=this.y + this.tsize*0.38;
		noStroke();
		rectMode(CENTER);
		fill(this.rR, this.rG, this.rB);
		rect(this.x, this.y, this.w, this.h);
		textAlign(CENTER); textSize(this.tsize);
		fill(this.tR, this.tG, this.tB);
		text(this.tstr, this.x, YT);
	}
}

function dispProblem(){

	//●●●問題枠(色なし)
	lblprb1 = new makeLabelNoFill(prb1[nowRcnt], 50*s, W1+w*24, h*10,  clr_problem)
	lblprb2 = new makeLabelNoFill(prb2[nowRcnt], 50*s, W1+w*32, h*10,  clr_problem)
	lblprb3 = new makeLabelNoFill(prb3[nowRcnt], 50*s, W1+w*40, h*10,  clr_problem)
	lblprb4 = new makeLabelNoFill(prb4[nowRcnt], 50*s, W1+w*40, h*20,  clr_problem)
	lblprb1.disp(); lblprb2.disp(); lblprb3.disp(); lblprb4.disp();

	//●●●問題に関する記号・図形など
	stroke(clr_problem); strokeWeight(5);
	line(W1+w* 6, h*24, W1+w*50, h*24)
	noStroke();
	textAlign(CENTER); textSize(50*s); fill(clr_problem);
	text("×", W1+w*16, h*23);
}

function dispMyAnswer(){
	//●●●解答に関する記号・図形など

	//●●●符号枠
		//rectMode(CENTER); fill(255, 128, 197);
		//rect(W1+w*16, h*24, w*9, h*13);

	//●●●解答枠：自分の解答表示(緑)
	lblMyAns1 = new makeLabel(myAns[1], 40*s, W1+w*40, h*30, w*6, h*10, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns2 = new makeLabel(myAns[2], 40*s, W1+w*32, h*30, w*6, h*10, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns3 = new makeLabel(myAns[3], 40*s, W1+w*24, h*30, w*6, h*10, clr_makeLabelMyAns,  clr_makeLabelMyAnsText);
	lblMyAns1.disp(); lblMyAns2.disp(); lblMyAns3.disp();

	//●●●解答枠：今から解答する枠(赤)
	rectMode(CENTER); fill(clr_NowAnsBox)
	if(mystatus == 1){ rect(W1+w*40, h*30, w*6, h*10); }
	if(mystatus == 2){ rect(W1+w*32, h*30, w*6, h*10); }
	if(mystatus == 3){ rect(W1+w*24, h*30, w*6, h*10); }
}

function dispOxMessage(){
	//解答後、「ox」「正解・残念」表示
	textAlign(CENTER)
	if(mystatus >= num_MyAns+1){	//最後にまとめて「ox」表示
	//	if(mystatus >= 1){							//解答するごとに「ox」表示
		lblOX1 = new makeLabelNoFill(ox[1], 90*s, W1+w*40, h*(30+8),  clr_makeLabelNoFillLblOX);
		lblOX2 = new makeLabelNoFill(ox[2], 90*s, W1+w*32, h*(30+8),  clr_makeLabelNoFillLblOX);
		lblOX3 = new makeLabelNoFill(ox[3], 90*s, W1+w*24, h*(30+8),  clr_makeLabelNoFillLblOX);
		lblOX1.disp(); lblOX2.disp(); lblOX3.disp();
	}

	//解答入力が終了したら
	if(mystatus >= num_MyAns+1){
		//正解表示
		flgALLresult = TRUE;
		lblAns1 = new makeLabelNoFill(ans[1], 30*s, W1+w*40, h*(30+9),  clr_makeLabelNoFillLblAns);
		lblAns2 = new makeLabelNoFill(ans[2], 30*s, W1+w*32, h*(30+9),  clr_makeLabelNoFillLblAns);
		lblAns3 = new makeLabelNoFill(ans[3], 30*s, W1+w*24, h*(30+9),  clr_makeLabelNoFillLblAns);
		lblAns1.disp(); lblAns2.disp(); lblAns3.disp();

		for(let i=1; i<=num_MyAns; i++){
			if(ox[i] == "x"){
				flgALLresult = FALSE;
			}
		}

		//メッセージ表示
		if(flgALLresult==TRUE){
			message = "RIGHT"
			lblMessage = new makeLabelNoFill(message, 55*s, W1+w*30, h*(-5)+H2,  clr_ansRight);
			lblMessage.disp();
		}else{
			message = "WRONG"
			lblMessage = new makeLabelNoFill(message, 50*s, W1+w*30, h*(-5)+H2,  clr_ansWrong);
			lblMessage.diWRONG
		}
	}
	if(flgALLresult==MID){
		lblMessage = new makeLabelNoFill(message, 50*s, W1+w*30, h*(-5)+H2,  clr_ansMid);
		lblMessage.disp();
	}
}


//------------------------------------
function dispScore(){
	//スコア枠
	rectMode(CORNER)	
	fill(clr_frameScore);
	rect(W1+w*43, h*(-10)+H2, w*14, h*10);

	//テキスト枠
	//スコア-ポイント1表示(連続正解記録)
	lblScoreText1 = new makeLabelNoFill("Continuous", 12*s, W1+w*47.5, h*(-5)+H2,  clr_Continuous);
	lblScoreText1.disp();

	lblScorePoint = new makeLabelNoFill(point1, 50*s, W1+w*54, h*(-5)+H2,  clr_Congratulation);
	lblScorePoint.disp();

	//スコア-クリア表示
	if(point1==MAXcontinuePoint){
		fill(255,0,0);rectMode(CORNER);
		rect(W1+w*0,h*0, w*62, H*2);
		lblClearText1 = new makeLabelNoFill("Continuous" + MAXcontinuePoint + "Clear", 40*s, W1+w*30, h* 15,  clr_Congratulation);
		lblClearText1.disp();


//		fill(255,255,255);textSize(60*s);
//		text("素晴らしい！",W1+w*30, h*30)
		lblClearText2 = new makeLabelNoFill("Congratulation !", 50*s, W1+w*30, h* 30,  clr_Congratulation);
		lblClearText2.disp();
	}
}

function dispButton(){
	//解答ボタン表示
	textAlign(CENTER)
	for(let n=0; n<=12; n++){
		i=n%3; j=int(n/3);
		posX=w*12+i*w*12; posY=h*6+j*h*12
		fill(0,0,255)
		if(n==9||n==11){fill(255, 128, 197)} // 符号ボタンの色
		if(n==12){fill(10, 190, 7)} // 小数点ボタンの色
		ellipse(W1+posX,H2+posY,r1*8,r1*8)
		fill(0, 255, 0); textSize(30*s);
		if(n==9||n==11){fill(0, 0, 255)} // 符号ボタンのテキスト色
		if(n==12){fill(0, 0, 255)} // 小数点ボタンのテキスト色
		text(b_disp[n], W1+posX, H2+posY +h*1)
	}

	//「次」表示
	rectMode(CENTER); textAlign(CENTER)
	fill(0,255,255)
	rect(W1+w*50, H2+h*18,w*14,h*32)
	fill(0, 0, 255); textSize(40*s);
	text("NEXT",W1+w*50, H2+h*18+6)

	//★★「取り消し」表示
	rectMode(CENTER); textAlign(CENTER)
	fill(255,0,0)
	rect(W1+w*50, H2+h*42,w*14,h*8)
	fill(255, 255, 255); textSize(40*s);
	text("DEL",W1+w*50, H2+h*(42+3))
}

function buttonNumNOW(){
	let btnNum=999;
	let tchX=mouseX; let tchY=mouseY;
	let tX=tchX-w*6-W1; let tY=tchY-H2-setLabelButtonMarginY;
	//「数字・符号」
	if((0+W1<=tX && tX+W1<=w*36) && (0<=tY && tY<=h*60)){
		let ii = int(tX/(w*12));
		let jj = int(tY/(h*12));
		let nearN = jj*3+ii
		if(0<=nearN && nearN<=12 && nearN!=10 && nearN!=11){
			btnNum = nearN;
		}
	}
	//「次」
	if(W1+w*44<=tchX && W1+tchX<=w*56 && H2+h*2<=tchY && tchY<=H2+h*34){
		btnNum = NEXTnum;
	}
	//「取り消し」
	if(W1+w*44<=tchX && W1+tchX<=w*56 && H2+h*38<=tchY && tchY<=H2+h*46){
		btnNum = DELETE1num;
	}
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
				text(myAns[mystatus], W1+w*16+(1-1)*w*12, h*24 + h*0.35)
				mystatus = int(mystatus)-1
				if(mystatus<0){mystatus	=0;}
			}
		}
		//★★「数字・符号」
		if(0<=btnNumNOW && btnNumNOW<=12){
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
