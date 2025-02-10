
// a/b + c/d = (a/G)/(b/G)-> a,b,c,d 1桁 答 1桁/1桁
//計算トレーニング問題 データ読み込み方式取り入れる
//クラス使用

//初期設定begin

// 確認が必要な準備
NOWversion="1.01"
num_MyAns = 6;
MAXcontinuePoint = 10;
b_disp = ["7","8","9","4","5","6","1","2","3","-","0","+","."]
// b_real = ["7","8","9","4","5","6","1","2","3","-","0",".","+"]
NEXTnum=20; DELETE1num=21; 
btnNumNOW=999

//一応、確認が必要な準備
prb_a=[]; prb_b=[];prb_c=[]; prb_d=[];
ans1 = []; ans2 = []; ans3 = []; ans4 = []; ans5 = []; ans6 = [];
myAns = []; myAns[0] = ""; myAns[1] = ""; myAns[2] = ""; myAns[3] = ""; myAns[4] = ""; myAns[5] = ""; myAns[6] = "";
ox = []; ox[1] = ""; ox[2] = ""; ox[3] = ""; ox[4] = "";
nowRcnt=0;
ans=[];
//	lbl=[];

//単なる準備
message = "解答中"
mystatus = 1
TRUE=0;FALSE=1;MID=2;
flgALLresult = MID;
point1=0;
//t=[]

//初期設定end

// ProblemDataのデータを外部ファイルから読み込む

fetch('dataBunsuu.json') // 外部ファイルのパスを指定
    .then(response => response.json())
    .then(data => {
        array_ProblemData_Tuubun01 = data; // 読み込んだデータをProblemDataに設定
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
	W2=0; H2=u*40;
	createCanvas(window.innerWidth, window.innerHeight);

	rectMode(CENTER); textAlign(CENTER);FLG="";

	makeProblem()//★
}

function draw() {
	background(0,(point1*25)+5,(point1*26))
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
	//array_ProblemData_Tuubun01=[
	//["a","b","c","d","bunsi1","bunsi2","ansbunsi","ansbunbo"],
	console.log("array_ProblemData_Tuubun01.length[] =",array_ProblemData_Tuubun01.length);
	for(let i=1; i<array_ProblemData_Tuubun01.length; i++){
		let _bunsi1=array_ProblemData_Tuubun01[i][4]
		let _bunsi2=array_ProblemData_Tuubun01[i][5]
		let _ansbunsi=array_ProblemData_Tuubun01[i][6]
		let _ansbunbo=array_ProblemData_Tuubun01[i][7]

		prb_a[i]=array_ProblemData_Tuubun01[i][0]
		prb_b[i]=array_ProblemData_Tuubun01[i][1]
		prb_c[i]=array_ProblemData_Tuubun01[i][2]
		prb_d[i]=array_ProblemData_Tuubun01[i][3]
		ans1[i] =_ansbunbo
		ans2[i] =_bunsi1
		ans3[i] =_ansbunbo
		ans4[i] =_bunsi2
		ans5[i] =_ansbunbo
		ans6[i] =_ansbunsi
		console.log(i+"->>"+prb_a[i]+"/"+prb_b[i]+"+"+prb_c[i]+"/"+prb_d[i]
		+" = "+_bunsi1+"/"+_ansbunbo+"+"+_bunsi2+"/"+_ansbunbo+"="+_ansbunsi+"/"+_ansbunbo);
	}
	choiceProblem()
}

function choiceProblem(){
	//★★★問題番号を乱数で決定
	nowRcnt=int(random(1,array_ProblemData_Tuubun01.length));
	let i=nowRcnt;
	console.log(nowRcnt+"->>"+prb_a[i]+"/"+prb_b[i]+"+"+prb_c[i]+"/"+prb_d[i]);
//	nowRcnt=1;//1～3までの乱数
	ans[1] = ans1[nowRcnt];
	ans[2] = ans2[nowRcnt];
	ans[3] = ans3[nowRcnt];
	ans[4] = ans4[nowRcnt];
	ans[5] = ans5[nowRcnt];
	ans[6] = ans6[nowRcnt];
}

class makeLabelNoFill {
	constructor(_str, _tsize, _x, _y, _tR, _tG, _tB){
		this.tstr = _str;
		this.x = _x; this.y = _y;
		this.tsize = _tsize; 
		this.tR = _tR; this.tG = _tG; this.tB = _tB;
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
	constructor(_str, _tsize, _x, _y, _w, _h, _rR, _rG, _rB, _tR, _tG, _tB){
		this.tstr = _str;
		this.x = _x; this.y = _y; this.w = _w; this.h = _h;
		this.tsize = _tsize; 
		this.rR = _rR; this.rG = _rG; this.rB = _rB;
		this.tR = _tR; this.tG = _tG; this.tB = _tB;
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

/*
class makeJustLabel {
	constructor(_str, _tsize, _x, _y, _rR, _rG, _rB, _tR, _tG, _tB){
		this.tstr = _str;
		this.tsize = _tsize; 
		textSize(this.tsize);
		this.x = _x; this.y = _y; this.w = textWidth(this.tstr); this.h = _tsize;
		this.rR = _rR; this.rG = _rG; this.rB = _rB;
		this.sR = _tR; this.tG = _tG; this.tB = _tB;
	}

	disp(){
		let YT=this.y + this.tsize*0.38;
		rectMode(CENTER);
		fill(this.rR, this.rG, this.rB);
		rect(this.x, this.y, this.w, this.h);
		textAlign(CENTER); textSize(this.tsize);
		fill(this.tR, this.tG, this.tB);
		text(this.tstr, this.x, YT);
	}
}
*/

function dispProblem(){
	lblPrb_a = new makeLabelNoFill(prb_a[nowRcnt], 50*s, W1+w*8, h*10,  255,0,255)
	lblPrb_b = new makeLabelNoFill(prb_b[nowRcnt], 50*s, W1+w*8, h*24,  255,0,255)
	lblPrb_c = new makeLabelNoFill(prb_c[nowRcnt], 50*s, W1+w*18, h*10,  255,0,255)
	lblPrb_d = new makeLabelNoFill(prb_d[nowRcnt], 50*s, W1+w*18, h*24,  255,0,255)
	lblPrb_a.disp(); lblPrb_b.disp(); lblPrb_c.disp(); lblPrb_d.disp();

	stroke(255,0,255); strokeWeight(5);
	line(W1+w* 6, h*16, W1+w*10, h*16)
	line(W1+w*16, h*16, W1+w*20, h*16)
	noStroke();
	textAlign(CENTER); textSize(50*s); fill(255,0,255);
	text("+", W1+w*13, h*18);
}

function dispMyAnswer(){
	//解答に関する記号など
	stroke(255,0,255); strokeWeight(5);
	line(W1+w*30, h*16, W1+w*34, h*16)
	line(W1+w*40, h*16, W1+w*44, h*16)
	line(W1+w*54, h*16, W1+w*58, h*16)
	noStroke();
	textAlign(CENTER); textSize(50*s); fill(255,0,255);
	text("=", W1+w*25, h*18);
	text("+", W1+w*37, h*18);
	text("=", W1+w*49, h*18);

	//符号枠
		//rectMode(CENTER); fill(255, 128, 197);
		//rect(W1+w*16, h*24, w*9, h*13);
	//解答枠(緑)
	//自分の解答表示
	lblMyAns1 = new makeLabel(myAns[1], 40*s, W1+w*32,h*24, w*6, h*10, 0,255,0,  0,0,255);
	lblMyAns2 = new makeLabel(myAns[2], 40*s, W1+w*32,h* 8, w*6, h*10, 0,255,0,  0,0,255);
	lblMyAns3 = new makeLabel(myAns[3], 40*s, W1+w*42,h*24, w*6, h*10, 0,255,0,  0,0,255);
	lblMyAns4 = new makeLabel(myAns[4], 40*s, W1+w*42,h* 8, w*6, h*10, 0,255,0,  0,0,255);
	lblMyAns5 = new makeLabel(myAns[5], 40*s, W1+w*56,h*24, w*6, h*10, 0,255,0,  0,0,255);
	lblMyAns6 = new makeLabel(myAns[6], 40*s, W1+w*56,h* 8, w*6, h*10, 0,255,0,  0,0,255);
	lblMyAns1.disp(); lblMyAns2.disp(); lblMyAns3.disp(); lblMyAns4.disp(); lblMyAns5.disp(); lblMyAns6.disp();

//今から解答する枠(赤)
	rectMode(CENTER); fill(255,0,0)
	if(mystatus == 1){ rect(W1+w*32, h*24, w*6, h*10); }
	if(mystatus == 2){ rect(W1+w*32, h* 8, w*6, h*10); }
	if(mystatus == 3){ rect(W1+w*42, h*24, w*6, h*10); }
	if(mystatus == 4){ rect(W1+w*42, h* 8, w*6, h*10); }
	if(mystatus == 5){ rect(W1+w*56, h*24, w*6, h*10); }
	if(mystatus == 6){ rect(W1+w*56, h* 8, w*6, h*10); }
}

function dispOxMessage(){
	//解答後、「ox」「正解・残念」表示
	textAlign(CENTER)
	if(mystatus >= num_MyAns+1){	//最後にまとめて「ox」表示
	//	if(mystatus >= 1){							//解答するごとに「ox」表示
		lblOX1 = new makeLabelNoFill(ox[1], 100*s, W1+w*32, h*(24-1),  255,0,0);
		lblOX2 = new makeLabelNoFill(ox[2], 100*s, W1+w*32, h*( 8-1),  255,0,0);
		lblOX3 = new makeLabelNoFill(ox[3], 100*s, W1+w*42, h*(24-1),  255,0,0);
		lblOX4 = new makeLabelNoFill(ox[4], 100*s, W1+w*42, h*( 8-1),  255,0,0);
		lblOX5 = new makeLabelNoFill(ox[5], 100*s, W1+w*56, h*(24-1),  255,0,0);
		lblOX6 = new makeLabelNoFill(ox[6], 100*s, W1+w*56, h*( 8-1),  255,0,0);
		lblOX1.disp(); lblOX2.disp(); lblOX3.disp(); lblOX4.disp(); lblOX5.disp(); lblOX6.disp();
	}

	//解答入力が終了したら
	if(mystatus >= num_MyAns+1){
		//正解表示
		flgALLresult = TRUE;
		lblAns1 = new makeLabelNoFill(ans[1], 30*s, W1+w*36, h*(24-0),  255,255,255);
		lblAns2 = new makeLabelNoFill(ans[2], 30*s, W1+w*36, h*( 8-0),  255,255,255);
		lblAns3 = new makeLabelNoFill(ans[3], 30*s, W1+w*46, h*(24-0),  255,255,255);
		lblAns4 = new makeLabelNoFill(ans[4], 30*s, W1+w*46, h*( 8-0),  255,255,255);
		lblAns5 = new makeLabelNoFill(ans[5], 30*s, W1+w*60, h*(24-0),  255,255,255);
		lblAns6 = new makeLabelNoFill(ans[6], 30*s, W1+w*60, h*( 8-0),  255,255,255);
		lblAns1.disp(); lblAns2.disp(); lblAns3.disp(); lblAns4.disp(); lblAns5.disp(); lblAns6.disp();

		for(let i=1; i<=num_MyAns; i++){
			if(ox[i] == "x"){
				flgALLresult = FALSE;
			}
		}

		//メッセージ表示
		if(flgALLresult==TRUE){
			message = "正解"
			lblMessage = new makeLabelNoFill(message, 55*s, W1+w*30, h*36,  0,255,0);
			lblMessage.disp();
		}else{
			message = "残念"
			lblMessage = new makeLabelNoFill(message, 50*s, W1+w*30, h*36,  255,0,0);
			lblMessage.disp();
		}
	}
	if(flgALLresult==MID){
		lblMessage = new makeLabelNoFill(message, 50*s, W1+w*30, h*36,  255,255,0);
		lblMessage.disp();
	}
}


//------------------------------------
function dispScore(){
	//スコア枠
	rectMode(CORNER)	
	fill(255,0,255);
	rect(W1+w*43, h*31, w*14, h*10);

	//テキスト枠
	//スコア-ポイント1表示(連続正解記録)
	lblScoreText1 = new makeLabelNoFill("連続正解", 12*s, W1+w*47.5, h*36,  255,255,255);
	lblScoreText1.disp();

	lblScorePoint = new makeLabelNoFill(point1, 50*s, W1+w*54, h*36,  255,255,255);
	lblScorePoint.disp();

	//スコア-クリア表示
	if(point1==MAXcontinuePoint){
		fill(255,0,0);rectMode(CORNER);
		rect(W1+w*0,h*0, w*62, h*41);
		lblClearText1 = new makeLabelNoFill("連続" + MAXcontinuePoint + "回クリア", 60*s, W1+w*30, h* 15,  255,255,255);
		lblClearText1.disp();


//		fill(255,255,255);textSize(60*s);
//		text("素晴らしい！",W1+w*30, h*30)
		lblClearText2 = new makeLabelNoFill("素晴らしい！", 60*s, W1+w*30, h* 30,  255,255,255);
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
		if(n==12){fill(10, 10, 10)} // 小数点ボタンの色
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
	text("次",W1+w*50, H2+h*18+6)

	//★★「取り消し」表示
	rectMode(CENTER); textAlign(CENTER)
	fill(255,0,0)
	rect(W1+w*50, H2+h*42,w*14,h*8)
	fill(255, 255, 255); textSize(40*s);
	text("消",W1+w*50, H2+h*(42+3))
}



function buttonNumNOW(){
	let btnNum=999;
	let tchX=mouseX; let tchY=mouseY;
	let tX=tchX-w*6-W1; let tY=tchY-H2;
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
				btnNumNOW=999; flgALLresult = MID; message="解答中"
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
