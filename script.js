var Xpos = 0;
var Jpos = 0;
var speed = 3;
var grav = 5;
var key = [];

var Pbox;
var box1;
var box2;
var Wbox;




var Ptop;
var Pleft;
var Pwidth; 
var Pheight;

var B1top;
var B1left;
var B1width; 
var B1height;

var B2top;
var B2left;
var B2width; 
var B2height;

var Wtop;
var Wleft;
var Wwidth; 
var Wheight;



function boD() {
Pbox = document.getElementById('Pbox');
box1 = document.getElementById('box1');
box2 = document.getElementById('box2');
Wbox = document.getElementById('Wbox');	



// PLAYER ---------------------------------------
var  Pstyle = window.getComputedStyle(Pbox,null);
	 Pwidth = parseInt(Pstyle.width);
	 Pheight = parseInt(Pstyle.height);
var  Prect = Pbox.getBoundingClientRect();
	 Ptop =  Prect.top; 
	 Pleft =  Prect.left;

var  B1style = window.getComputedStyle(box1,null);
	 B1width = parseInt(B1style.width);
	 B1height = parseInt(B1style.height);
var  B1rect = box1.getBoundingClientRect();
	 B1top =  B1rect.top; 
	 B1left = B1rect.left;

var B2style = window.getComputedStyle(box2,null);
	B2width = parseInt(B2style.width);
	B2height = parseInt(B2style.height);
var B2rect = box2.getBoundingClientRect();
	B2top = B2rect.top; 
	B2left = B2rect.left;

var Wstyle = window.getComputedStyle(Wbox,null);
	Wwidth = parseInt(Wstyle.width);
	Wheight = parseInt(Wstyle.height);
var Wrect = Wbox.getBoundingClientRect();
	Wtop =   Wrect.top; 
	Wleft =   Wrect.left;
}


var keyRes = 0;
setInterval(window.onload = function(){
keyRes+=1;
if (keyRes>=70) {keyRes=69}
},150);

setInterval(window.onload = function Update(){
boD();
Xpos = Pleft;
Jpos = Ptop;

//gravity
Jpos+=grav;
Pbox.style.top=Jpos+"px";

if (key[32]) {
keyRes+=1;
if (keyRes>=70) {
Jpos-=grav+10;
Pbox.style.top=Jpos+"px";}

if (keyRes >= 80) {keyRes = 1}
}	


if(key[65]){
Xpos-=speed;
Pbox.style.left=Xpos+"px";
}

if(key[68]){
Xpos+=speed;
Pbox.style.left=Xpos+"px";
}
},10)

window.onkeydown = function Update(e){key[e.keyCode] = true;}
window.onkeyup = function Update(e){key[e.keyCode] = false;}



// A.I OF THE GAME ---------------------------------------------------------------------------
var botSpeed = 1;
var botX = 0;
var botY = 0;
var botgrav = 3;
var dir = 0;

var bullet1;
var bullet2;
var bullet3;

var bot;
var bottop;
var botleft;
var botwidth; 
var botheight;

function BotD(){
bot = document.getElementById('robot');
var  Botstyle = window.getComputedStyle(bot,null);
	 botwidth = parseInt(Botstyle.width);
	 botheight = parseInt(Botstyle.height);
var  Botrect = bot.getBoundingClientRect();
	 bottop =  Botrect.top; 
	 botleft =  Botrect.left;


bullet1 = document.getElementById('bullet1');
bullet2 = document.getElementById('bullet2');
bullet3 = document.getElementById('bullet3');
}


setInterval(window.onload = function(){
BotD();

botX = botleft;
botY = bottop;
botY+=botgrav;
bot.style.top=botY+"px";
if (Pleft >= botleft+5) {
	botX+=botSpeed;
	bot.style.left=botX+"px";
	bot.style.transform="rotateY(360deg)";
	dir = 2000;
} else if (Pleft-5 <= botleft){
	botX-=botSpeed;
	bot.style.left=botX+"px";
	bot.style.transform="rotateY(180deg)";
	dir = -2000;
}

},10);


/*Robot collition detector*/
var Detector01 = null;var Detector04 = null;
var Detector02 = null;var Detector05 = null;
var Detector03 = null;var Detector06 = null;

setInterval(window.onload = function(){
boD();

if(bottop+botheight >=  B1top && bottop<=  B1top+B1height)
{Detector01 = bottop} else {Detector01 = null}
if (botleft+botwidth >=  B1left && botleft<=  B1left+B1width)
{Detector02 =  B1top} else {Detector02 = null}

if(bottop+botheight >=  B2top && Ptop<=  B2top+B2height)
{Detector03 = bottop} else {Detector03 = null}
if (botleft+botwidth >=  B2left && botleft <=  B2left+B2width)
{Detector04 =  B2top} else {Detector04 = null}

if(bottop+botheight >=  Wtop && Ptop <=  Wtop+Wheight)
{Detector05 = Ptop} else {Detector05 = null}
if (botleft+botwidth >=  Wleft && botleft <=  Wleft+Wwidth)
{Detector06 =  Wtop} else {Detector06 = null}


if (Detector01 != null && Detector02 != null) {
botgrav = 0;
botX+=botSpeed;
bot.style.left=botX+"px";

if (Ptop <= bottop) {
botY-=botgrav+1;
bot.style.top=botY+"px";
}


}

 else if (Detector03 != null && Detector04 != null) {botgrav = 0;}
	else if (Detector5 != null && Detector6 != null) {botgrav = 2;} else{botgrav = 3;botSpeed=1}

},10);




//Shooting
var Bshooter = 0; 
setInterval(function(){
BotD();

var Tbot = bottop+13;
var Lbot = botleft+10;

if (Ptop+10>= bottop) {
Bshooter++;
if (Bshooter >= 4 ) {Bshooter = 1;}

bullet1.style.cssText="top:"+Tbot+"px;left:"+Lbot+"px;";
bullet2.style.cssText="top:"+Tbot+"px;left:"+Lbot+"px;";
bullet3.style.cssText="top:"+Tbot+"px;left:"+Lbot+"px;";

if (Bshooter == 1) {
	bullet2.className="";
	bullet3.className="";
	bullet1.className="js";
	bullet1.style.transform ="translateX("+dir+"px)";
} else if (Bshooter == 2) {
	bullet1.className="";
	bullet3.className="";
	bullet2.className="js";
	bullet2.style.transform ="translateX("+dir+"px)";
} else if (Bshooter == 3) {
	bullet2.className="";
	bullet1.className="";
	bullet3.className="js";
	bullet3.style.transform ="translateX("+dir+"px)";
	}
}

},1000);


var Detector1 = null;var Detector2 = null;
var Detector3 = null;var Detector4 = null;
var Detector5 = null;var Detector6 = null;

setInterval(window.onload = function(){
boD();

if(Ptop+Pheight >=  B1top && Ptop<=  B1top+B1height+2)
{Detector1 = Ptop} else {Detector1 = null}
if (Pleft+Pwidth >=  B1left && Pleft<=  B1left+B1width+2)
{Detector2 =  B1top} else {Detector2 = null}

if(Ptop+Pheight >=  B2top && Ptop<=  B2top+B2height+2)
{Detector3 = Ptop} else {Detector3 = null}
if (Pleft+Pwidth >=  B2left && Pleft <=  B2left+B2width+2)
{Detector4 =  B2top} else {Detector4 = null}

if(Ptop+Pheight >=  Wtop && Ptop <=  Wtop+Wheight+2)
{Detector5 = Ptop} else {Detector5 = null}
if (Pleft+Pwidth >=  Wleft && Pleft <=  Wleft+Wwidth+2)
{Detector6 =  Wtop} else {Detector6 = null}


if (Detector1 != null && Detector2 != null) {
grav = 0;
if(key[65]){Xpos+=speed;Pbox.style.left=Xpos+"px";}
if(key[68]){Xpos-=speed;Pbox.style.left=Xpos+"px";}}

 else if (Detector3 != null && Detector4 != null) {grav =0}
	else if (Detector5 != null && Detector6 != null) {grav=1} else{grav=5;speed=3}

},10);



