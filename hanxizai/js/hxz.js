/*
createby
carlosRen
    ︵  ︵
   ( ○  ○ )
 (○  ╭╮ ○)
  ╲ ╰╯ ╱ 
   │  凸  │

 */
// JavaScript Document
if(document.attachEvent){
　　　　document.onreadystatechange=function(){
　　　　//if(document.readyState=='interactive'){
　　　　　　Start();
　　　　//}
　　　　};
　　}
　　else
　　{
　　　　document.addEventListener("DOMContentLoaded",Start,false);
　　}
　　function Start(){
　　　　window.onload = function(e){
		//console.log("1111");
		$("#backcolor").css("z-index","0");
		init();
		//location.href = location.href;
		// location.replace(location.href);
		}
　　}




window.levelcontrolvar = 0;
var Time = 0;
window.absoluteX = 0;
window.absoluteY = 0;
window.absoluteZ = 0;
window.nowpart = 1;
window.videoplay = 0;
window.status = 0;
window.fullscreen = 0;
var imgArr = [];
window.movebarStartX = 0;
mousemovelock = 0;
movebarmarginleft = 0;
window.backlevelcontroller = 0;
window.leftstatus = 0 ;//0是关闭
window.rightstatus = 0 ;
window.level2infostatus = 0;
//window.level2infodescriptionstatus = 0;
window.autoshowhelp = 0;
window.canvas_height = 0;

function initinfocheck(){
	$('#hxzcanvas').bind("mousemove",function(e){
		var canvas = document.getElementById("hxzcanvas");
		var context = canvas.getContext("2d");
		//当前浏览器的宽和高
		var width = canvas.width / 6;
		var height = canvas.height;
		pic_h = Math.round( canvas.height / 2);
		moveX =  e.offsetX || e.originalEvent.layerX;
		moveY =  e.offsetY || e.originalEvent.layerY;
		var startx = (window.absoluteX + moveX - width);
		var starty = window.absoluteY;
		var endx =  (window.absoluteX  + moveX +width);
		var endy =  (window.absoluteY  + height);

	/*	if(window.absoluteZ == 1){
			var startx = (window.absoluteX+e.offsetX-width  ) *(95937/(11652 * pic_h / 256));
			var starty = (window.absoluteY) *(95937/(11652 * pic_h / 256));
			var endx =  (window.absoluteX +e.offsetX +width)*(95937/(11652 * pic_h / 256)) ;
			var endy =  (window.absoluteY  +height)*(95937/(11652 * pic_h / 256)) ;
			tempx = (11652 * pic_h / 256) / 95937 ;
			tempy = (11652 * pic_h / 256) / 95937 ;
		}
		if(window.absoluteZ == 2){
			var startx = (window.absoluteX+e.offsetX -width ) * (95937/(23816));
			var starty = (window.absoluteY ) * (95937/(23816));
			var endx =  (window.absoluteX +e.offsetX +width)*(95937/(23816)) ;
			var endy =  (window.absoluteY +height)*(95937/(23816)) ;
			tempx = (23816/(95937)) ;
			tempy = (23816/(95937)) ;
			}
		if(window.absoluteZ == 3){
			var startx = (window.absoluteX+e.offsetX -width ) *(95937/(47631));
			var starty = (window.absoluteY )*(95937/(47631));
			var endx =  (window.absoluteX +e.offsetX +width)*(95937/(47631)) ;
			var endy =  (window.absoluteY +height)*(95937/(47631)) ;
			tempx = (47631/(95937)) ;
			tempy = (47631/(95937)) ;
			}	

		if(window.absoluteZ == 4){
			var startx =0;
			var starty =0;
			var endx = 0 ;
			var endy = 0;
			tempx = 1 ;//getPoints
			tempy = 1 ;
		}*/


		/*var startx = startx + e.offsetX - 100;
		var endx = startx + e.offsetX + 100;
		var starty = starty + e.offsetY - 100;
		var endy= starty + e.offsetY+100;*/
		var arr = getPoints(startx,starty,endx,endy);
/*		if(window.absoluteZ == 1){
			var startx = Math.round((window.absoluteX + moveX  )* 256 / pic_h)  - width ;
			var starty =Math.round( window.absoluteY * 256 / pic_h);
			var endx =  Math.round((window.absoluteX + moveX ) * 256 / pic_h) + width ;
			var endy =  Math.round(window.absoluteY * 256 / pic_h)  + height ;
			arr = getPoints(startx,starty,endx,endy);
		}*/
		//console.log(endy)
		//console.log(arr)
		$('.infopoint').css("opacity","0");
		$('.infopoint2').css("opacity","0");
		for(var i = 0;i < arr.length;i++){
			//console.log(arr[i].id);
			$("#"+arr[i].id).css('opacity','100');
		}
		/*console.log("m");
		console.log(e.offsetX);
		console.log(e.offsetY);*/
		//console.log(e.offsetX);
	});
}
function initbutton(buttonname){
	$("#"+buttonname).attr("src","./resource/img/hxz/button/"+buttonname+".png");
	}
function changebutton(buttonname){
	$("#"+buttonname).attr("src","./resource/img/hxz/button/hover_"+buttonname+".png");
	}
function initbutton2(){
	if(window.status == 0){
		$("#button2").attr("src","./resource/img/hxz/button/button2.png");
		}else if(window.status == 1){
			$("#button2").attr("src","./resource/img/hxz/button/button2_1.png");
			}
	
	}
function changebutton2(){
	if(window.status == 0){
		$("#button2").attr("src","./resource/img/hxz/button/hover_button2.png");
		}else if(window.status == 1){
			$("#button2").attr("src","./resource/img/hxz/button/hover_button2_1.png");
			}
	}

function showhelp(){
	//alert("showhelp");
	$("#guide").css("visibility","visible");
	$("body").unbind("mousewheel");
}	
function closeguidepic(){
	$("#guide").css("visibility","hidden");
	mousewheelinit();
}
function clearlv2info(){
	document.getElementById("indexaudio").volume = 1;
	$("#readinfo").attr('src','');//没有文件了 停止播放了
	var innerHTMLstr = '';
	innerHTMLstr += '<img id="1-1" class="hiddeninfo" src="./resource/img/hxz/level2/line1-1.png" draggable="false" />';
	innerHTMLstr += '<img id="1-2" class="hiddeninfo" src="./resource/img/hxz/level2/line1-2.png" draggable="false" />';
	innerHTMLstr += '<img id="2-1" class="hiddeninfo" src="./resource/img/hxz/level2/line2-1.png" draggable="false" />';
	innerHTMLstr += '<img id="2-2" class="hiddeninfo" src="./resource/img/hxz/level2/line2-2.png" draggable="false" />';
	innerHTMLstr += '<img id="2-3" class="hiddeninfo" src="./resource/img/hxz/level2/line2-3.png" draggable="false" />';
	innerHTMLstr += '<img id="3-1" class="hiddeninfo" src="./resource/img/hxz/level2/line3-1.png" draggable="false" />';
	innerHTMLstr += '<img id="3-2" class="hiddeninfo" src="./resource/img/hxz/level2/line3-2.png" draggable="false" />';
	innerHTMLstr += '<img id="4-1" class="hiddeninfo" src="./resource/img/hxz/level2/line4-1.png" draggable="false" />';
	innerHTMLstr += '<img id="4-2" class="hiddeninfo" src="./resource/img/hxz/level2/line4-2.png" draggable="false" />';
	innerHTMLstr += '<img id="4-3" class="hiddeninfo" src="./resource/img/hxz/level2/line4-3.png" draggable="false" />';
	innerHTMLstr += '<img id="5-2" class="hiddeninfo" src="./resource/img/hxz/level2/line5-2.png" draggable="false" />';
	innerHTMLstr += '<img id="5-3" class="hiddeninfo" src="./resource/img/hxz/level2/line5-3.png" draggable="false" />';

	document.getElementById("level2info").innerHTML = innerHTMLstr;

	$("#infopoint1").attr('src','./resource/img/hxz/button/icons/infopoint1.png');
	$("#infopoint2").attr('src','./resource/img/hxz/button/icons/infopoint2.png');
	$("#infopoint3").attr('src','./resource/img/hxz/button/icons/infopoint3.png');

	document.getElementById("level2infodecriptionpic").innerHTML = '';
}


function showdescription(position,infoPicName){
	clearlv2info();
	$('#infopoint'+infoPicName.substring(2,3)).attr('src','./resource/img/hxz/button/icons/infopoint'+infoPicName.substring(2,3)+'.png');
	document.getElementById("level2infodecriptionpic").innerHTML = '';
	if(infoPicName != '5-1'){
		$('#'+infoPicName).attr('class','hiddeninfo');
	}
	$("#readinfo").attr('src','');
	$('#infopoint'+infoPicName.substring(2,3)).attr('src','./resource/img/hxz/button/icons/infopoint'+infoPicName.substring(2,3)+'_clicked.png');
	var innerHTMLstring = '';
	innerHTMLstring +='<img id="infopic_'+infoPicName+'" class = "lv2description'+ position +'" src="./resource/img/hxz/level2/text'+infoPicName+'.png" />';
	document.getElementById("level2infodecriptionpic").innerHTML = innerHTMLstring;
	if(infoPicName != "5-1"){
		$('#'+infoPicName).attr('class','showinfo');
	}
	$("#readinfo").attr('src','./resource/sound/'+infoPicName+'.mp3');
	$("#readinfo").attr('autoplay','autoplay');
	document.getElementById("indexaudio").volume = 0.382;
}


function infodescription(){
	if(window.level2infostatus == 0 ){//代表关闭
		//console.log($("#down_buttons").width()/2); 
		$("#down_buttons").animate({marginLeft:(0-$("#down_buttons").width()/2.5)});
		//var innerHtmlStr = document.getElementById("down_buttons").innerHTML;
		setTimeout(function(){
			$("#down_info_buttons").css("visibility","visible");
			//$("#infopoint1").css("visibility","visible");
			//$("#infopoint2").css("visibility","visible");
			//$("#infopoint3").css("visibility","visible");

		},300);
		$("#infopoint1").css("opacity",0);
		$("#infopoint2").css("opacity",0);
		$("#infopoint3").css("opacity",0);
		$("#infopoint1").css("visibility","visible");
		$("#infopoint2").css("visibility","visible");
		$("#infopoint3").css("visibility","visible");
		$("#infopoint1").delay(300).animate({opacity:100});
		$("#infopoint2").delay(300).animate({opacity:100});
		$("#infopoint3").delay(300).animate({opacity:100});
		//=====================不同的nowpart绑定不同的事件
		if(nowpart == 1 ){ //两个
			//setTimeout(function(){
			
			$("#infopoint3").css("visibility","hidden");
			$("#infopoint1").attr("onClick",'showdescription(0,"1-1")');
			$("#infopoint2").attr("onClick",'showdescription(0,"1-2")');
			//},300);
			
		}
		if(nowpart == 2){
			$("#infopoint1").attr("onClick",'showdescription(0,"2-1")');
			$("#infopoint2").attr("onClick",'showdescription(0,"2-2")');
			$("#infopoint3").attr("onClick",'showdescription(0,"2-3")');
		}
		if(nowpart == 3 ){ //两个
			$("#infopoint3").css("visibility","hidden");
			$("#infopoint1").attr("onClick",'showdescription(2,"3-1")');
			$("#infopoint2").attr("onClick",'showdescription(2,"3-2")');
		}
		if(nowpart == 4){
			$("#infopoint1").attr("onClick",'showdescription(2,"4-1")');
			$("#infopoint2").attr("onClick",'showdescription(2,"4-2")');
			$("#infopoint3").attr("onClick",'showdescription(2,"4-3")');
		}
		if(nowpart == 5){
			$("#infopoint1").attr("onClick",'showdescription(2,"5-1")');
			$("#infopoint2").attr("onClick",'showdescription(2,"5-2")');
			$("#infopoint3").attr("onClick",'showdescription(0,"5-3")');
		}
		window.level2infostatus = 1;
		//console.log(window.level2infostatus);
	}else{
		$("#down_buttons").animate({marginLeft:0});
		$("#down_info_buttons").css("visibility","hidden");
		$("#infopoint1").css("visibility","hidden");
		$("#infopoint2").css("visibility","hidden");
		$("#infopoint3").css("visibility","hidden");
		clearlv2info();
		window.level2infostatus = 0;
		}
}
function level2infoinit(){

	$("#down_info_buttons").css("visibility","hidden");
	$("#infopoint1").css("visibility","hidden");
	$("#infopoint2").css("visibility","hidden");
	$("#infopoint3").css("visibility","hidden");
	document.getElementById("level2infodecriptionpic").innerHTML ='';
	window.level2infostatus = 0;	
	$("#down_button0").attr('onClick',"infodescription()");
}
function clickleftshowctrl(){
	$("#leftshowctrl").click(function(){
		clearpoint();
		if(window.leftstatus == 0){//开启
			if(window.rightstatus == 1){
				$("#rightshow").animate({right:'-23%'});
			}
			$("#leftshow").animate({left:0});
			window.leftstatus = 1;
		}else if(window.leftstatus == 1){
			$("#leftshow").animate({left:'-610px'});
			$("body").bind("mousewheel");
			window.leftstatus = 0;
		}
	  	if(window.leftstatus == 0 || window.rightstatus == 0){
	  		mousewheelinit();
	  	}
	}); 
}

function clickrightshowctrl(){
	$("#rightshowctrl").click(function(){
		clearpoint();
		if(window.rightstatus == 0){//开启
			if(window.leftstatus == 1){
				$("#leftshow").animate({left:'-610px'});
			}
			
			$("#rightshow").animate({right:0});
			window.rightstatus = 1;
		}else if(window.rightstatus == 1){
			$("#rightshow").animate({right:'-23%'});
			$("body").bind("mousewheel");
			window.rightstatus = 0;
		}
	  	if(window.leftstatus == 0 || window.rightstatus == 0){
	  		mousewheelinit();
	  	}
	}); 
}

//初始化
function initmovebar(){
	var canvas = document.getElementById("hxzcanvas");
	var context = canvas.getContext("2d");
	//当前浏览器的宽和高
	var width = canvas.width;
	var height = canvas.height;
	var moveLock = 0;

	pic_h = Math.round( canvas.height / 2);
	//获得滑块的宽度
	var movebarwidth = $("#movebar").width();
	window.movebarStartX = 0;
	if(window.absoluteZ == 1){
		pic_h = Math.round( canvas.height / 2);
		window.borderx =Math.round(47*pic_h - width);
	}else{
		pic_h = 256;
		if(window.absoluteZ == 2){
			window.borderx = Math.round(23560 +256 - width);//23729
		}else if(window.absoluteZ == 3){
			window.borderx = Math.round(47375 +256 - width);//47714
		}else if(window.absoluteZ == 4){
			window.borderx = Math.round(95937 - width);//95681
		}
	}

	//movebarborder = width - movebarwidth/2;
	movebarborder = width - movebarwidth;
	var piclength = window.absoluteX - pic_h*14*Math.pow(2,window.absoluteZ -1 );
	if(piclength<0){
		piclength = 0;
	}

	if( window.absoluteX > window.borderx - pic_h*5.5*Math.pow(2,window.absoluteZ -1 ) ){
		piclength = window.borderx - pic_h*5.5*Math.pow(2,window.absoluteZ -1 );
	}

	movebarmarginleft = piclength * movebarborder  /(window.borderx - pic_h*19.5*Math.pow(2,window.absoluteZ -1 ));
	if(movebarmarginleft<0){
		movebarmarginleft = 0;
	}
	if(movebarmarginleft>movebarborder){
		movebarmarginleft = movebarborder ;
	}
	
	$("#movebar").css("left",movebarmarginleft+"px");

	$("#b_tuowei").removeClass("colorchange");
	$("#b_hougeshui").removeClass("colorchange");
	$("#b_yelanyuxing").removeClass("colorchange");
	$("#b_yurenqingchui").removeClass("colorchange");
	$("#b_huapingxiaoqi").removeClass("colorchange");
	$("#b_jigubanwu").removeClass("colorchange");
	$("#b_yanbalingting").removeClass("colorchange");
	$("#b_qiangeshui").removeClass("colorchange");
	$("#b_yinshou").removeClass("colorchange");

	var barposition = movebarmarginleft/ width;
	if(barposition<0.10){
		$("#b_tuowei").addClass("colorchange");
		$("#b_hougeshui").addClass("colorchange");
	}else if(0.22>barposition>0.10){
		$("#b_yelanyuxing").addClass("colorchange");
	}else if(0.36>barposition>0.22){
		$("#b_yurenqingchui").addClass("colorchange");
	}else if(0.48>barposition>0.36){
		$("#b_huapingxiaoqi").addClass("colorchange");
	}else if(0.62>barposition>0.48){
		$("#b_jigubanwu").addClass("colorchange");
	}else if(0.73>barposition>0.62){
		$("#b_yanbalingting").addClass("colorchange");
	}else if(0.84>barposition>0.73){
		$("#b_qiangeshui").addClass("colorchange");
	}else if(barposition>0.84){
		$("#b_yinshou").addClass("colorchange");
	}

	

	$("#hxznav").bind("mousedown" , function(e){
		//preventDefault(e);
		clearpoint();
		moveX =  e.offsetX || e.originalEvent.layerX;
		moveY =  e.offsetY || e.originalEvent.layerY;
		movebarmarginleft = moveX - movebarwidth/2;
		if(movebarmarginleft<0){
			movebarmarginleft = 0;
		}
		if(movebarmarginleft>movebarborder){
			movebarmarginleft = movebarborder;
		}

		/*var picposition =  Math.round(movebarmarginleft  * (window.borderx - pic_h*19.5*Math.pow(2,window.absoluteZ -1 )) / movebarborder);
		if(picposition<0){
			picposition = 0;
		}
		window.absoluteX = picposition + Math.round(pic_h*14*Math.pow(2,window.absoluteZ - 1)) + Math.round(pic_h*5.5*Math.pow(2,window.absoluteZ - 1))*/
		window.absoluteX = Math.round(movebarmarginleft*(window.borderx - pic_h*19.5*Math.pow(2,window.absoluteZ - 1)) /movebarborder) +Math.round(pic_h*14*Math.pow(2,window.absoluteZ - 1));	
		//change color 

	});

	$("#hxznav").bind("mouseup" , function(e){
		$("#movebar").css("left",movebarmarginleft+"px");
		
		//$("#b_tuowei").addClass("colorchange");
		$("#b_tuowei").removeClass("colorchange");
		$("#b_hougeshui").removeClass("colorchange");
		$("#b_yelanyuxing").removeClass("colorchange");
		$("#b_yurenqingchui").removeClass("colorchange");
		$("#b_huapingxiaoqi").removeClass("colorchange");
		$("#b_jigubanwu").removeClass("colorchange");
		$("#b_yanbalingting").removeClass("colorchange");
		$("#b_qiangeshui").removeClass("colorchange");
		$("#b_yinshou").removeClass("colorchange");

		var barposition = $("#movebar").offset().left/ width;
		if(barposition<0.10){
			$("#b_tuowei").addClass("colorchange");
			$("#b_hougeshui").addClass("colorchange");
		}else if(0.22>barposition>0.10){
			$("#b_yelanyuxing").addClass("colorchange");
		}else if(0.36>barposition>0.22){
			$("#b_yurenqingchui").addClass("colorchange");
		}else if(0.48>barposition>0.36){
			$("#b_huapingxiaoqi").addClass("colorchange");
		}else if(0.62>barposition>0.48){
			$("#b_jigubanwu").addClass("colorchange");
		}else if(0.73>barposition>0.62){
			$("#b_yanbalingting").addClass("colorchange");
		}else if(0.84>barposition>0.73){
			$("#b_qiangeshui").addClass("colorchange");
		}else if(barposition>0.84){
			$("#b_yinshou").addClass("colorchange");
		}
		showinfopoint();
		drawhxz();
	});
	$("#movebar").bind("mousedown" , function(e){
		e.preventDefault();
		moveLock = 1;
	});

	$("#hxznavctrl").bind("mousemove" , function(e){

		if (!moveLock) {
			return;
		}
		else {
			var newLeft;
			newLeft  = e.pageX - movebarwidth/2;
			if(newLeft <0){
				newLeft  = 0;
			}
			if(newLeft > movebarborder){
				newLeft  = movebarborder;
			}
			$("#movebar").css("left",newLeft + "px");
			//window.absoluteX = Math.round(newLeft*window.borderx/movebarborder);
			window.absoluteX = Math.round(newLeft*(window.borderx -pic_h*19.5*Math.pow(2,window.absoluteZ - 1))/movebarborder) + Math.round(pic_h*14*Math.pow(2,window.absoluteZ - 1) );
			//drawhxz();
		}
	});
	$("#movebar").bind("mousemove" , function(e){
		e.preventDefault();
	});
	$("#movebar").bind("mouseup" , function(e){
		moveLock = 0;
		$("#b_tuowei").removeClass("colorchange");
		$("#b_hougeshui").removeClass("colorchange");
		$("#b_yelanyuxing").removeClass("colorchange");
		$("#b_yurenqingchui").removeClass("colorchange");
		$("#b_huapingxiaoqi").removeClass("colorchange");
		$("#b_jigubanwu").removeClass("colorchange");
		$("#b_yanbalingting").removeClass("colorchange");
		$("#b_qiangeshui").removeClass("colorchange");
		$("#b_yinshou").removeClass("colorchange");

		var barposition = $("#movebar").offset().left/ width;
		if(barposition<0.10){
			$("#b_tuowei").addClass("colorchange");
			$("#b_hougeshui").addClass("colorchange");
		}else if(0.22>barposition>0.10){
			$("#b_yelanyuxing").addClass("colorchange");
		}else if(0.36>barposition>0.22){
			$("#b_yurenqingchui").addClass("colorchange");
		}else if(0.48>barposition>0.36){
			$("#b_huapingxiaoqi").addClass("colorchange");
		}else if(0.62>barposition>0.48){
			$("#b_jigubanwu").addClass("colorchange");
		}else if(0.73>barposition>0.62){
			$("#b_yanbalingting").addClass("colorchange");
		}else if(0.84>barposition>0.73){
			$("#b_qiangeshui").addClass("colorchange");
		}else if(barposition>0.84){
			$("#b_yinshou").addClass("colorchange");
		}
		//console.log(barposition)
		showinfopoint();
		drawhxz();
	});

}



function showinfopoint(){
	//console.log("showinfopoint");
	var canvas = document.getElementById("hxzcanvas");
	var context = canvas.getContext("2d");
	//当前浏览器的宽和高
	var width = canvas.width;
	var height = canvas.height;
	pic_h = Math.round( canvas.height / 2);
	//console.log("--abx--"+window.absoluteX);
	var startx = window.absoluteX;
	var starty = window.absoluteY;
	var endx =  (window.absoluteX  +width);
	var endy =  (window.absoluteY  +height);

	var arr = getPoints(startx,starty,endx,endy);

	if(window.fullscreen == 1){
		//全屏模式下关闭信息点
		arr = '';
	}

	var htmlstr = '';
	for(var i = 0;i < arr.length;i++){
		var ml = arr[i].x  - window.absoluteX;
		
		
		//console.log(arr[i].x);
		var mt = arr[i].y  - window.absoluteY;
		if(window.absoluteZ == 1){
			ml = arr[i].x  * pic_h / 256  - window.absoluteX ;
			mt = arr[i].y * pic_h / 256 - window.absoluteY; 
		}
		//console.log(mt);
		revise = 0;
		/*if(mt+202>height){
			infotitletype = "infotitle2";
			tagbkgtype = "tagbkg2";
			mt = mt - 202 ;
			//revise = 16;
		}else */
		if(mt+147>height){
			infotitletype = "infotitle2";
			tagbkgtype = "tagbkg2";
			/*if(window.absoluteZ == 1){
				mt = mt
			}else{
				mt = mt - 147 ;
			}*/
			//revise = 16;
		}else{
			infotitletype = "infotitle";
			tagbkgtype = "tagbkg";
		}
		/*if(arr[i].title.length >8){
			htmlstr += '<div id="' + arr[i].id +'" class="infopoint2" style="left:'+ml+'px; top:' + mt + 'px;">';
			htmlstr += '<p class="'+infotitletype+'" style="margin-top:'+((72-Math.ceil(arr[i].title.length/2)*16)/2+5 - revise )/16 + 'em;" >'+arr[i].title+'</p>';
			htmlstr += '<img src="./resource/img/tagbkg4.png" draggable="false" class="'+ tagbkgtype +'"/>';
		}*/
		//htmlstr += '<div id="' + arr[i].id +'" class="infopoint" style="left:'+ml+'px; top:' + mt + 'px;">';
		if(arr[i].title.length >=8){
			//mt = mt - 202 +147;
			htmlstr += '<div id="' + arr[i].id +'" class="infopoint2" style="left:'+ml+'px; top:' + mt + 'px;">';
			htmlstr += '<p class="'+infotitletype+'" style="margin-top:'+((96-Math.ceil(arr[i].title.length/2)*16)/2+5 - revise )/16 + 'em;" >'+arr[i].title+'</p>';
			htmlstr += '<img src="./resource/img/tagbkg4.png" draggable="false" class="'+ tagbkgtype +'"/>';
		}
		else if(arr[i].title.length >4){
			//$('.infopoint').css('width','46px');
			//$(".infotitle").css("height",99 - ((96-Math.ceil(arr[i].title.length/2)*15)/2+5 -revise ) +"px");
			//maxheight = 100 - ((96-Math.ceil(arr[i].title.length/2)*15)/2+5 -revise );
			//console.log(maxheight)
			htmlstr += '<div id="' + arr[i].id +'" class="infopoint2" style="left:'+ml+'px; top:' + mt + 'px;">';
			htmlstr += '<p class="'+infotitletype+'" style="margin-top:'+((72-Math.ceil(arr[i].title.length/2)*16)/2+5 - revise )/16 + 'em;" >'+arr[i].title+'</p>';
			htmlstr += '<img src="./resource/img/tagbkg3.png" draggable="false" class="'+ tagbkgtype +'"/>';
			/*htmlstr += '<div id="' + arr[i].id +'" class="infopoint2" style="left:'+ml+'px; top:' + mt + 'px;">';
			htmlstr += '<p class="'+infotitletype+'" style="margin-top:'+((96-Math.ceil(arr[i].title.length/2)*16)/2+5 - revise )/16 + 'em;margin-left:0.5em;" >'+arr[i].title+'</p>';
			htmlstr += '<img src="./resource/img/tagbkg3.png" class="'+ tagbkgtype +'"/>';*/
		}

		else if(arr[i].title.length > 2){
			//$('.infopoint').css('width','40px');
			//$(".infotitle").css("height",99-((112-arr[i].title.length*15)/2+5 -revise) +"px");
			
			htmlstr += '<div id="' + arr[i].id +'" class="infopoint" style="left:'+ml+'px; top:' + mt + 'px;">';
			htmlstr += '<p class="'+infotitletype+'" style="margin-top:'+((72-arr[i].title.length*16)/2+5 -revise)/16 + 'em;" >'+arr[i].title+'</p>';
			htmlstr += '<img src="./resource/img/tagbkg2.png" draggable="false" class="'+ tagbkgtype +'"/>';

		}else{
			//$('.infopoint').css('width','40px');
			htmlstr += '<div id="' + arr[i].id +'" class="infopoint" style="left:'+ml+'px; top:' + mt + 'px;">';
			htmlstr += '<p class="'+infotitletype+'" style="margin-top:'+ ((48-arr[i].title.length*16)/2+5 -revise)/16 + 'em;">'+arr[i].title+'</p>';
			htmlstr += '<img src="./resource/img/tagbkg.png" draggable="false" class="'+tagbkgtype+'"/>';
		}
		
		htmlstr += '</div>';
	}
	//console.log(htmlstr);
	document.getElementById("infopoint").innerHTML = htmlstr;
	//console.log(htmlstr);
}
function showinfodetails(){
	var id = this.attr("id");
	//alert(id);
}

function clearpoint(){
	document.getElementById("infopoint").innerHTML ="";
}

function drawhxz(){
	var canvas = document.getElementById("hxzcanvas");
	var context = canvas.getContext("2d");
	//当前浏览器的宽和高
	var width = canvas.width;
	var height = canvas.height;

	if(window.absoluteZ == 1){
		pic_h = Math.round( canvas.height / 2);
		//console.log("pic_h"+pic_h);
		window.borderx =Math.round(47*pic_h - width);
		window.bordery = 0;
		//console.log("-----------------------------------------------------ab = 0");
	}else{
		pic_h = 256;
		if(window.absoluteZ == 2){
			window.borderx = Math.round(23816 - width);//23729
			window.bordery = Math.round(1024 - height);
			//console.log("-----------------------------------------------------ab = 1");
			
		}else if(window.absoluteZ == 3){
			window.borderx = Math.round(47631 - width);//47714
			window.bordery = Math.round(2048 - height);
			//console.log("-----------------------------------------------------ab = 2");
		}else if(window.absoluteZ == 4){
			window.borderx = Math.round(95937 - width);//95681
			window.bordery = Math.round(4096 - height);
			//console.log("-----------------------------------------------------ab = 3");
		}
	}
	//console.log("--------------"+pic_h);
	//结束位置的坐标
	if(window.absoluteY < 0){
		window.absoluteY = 0;
	}else if(window.absoluteY > window.bordery){
		window.absoluteY = window.bordery;
	}
	if(window.absoluteX < 0){
		window.absoluteX = 0;
	}else if(window.absoluteX > window.borderx){
		window.absoluteX = window.borderx;
	}
	var endx = Math.round(window.absoluteX + width);
	var endy = Math.round(window.absoluteY + height);

	var starti = Math.floor(window.absoluteX / pic_h) ;
	var startj = Math.floor(window.absoluteY / pic_h) ;
	//console.log("starti "+starti+" startj "+startj);
	var endi =  Math.ceil(endx / pic_h) -1;
	//console.log(endi);
	var endj =  Math.ceil(endy / pic_h) -1;
	if(window.levelcontrolvar == 2){
		endj = 1;
	}

	//需要显示的区域的宽和高	
	for(var i=starti;i<=endi;i++){	
		for(var j=startj;j<=endj;j++){	
			var img = new Image();
			//与后台交互
			//console.log(i);
			(function (img,i,j){
				if(window.absoluteZ <=1){
					imglevel = 0;
				}else{
					imglevel = window.absoluteZ - 1;
				}
				img.src = './resource/img/hxz/img/'+(imglevel+14)+"/"+i+"_"+j+".jpg";
				if(img.complete){
				    var x = Math.round(i * pic_h - window.absoluteX);
				    var y = Math.round(j * pic_h - window.absoluteY);
					context.drawImage(img,x,y,pic_h,pic_h);
					//console.log("position x " + x + " y " + y +" i "+i+" j "+j);
					img.onload = null;
					
					}
				else{
					img.onload = function (){
						var x = Math.round(i * pic_h - window.absoluteX);
				   	 	var y = Math.round(j * pic_h - window.absoluteY);
						context.drawImage(img,x,y,pic_h,pic_h);
						//console.log("position x " + x + " y " + y +" i "+i+" j "+j);
						}
					}
				})(img, i,j);
			}
		}	
	}

function mousewheelinit(){
	if(window.videoplay == 0){
	$("body").bind("mousewheel",function(event){
		//清理第二层信息
        clearlv2info();
        $("#infopoint1").css("visibility","hidden");
		$("#infopoint2").css("visibility","hidden");
		$("#infopoint3").css("visibility","hidden");
		moveX =  event.offsetX || event.originalEvent.layerX;
		moveY =  event.offsetY || event.originalEvent.layerY;
		//=============
        var newTime = new Date();
        if (newTime - Time < 400) {
			Time = newTime;
			return false;
		}else{
			Time = newTime;
			if((event.deltaY==1)&&(window.levelcontrolvar<4)){ 
				clearpoint();
				window.levelcontrolvar++;
				change(event.deltaY);
				if(window.levelcontrolvar == 1){   
					window.absoluteZ = 0;
				}else if(window.levelcontrolvar == 2){
					//第一次进zoom
					window.absoluteZ = 1;
					$("#menu").css("visibility","hidden");
					if(window.fullscreen == 0){
						$("#hxznavctrl").css("visibility","visible");
					}
					showinfopoint();
					drawhxz();
					initmovebar();
					//mark 在这里进行信息点绘制
					//console.log("zoom in 0 to 1");
				}else if(window.levelcontrolvar == 3){
					window.absoluteZ = 2;
					var canvas = document.getElementById("hxzcanvas");
					var context = canvas.getContext("2d");
					var width = canvas.width;
					var pic_h = Math.round( canvas.height / 2);
					window.absoluteX = Math.round((window.absoluteX +  moveX ) * 23560 / (Math.round(Math.round((11652) * pic_h) / 256 )) - moveX);
					window.absoluteY = Math.round((window.absoluteY +  moveY ) * 1000 / (2* pic_h) - moveY);
					showinfopoint();
					drawhxz();
					initmovebar();
					//console.log("zoom in 1 to 2");
				}else if (window.levelcontrolvar == 4) {
					window.absoluteZ = 3;
					var canvas = document.getElementById("hxzcanvas");
					var context = canvas.getContext("2d");
					var width = canvas.width;
					var pic_h =  256;
					window.absoluteX = Math.round((window.absoluteX +  moveX ) * 47631 / (Math.round(Math.round((23560) * pic_h) / 256 ))  - moveX);
					window.absoluteY = Math.round((window.absoluteY +  moveY ) *  2000 / 1000 - moveY);
					showinfopoint();
					drawhxz();
					initmovebar();
					//console.log("zoom in 2 to 3");
				};
				}
			else if((event.deltaY==-1)&&(window.levelcontrolvar>0)){
				clearpoint();
				//alert("后退"); 
				if(window.fullscreen == 1){
			    	//全屏模式 
			    	levelborder = 2;
			    }else{
			    	levelborder = 0;
			    }
				if(window.levelcontrolvar - 1 >= levelborder){
					clearpoint();
					window.levelcontrolvar--;
					change(event.deltaY);
					//alert(window.levelcontrolvar);
					if(window.levelcontrolvar == 1){  
						$("#menu").css("visibility","visible"); 
						$("#hxznavctrl").css("visibility","hidden");
						window.absoluteZ = 0;
					}else if(window.levelcontrolvar == 2){
						window.absoluteZ = 1;
						var canvas = document.getElementById("hxzcanvas");
						var context = canvas.getContext("2d");	
						var width = canvas.width;
						var pic_h = Math.round( canvas.height / 2);
						window.absoluteX = Math.round((window.absoluteX + moveX)*(Math.round(Math.round((11652) * pic_h) / 256 )) /23560  - moveX);
						window.absoluteY = 0;
						//console.log("zoom out 2 to 1");
						showinfopoint();
						drawhxz();
						initmovebar();
					}else if(window.levelcontrolvar == 3){
						window.absoluteZ = 2;
						var canvas = document.getElementById("hxzcanvas");
						var context = canvas.getContext("2d");	
						var width = canvas.width;
						var pic_h = 256;
						window.absoluteX = Math.round((window.absoluteX + moveX)*(Math.round(Math.round((23560) * pic_h) / 256 )) /47631  - moveX);
						window.absoluteY =Math.round(window.absoluteY = (window.absoluteY + moveY)*(Math.round(Math.round((1000) * pic_h) / 256 )) / 2000  - moveY);
						//console.log("zoom out 3 to 2");
						showinfopoint();
						drawhxz();
						initmovebar();
					}else if (window.levelcontrolvar == 4) {
						window.absoluteZ = 3;
						var canvas = document.getElementById("hxzcanvas");
						var context = canvas.getContext("2d");	
						var width = canvas.width;
						var pic_h = 256;
						window.absoluteX = Math.round((window.absoluteX + moveX)*(Math.round(Math.round((47631) * pic_h) / 256 )) / 95680  - moveX);
						window.absoluteY = Math.round((window.absoluteY + moveY)*(Math.round(Math.round((2000) * pic_h) / 256 )) / 3981  - moveY);
						//console.log("zoom out 4 to 3");
						showinfopoint();
						drawhxz();
						initmovebar();
					}
				}
				
				
				}
			else{
				window.levelcontrolvar = window.levelcontrolvar;
				}
			}//console.log("window.levelcontrolvar"+window.levelcontrolvar);
		});
	}else{
		$("body").unbind("mousewheel");
	}
}


function change(e){
	if(e==1){
		if(window.levelcontrolvar == 1){

			// 1 to  2
			//目录换成视频
			$("#menu").attr("src","./resource/img/hxz/video.png");
			//3d变化
			$("#hxz").animate({width:"200%",left:"0", marginLeft:"-50%"});
			
			$("#hxz").css("-webkit-animation","animation1 0.5s");
			$("#hxz").css("-webkit-transform","rotateX(0deg)");

			$("#hxz").css("-ms-animation","animation1 0.5s");
			$("#hxz").css("-ms-transform","rotateX(0deg)");
			$("#shadow").animate({opacity:0});
			$("#shadow").css("opacity","0");


			$("#up_tag").css("visibility","hidden");
			$("#down_tag").css("visibility","hidden");
			$("#level2control").css("visibility","visible");
			$("#level2info").css("visibility","visible");

			$("#imgcontrol").delay(300).animate({opacity:0});
			$("#level2control").delay(300).animate({opacity:1});
			//$("#imgcontrol").delay(300).animate({visibility:hidden});
			//$("#imgcontrol").delay(1000).css("visibility","hidden");
			//
			var down_buttons = "";
			down_buttons +='<img id="down_button0"  onMouseOut="initbutton(down_button0)" onMouseOver="changebutton(down_button0)"  onClick="" src="./resource/img/hxz/button/down_button0.png">';
			//down_buttons +='<img id="down_button1"  onMouseOut="initbutton(down_button1)" onMouseOver="changebutton(down_button1)"  onClick="" src="./resource/img/hxz/button/down_button1.png">';
			//down_buttons +='<img id="down_button2"  onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)"  onClick="playinfovideo(2)" src="./resource/img/hxz/button/down_button2.png">';
			document.getElementById("down_buttons").innerHTML = down_buttons;

			$("#down_buttons").css("visibility","visible");
			//$("#down_info_buttons").css("visibility","visible");
			//alert(window.levelcontrolvar);
			window.levelcontrolvar =1;
			level2infoinit();

			}
		else if(window.levelcontrolvar == 2){
			//2层遮罩
			$("#canvas").css("opacity","0");
			$("#level2control").fadeOut();
			$("#level2control").css("visibility","hidden");
			$("#level2info").css("visibility","hidden");
			
			$("#down_buttons").css("visibility","hidden");
			$("#down_info_buttons").css("visibility","hidden");
			//3层打开遮罩
			$("#level2control").fadeIn();
			$("#canvas").css("visibility","visible");
			$("#hxzcanvas").css("visibility","visible");
			$("#canvas").delay(500).animate({opacity:1});

			$("#topbar").css("visibility","visible");
			$("#bottombar").css("visibility","visible");

			//关闭第一层的可视
			$("#imgcontrol").css("visibility","hidden");

			var canvas = document.getElementById("hxzcanvas");
			var context = canvas.getContext("2d");
			var pic_h = Math.round( canvas.height / 2);
			var width = canvas.width;
			if(window.absoluteZ ==0){
				if(window.nowpart == 1){		
					window.absoluteX = Math.round(Math.round((11652- width -1752) * pic_h) / 256 );
					}}
			if(window.absoluteZ ==0){
				if(window.nowpart == 2){
					window.absoluteX = Math.round(Math.round((11652- width -3288) * pic_h) / 256 );
					}}
			if(window.absoluteZ ==0){
				if(window.nowpart == 3){
					window.absoluteX = Math.round(Math.round((11652- width -4056) * pic_h) / 256 );
					}}
			if(window.absoluteZ ==0){
				if(window.nowpart == 4){
					window.absoluteX = Math.round(Math.round((11652- width -5336) * pic_h) / 256 );
					}}
			if(window.absoluteZ ==0){
				if(window.nowpart == 5){
					window.absoluteX = Math.round(Math.round((11652- width -6360) * pic_h) / 256 );
					
					}}		
			window.levelcontrolvar = 2;
			}
					
	}
	else if(e==-1){
		if(window.levelcontrolvar == 0){
				// 2 to 1
				$("#menu").attr("src","./resource/img/hxz/menu.png");
				$("#level2control").animate({opacity:0});
				$("#level2control").css("visibility","visible");
				$("#level2info").css("visibility","hidden");
				
				var width = 0 - $("body").width()*0.88/2;
				$("#imgcontrol").css("visibility","visible");	
				$("#imgcontrol").animate({opacity:1});
				$("#imgcontrol").css("opacity","1");

				$("#down_info_buttons").css("visibility","hidden");
				//onsole.log("call here" + width);
				$("#hxz").animate({width:"88%",left:"50%", marginLeft:width});
				
				//$("#hxz").animate({width:"88%",left:"50%", marginLeft:width});
				
				$("#hxz").css("-webkit-animation","animation2 0.5s");
				$("#hxz").css("-webkit-transform","rotateX(45deg)");

				$("#hxz").css("-ms-animation","animation2 0.5s");
				$("#hxz").css("-ms-transform","rotateX(45deg)");

				$("#shadow").animate({opacity:0.1});
				$("#shadow").css("opacity","0.1");
				$("#up_tag").css("visibility","visible");
				$("#down_tag").css("visibility","visible");	
				document.getElementById("down_buttons").innerHTML = '';
				window.levelcontrolvar = 0;
			}
		else if(window.levelcontrolvar == 1){
				//第三层遮罩
				$("#level2control").fadeOut();
				$("#canvas").css("visibility","hidden");
				$("#hxzcanvas").css("visibility","hidden");
				//$("#topbar").css("visibility","hidden");
				$("#bottombar").css("visibility","hidden");
				//打开第二层
				$("#level2control").fadeIn();
				$("#level2control").delay(500).css("visibility","visible");
				$("#level2info").delay(500).css("visibility","visible");
				$("#down_buttons").delay(500).css("visibility","visible");
				//$("#down_info_buttons").css("visibility","visible");

				//开启第一层的可视
				$("#imgcontrol").css("visibility","visible");
				window.levelcontrolvar =1;
			}
		}
		
	}

function guide(){
	//console.log(window.localStorage.xxxxx);
	/*if (!window.localStorage.xxxxx ){
		//console.log(window.autoshowhelp);
		window.autoshowhelp = 1;
		//console.log(window.autoshowhelp);
		window.localStorage.xxxxx = false;
	}*/
}
function bindmovebar(){
	$("#hxznavctrl").bind("mousemove");
}

function unbind(){
	moveLock = 0;
	initmovebar();
	showinfopoint();
	drawhxz();
	$("#movebar").css("left",movebarmarginleft+"px");
	$("#hxznavctrl").unbind("mousemove");
}

function unbindcanvas(){
	window.startX = 0;
	window.startY = 0;
	$('#hxzcanvas').unbind("mousemove");
}

function unbindleftcontent(){
	$("body").unbind("mousewheel");
}
function bindleftcontent(){
	$("body").bind("mousewheel");
}


function init(){
	guide();
	initcontent();
	mousewheelinit();
	//$('#logo').css("left",'2.5%');	
	//$('#logo').css("top",'2.1%');
	$('#hxzlogo').css("margin-left",'0');
	$('#hxzlogo').css("left",$("body").width()*0.975 - $("#right_buttons").width() -$("#hxzlogo").width() - 20 + 'px');
	//$('#hxzlogo').css("top",'2.1%');
	//$("#showcontroller").css("visibility","visible");
	//$("#index_video").css("z-index","0");

	//$("#imgcontrol").css("perspective","500");	
	//$("#imgcontrol").css("-webkit-perspective","500");
	//$("#imgcontrol").css("-ms-perspective","500");	
	//$("#imgcontrol").css("-moz-perspective","500");		
	//$("#hxz").css("-webkit-transform","rotateX(45deg)");
	//$("#hxz").css("-ms-transform","rotateX(45deg)");
	document.getElementById("indexaudio").play();

	if(window.autoshowhelp == 1){
		showhelp();
	}
	//logodante 
	$("#logo").bind('click',function(){
		window.location.href='http://minghuaji.dpm.org.cn';
	});


	$("#button3").hover(function(event){
		moveX =  event.offsetX || event.originalEvent.layerX;
		moveY =  event.offsetY || event.originalEvent.layerY;
		var rightmg = $('#right_buttons').width()/3;
		htmlstr = '<img  id="hlcpic" style="margin-right:'+rightmg+'px" class="zoomcontrol" draggable="false" src="./resource/img/zoom.png">';
		htmlstr+='<span id="movespan" style="left:'+28+'px" class="moveSpan"></span>';//30 - 64
		htmlstr+='<span id="zoomin"  class="zoomIn"></span>';
		htmlstr+='<span id="zoomout" class="zoomOut"></span>';
		document.getElementById("hlc").innerHTML = htmlstr;
		$("#movespan").css("left",(28+window.levelcontrolvar*9)+"px");
		$("#hlc").css("display","block");
		//////////////
		$("#hlc").hover(function(event){
			//preventDefault(event);
			},function(event){
			//preventDefault(event);
			$("#hlc").css("display","none");
		});
		/////////////
		$("body").unbind("mousewheel");
		$("#zoomin").click(function(event){
			moveX =  event.offsetX || event.originalEvent.layerX;
			moveY =  event.offsetY || event.originalEvent.layerY;
			//alert("zoomin"); 放大
			clearlv2info();
			clearpoint();
			if(window.levelcontrolvar<4){
				window.levelcontrolvar++;
				change(1);
				if(window.levelcontrolvar == 1){   
					window.absoluteZ = 0;
				}else if(window.levelcontrolvar == 2){
					//第一次进zoom
					window.absoluteZ = 1;
					$("#menu").css("visibility","hidden");
					$("#hxznavctrl").css("visibility","visible");
					showinfopoint();
					drawhxz();
					initmovebar();
				//mark 在这里进行信息点绘制
				//console.log("zoom in 0 to 1");
				}else if(window.levelcontrolvar == 3){
					window.absoluteZ = 2;
					var canvas = document.getElementById("hxzcanvas");
					var context = canvas.getContext("2d");
					var width = canvas.width;
					var pic_h = Math.round( canvas.height / 2);
					window.absoluteX = Math.round((window.absoluteX +  moveX ) * 23816 / (Math.round(Math.round((11652) * pic_h) / 256 )) - moveX);
					window.absoluteY = Math.round((window.absoluteY +  moveY ) * 1000 / (2* pic_h) -moveY);
					showinfopoint();
					drawhxz();
					initmovebar();
					//console.log("zoom in 1 to 2");
				}else if (window.levelcontrolvar == 4) {
					window.absoluteZ = 3;
					var canvas = document.getElementById("hxzcanvas");
					var context = canvas.getContext("2d");
					var width = canvas.width;
					var pic_h =  256;
					window.absoluteX = Math.round((window.absoluteX +  moveX ) * 47631 / (Math.round(Math.round((23816) * pic_h) / 256 )) - moveX);
					window.absoluteY = Math.round((window.absoluteY +  moveY ) *  2000 / 1000 - moveY);
					showinfopoint();
					drawhxz();
					initmovebar();
			};
			$("#movespan").css("left",(28+window.levelcontrolvar*9)+"px");
			}
		});

		$("#zoomout").click(function(event){
			//alert("zoomout"); //缩小
			moveX =  event.offsetX || event.originalEvent.layerX;
			moveY =  event.offsetY || event.originalEvent.layerY;
			clearlv2info();
			clearpoint();
			if(window.fullscreen == 1){
		    	//全屏模式 
		    	levelborder = 2;
		    }else{
		    	levelborder = 0;
		    }
			if(window.levelcontrolvar - 1 >= levelborder){
				window.levelcontrolvar--;
				change(-1);
				//alert(window.levelcontrolvar);
				if(window.levelcontrolvar == 1){  
					$("#menu").css("visibility","visible");
					$("#hxznavctrl").css("visibility","hidden"); 
					window.absoluteZ = 0;
				}else if(window.levelcontrolvar == 2){
					window.absoluteZ = 1;
					var canvas = document.getElementById("hxzcanvas");
					var context = canvas.getContext("2d");	
					var width = canvas.width;
					var pic_h = Math.round( canvas.height / 2);
					window.absoluteX = Math.round((window.absoluteX + moveX)*(Math.round(Math.round((11652) * pic_h) / 256 )) /23816  - moveX);
					window.absoluteY = 0;
					//console.log("zoom out 2 to 1");
					showinfopoint();
					drawhxz();
					initmovebar();
				}else if(window.levelcontrolvar == 3){
					window.absoluteZ = 2;
					var canvas = document.getElementById("hxzcanvas");
					var context = canvas.getContext("2d");	
					var width = canvas.width;
					var pic_h = 256;
					window.absoluteX = Math.round((window.absoluteX + moveX)*(Math.round(Math.round((23816) * pic_h) / 256 )) /47631  - moveX);
					window.absoluteY = Math.round((window.absoluteY + moveY)*(Math.round(Math.round((1000) * pic_h) / 256 )) / 2000  - moveY);
					//console.log("zoom out 3 to 2");
					showinfopoint();
					drawhxz();
					initmovebar();
				}else if (window.levelcontrolvar == 4) {
					window.absoluteZ = 3;
					var canvas = document.getElementById("hxzcanvas");
					var context = canvas.getContext("2d");	
					var width = canvas.width;
					var pic_h = 256;
					window.absoluteX = Math.round((window.absoluteX + moveX)*(Math.round(Math.round((47631) * pic_h) / 256 )) / 95680  - moveX);
					window.absoluteY = Math.round((window.absoluteY + moveY)*(Math.round(Math.round((2000) * pic_h) / 256 )) / 3981  - moveY);
					//console.log("zoom out 4 to 3");
					showinfopoint();
					drawhxz();
					initmovebar();
				}/*else if (window.levelcontrolvar == 5) {
					window.absoluteZ = 4;
					showinfopoint();
					drawhxz();
				}*/

			}
			$("#movespan").css("left",(28+window.levelcontrolvar*7)+"px");
		});
		

	},function(event){
		mousewheelinit();
	})
	//弹出分享
	$("#button5").hover(function(event){
		$("#share").css("visibility","visible");
		},function(event){
			//$("#share").css("visibility","hidden");

	});
	$("#share").hover(function(event){
		//$("#share").css("visibility","visible");
		},function(event){
			$("#share").css("visibility","hidden");

	});
	//信息点以及附属信息禁止缩放
	$("#infopoint").hover(function(event){
			//console.log("unbind")
			$("body").unbind("mousemove");
			$("body").unbind("mousewheel");
			},function(event){
				mousewheelinit();
				//console.log("bind");
				});
	$("#infopoint").mouseout(function (e){
		initinfocheck();
	}) ;

	$("#infopoint2").hover(function(event){
			//console.log("unbind")
			$("body").unbind("mousemove");
			$("body").unbind("mousewheel");
			},function(event){
				mousewheelinit();
				//console.log("bind");
				});
	$("#infopoint2").mouseout(function (e){
		initinfocheck();
	}) ;
	$("#infopoint").delegate(".infopoint","click",function(){
		//alert($(this).attr("id"));
		//console.log("start delegate function");
		var left = parseInt($(this).css("left").slice(0,-2));

		var top = parseInt($(this).css("top").slice(0,-2));
		//console.log(parseInt(left));
		//console.log($(this).attr("id"));
		var infodetails = getInfoDetails($(this).attr("id"));
		//console.log(infodetails);
		document.getElementById("infopoint").innerHTML = "";
		var htmlstr = '';
		var canvas = document.getElementById("hxzcanvas");
		var context = canvas.getContext("2d");	
		var width = canvas.width;
		var right = width -80 - left - 46;
		var height = canvas.height;
		if(right<469){
			//右边塞不下啊
			htmlstr +='<div id="showinfopointcontroller" ';
		}else{
			htmlstr +='<div id="showinfopointcontroller2" ';
		}
		/*if(left>width-469){
			//右边也塞不下了
			htmlstr +='></div>';
		}else{*/
		if(top+300>height){
			top = top - (top + 300 - height);
		}	
		var img = new Image();
		img.src = "./resource/img/bkgimage/"+infodetails.id+".png"
		
			if(img.complete){
				img.onload = null;	
				htmlstr +='style="top:'+top+'px; left:'+left+'px " ><img id="showinfopoint'+infodetails.id+'" class="infopointbkg"   /> ';
				htmlstr +='<img class="infopointbkgpic" draggable="false" src="./resource/img/bkgimage/'+infodetails.id+'.png"/>'
				htmlstr +='<div class="infowords">'+infodetails.details+'</div>'
				htmlstr +='</div>';	
				document.getElementById("infopoint").innerHTML = htmlstr;	
				}
			else{
				img.onload = function (){
					htmlstr +='style="top:'+top+'px; left:'+left+'px " ><img id="showinfopoint'+infodetails.id+'" class="infopointbkg"   /> ';
					htmlstr +='<img class="infopointbkgpic"  draggable="false" src="./resource/img/bkgimage/'+infodetails.id+'.png"/>'
					htmlstr +='<div class="infowords">'+infodetails.details+'</div>'
					htmlstr +='</div>';	
					document.getElementById("infopoint").innerHTML = htmlstr;
					}
			}

	});
	
	$("#infopoint").delegate(".infopoint2","click",function(){
		//alert($(this).attr("id"));
		//console.log("start delegate function");
		var left = parseInt($(this).css("left").slice(0,-2));
		var top = parseInt($(this).css("top").slice(0,-2));
		//console.log(parseInt(left));
		var infodetails = getInfoDetails($(this).attr("id"));
		//console.log(infodetails);
		document.getElementById("infopoint").innerHTML = "";
		var htmlstr = '';
		var canvas = document.getElementById("hxzcanvas");
		var context = canvas.getContext("2d");	
		var width = canvas.width;
		var right = width - 80 - left - 46;
		var height = canvas.height;
		if(right<469){
			//左边塞不下啊
			htmlstr +='<div id="showinfopointcontroller" ';
		}else{
			htmlstr +='<div id="showinfopointcontroller2" ';
		}
		/*if(left>width-469){
			//右边也塞不下了
			htmlstr +='></div>';
		}else{*/
		if(top+300>height){
			top = top - (top + 300 - height);
		}	
		
		var img = new Image();
		img.src = "./resource/img/bkgimage/"+infodetails.id+".png"
		
			if(img.complete){
				img.onload = null;	
				htmlstr +='style="top:'+top+'px; left:'+left+'px " ><img id="showinfopoint'+infodetails.id+'" class="infopointbkg"   /> ';
				htmlstr +='<img class="infopointbkgpic"  draggable="false" src="./resource/img/bkgimage/'+infodetails.id+'.png"/>'
				htmlstr +='<div class="infowords"><p>'+infodetails.details+'</p></div>'
				htmlstr +='</div>';	
				document.getElementById("infopoint").innerHTML = htmlstr;	
				}
			else{
				img.onload = function (){
					htmlstr +='style="top:'+top+'px; left:'+left+'px " ><img id="showinfopoint'+infodetails.id+'" class="infopointbkg"   /> ';
					htmlstr +='<img class="infopointbkgpic"  draggable="false" src="./resource/img/bkgimage/'+infodetails.id+'.png"/>'
					htmlstr +='<div class="infowords"><p>'+infodetails.details+'</p></div>'
					htmlstr +='</div>';	
					document.getElementById("infopoint").innerHTML = htmlstr;
					}
			}
		//console.log(htmlstr);
	});
	window.infovidetop = ($("#index_video").height() - $("#indexvideofile").height())/2;

	$("#indexvideofile").css("margin-top",($("#index_video").height() - $("#indexvideofile").height())/2);
	document.getElementById("backcolor").width = window.innerWidth;
	document.getElementById("backcolor").height = window.innerHeight;
	var width = 0 - $("#hxz").width()/2;
	//alert(width);
	$("#hxz").css("left","50%");
	$("#hxz").css("margin-left",width);	
	$("#shadow").css("width",$("#hxz").width()-20);
	$("#shadow").css("left",$("#hxz").width()/0.88*0.5 + 20);
	$("#shadow").css("margin-left",width);	
	$("#shadow").css("height",$("#hxz").height());	
	//调整目录位置
	$("#menu").css("margin-left",(0-$("#menu").width()/2));
	//调整拖尾位置
	$("#tuowei").css("margin-top",(0 - ($("#tuowei").height())*0.73 ));
	//调整后隔水位置
	$("#hougeshui").css("margin-top",(0 - ($("#hougeshui").height())*0.73 ));
	//调整送别位置
	$("#yelanyuxing").css("margin-top",(0 - ($("#yelanyuxing").height())*0.73 ));
	//调整轻吹位置
	$("#yurenqingchui").css("margin-top",(0 - ($("#yurenqingchui").height())*0.73 ));
	//调整暂歇位置
	$("#huapingxiaoqi").css("margin-top",(0 - ($("#huapingxiaoqi").height())*0.73 ));
	//调整观舞位置
	$("#jigubanwu").css("margin-top",(0 - ($("#jigubanwu").height())*0.73 ));
	//调整听乐位置
	$("#yanbalingyin").css("margin-top",(0 - ($("#yanbalingyin").height())*0.73 ));
	//调整前隔水位置
	$("#qiangeshui").css("margin-top",(0 - ($("#qiangeshui").height())*0.73 ));
	//调整引首位置
	$("#yinshou").css("margin-top",(0 - ($("#yinshou").height())*0.73 ));
	
	$("#down1").css("margin-top",(($("#down1").height())*0.20 ));
	$("#down2").css("margin-top",(($("#down1").height())*0.20 ));
	$("#down3").css("margin-top",(($("#down1").height())*0.20 ));
	$("#down4").css("margin-top",(($("#down1").height())*0.20 ));
	$("#down5").css("margin-top",(($("#down1").height())*0.20 ));
	$("#down6").css("margin-top",(($("#down1").height())*0.20 ));
	$("#down7").css("margin-top",(($("#down1").height())*0.20 ));
	$("#down8").css("margin-top",(($("#down1").height())*0.20 ));
	$("#down9").css("margin-top",(($("#down1").height())*0.20 ));
	$("#down10").css("margin-top",(($("#down1").height())*0.20 ));
	$("#down11").css("margin-top",(($("#down1").height())*0.20 ));
	/*/**/
	$("#num1").css("right",0);
	$("#num2").css("right",($("body").width()));
	$("#num3").css("right",($("body").width()*2));
	$("#num4").css("right",($("body").width()*3));
	$("#num5").css("right",($("body").width()*4));
	
	$("#num1").mousedown(function(e){
		level2infostatus = 1;
		infodescription();
		//alert(e.pageX);
		e.preventDefault();
		window.fromPageX = e.pageX;
		//alert(e.pageY);
		window.fromPageY = e.pageY;
		});
	$("#num1").mouseup(function(e){
		e.preventDefault();
		if((e.pageX > window.fromPageX)){
		     //alert("right");
			 window.fromPageX = 0;
			 window.fromPageX = 0;
			$("#num1").animate({right: 0-$("body").width()});
			$("#num2").animate({right:0});
			$("#num3").animate({right: $("body").width()});
			$("#num4").animate({right: $("body").width()*2});
			$("#num5").animate({right:$("body").width()*3});
			$("#num1").css("right",0-$("body").width());
			$("#num2").css("right",0);
			$("#num3").css("right",$("body").width());
			$("#num4").css("right",$("body").width()*2);
			$("#num5").css("right",$("body").width()*3);
			window.nowpart = 2;
			//changevedioinfopoint(2);
			}
		else if((e.pageX < window.fromPageX)){
			//alert("left");
			window.fromPageX = 0 ;
			window.fromPageX = 0;
			}	
		});
		
	$("#num2").mousedown(function(e){
		//alert(e.pageX);
		level2infostatus = 1;
		infodescription();
		e.preventDefault();
		window.fromPageX = e.pageX;
		//alert(e.pageY);
		window.fromPageY = e.pageY;
		});		
	$("#num2").mouseup(function(e){
		if((e.pageX > window.fromPageX)){
		   // alert("right");
			$("#num1").animate({right: 0 -$("body").width()*2});
			$("#num2").animate({right: 0 - $("body").width()});
			$("#num3").animate({right: 0 });
			$("#num4").animate({right: $("body").width()*1});
			$("#num5").animate({right:$("body").width()*2});
			$("#num1").css("right",0-$("body").width()*2);
			$("#num2").css("right",0 - $("body").width());
			$("#num3").css("right",0);
			$("#num4").css("right",$("body").width()*1);
			$("#num5").css("right",$("body").width()*2);
			 window.fromPageX = 0;
			 window.fromPageX = 0;
			 window.nowpart = 3;
			 //changevedioinfopoint(3);
			}
		else if(e.pageX < window.fromPageX){
			//alert("left");
			$("#num1").animate({right:0});
			$("#num2").animate({right: $("body").width()});
			$("#num3").animate({right: $("body").width()*2});
			$("#num4").animate({right: $("body").width()*3});
			$("#num5").animate({right: $("body").width()*4});

			$("#num1").css("right",0);
			$("#num2").css("right",$("body").width());
			$("#num3").css("right",$("body").width()*2);
			$("#num4").css("right",$("body").width()*3);
			$("#num5").css("right",$("body").width()*4);
			
			window.fromPageX = 0 ;
			window.fromPageX = 0;
			window.nowpart = 1;
			//changevedioinfopoint(1);
			}	
		});	
		
	$("#num3").mousedown(function(e){
		level2infostatus = 1;
		infodescription();
		//alert(e.pageX);
		e.preventDefault();
		window.fromPageX = e.pageX;
		//alert(e.pageY);
		window.fromPageY = e.pageY;
		});		
	$("#num3").mouseup(function(e){
		if((e.pageX > window.fromPageX)){
		    //alert("right");
			$("#num1").animate({right: 0 - $("body").width()*3});
			$("#num2").animate({right: 0 - $("body").width()*2});
			$("#num3").animate({right: 0 - $("body").width()});
			$("#num4").animate({right: 0 });
			$("#num5").animate({right: $("body").width()*1});
			
			$("#num1").css("right",0 - $("body").width()*3);
			$("#num2").css("right",0 - $("body").width()*2);
			$("#num3").css("right",0 - $("body").width());
			$("#num4").css("right",0);
			$("#num5").css("right",$("body").width()*1);
			
			 window.fromPageX = 0;
			 window.fromPageX = 0;
			 window.nowpart = 4;
			 //changevedioinfopoint(4);
			}
		else if(e.pageX < window.fromPageX){
			//alert("left");
			$("#num1").animate({right: 0 - $("body").width()*1});
			$("#num2").animate({right: 0});
			$("#num3").animate({right: $("body").width()});
			$("#num4").animate({right: $("body").width()*2});
			$("#num5").animate({right: $("body").width()*3});
			
			$("#num1").css("right",0 - $("body").width()*1);
			$("#num2").css("right",0);
			$("#num3").css("right",$("body").width());
			$("#num4").css("right",$("body").width()*2);
			$("#num5").css("right",$("body").width()*3);			
			
			window.fromPageX = 0;
			window.fromPageX = 0;
			window.nowpart = 2;
			//changevedioinfopoint(2);
			}	
		});				
		
	
	$("#num4").mousedown(function(e){
		//alert(e.pageX);
		level2infostatus = 1;
		infodescription();
		e.preventDefault();
		window.fromPageX = e.pageX;
		//alert(e.pageY);
		window.fromPageY = e.pageY;
		});		
	$("#num4").mouseup(function(e){
		if((e.pageX > window.fromPageX)){
		   // alert("right");
			$("#num1").animate({right: 0 -  $("body").width()*4});
			$("#num2").animate({right: 0 - $("body").width()*3});
			$("#num3").animate({right: 0 - $("body").width()*2});
			$("#num4").animate({right: 0 - $("body").width()});
			$("#num5").animate({right: 0 });
			
			$("#num1").css("right",$("body").width()*4);
			$("#num2").css("right",0 - $("body").width()*3);
			$("#num3").css("right",0 - $("body").width()*2);
			$("#num4").css("right",0 - $("body").width());
			$("#num5").css("right",0);
				
			 window.fromPageX = 0;
			 window.fromPageX = 0;
			 window.nowpart = 5;
			 //changevedioinfopoint(5);
			}
		else if(e.pageX < window.fromPageX){
			//alert("left");
			$("#num1").animate({right: 0 - $("body").width()*2});
			$("#num2").animate({right: 0 - $("body").width()*1});
			$("#num3").animate({right: 0});
			$("#num4").animate({right: $("body").width()});
			$("#num5").animate({right: $("body").width()*2});
			
			$("#num1").css("right",0 - $("body").width()*2);			
			$("#num2").css("right",0 - $("body").width()*1);
			$("#num3").css("right",0);
			$("#num4").css("right",$("body").width());
			$("#num5").css("right",$("body").width()*2);
					
			window.fromPageX = 0 ;
			window.fromPageX = 0;
			window.nowpart = 3;
			//changevedioinfopoint(3);
			}	
		});	
		
		
	$("#num5").mousedown(function(e){
		//alert(e.pageX);
		level2infostatus = 1;
		infodescription();
		e.preventDefault();
		window.fromPageX = e.pageX;
		//alert(e.pageY);
		window.fromPageY = e.pageY;
		});
	$("#num5").mouseup(function(e){
		if((e.pageX > window.fromPageX)){
		     //alert("right");
			 window.fromPageX = 0;
			 window.fromPageX = 0;
			}
		else if((e.pageX < window.fromPageX)){
			//alert("left");
			$("#num5").animate({right: $("body").width()});
			$("#num4").animate({right:0});
			$("#num3").animate({right: 0 - $("body").width()});
			$("#num2").animate({right: 0 - $("body").width()*2});
			$("#num1").animate({right: 0 -$("body").width()*3});
			$("#num5").css("right",$("body").width());
			$("#num4").css("right",0);
			$("#num3").css("right",0 - $("body").width());
			$("#num2").css("right",0 - $("body").width()*2);
			$("#num1").css("right",0 - $("body").width()*3);
			window.fromPageX = 0 ;
			window.fromPageX = 0;
			window.nowpart = 4;
			//changevedioinfopoint(4);
			}	

		});
	//$("#down_buttons").css("margin-left",0-$("#down_buttons").width()/2);
	$("#down_info_buttons").css("margin-left",0-$("#down_info_buttons").width()/4);
	
	//分层控制
	var canvas_h = Math.ceil(0.9317*$("body").height() - Math.round(121/1451*$("body").width()));
	//console.log(91.26*$("body").height() );
	//console.log(Math.ceil(121/1451*$("body").width()));
	$("#canvas").css("height",canvas_h);
	window.canvas_height = canvas_h;

	//设置canvas
	$("#hxzcanvas").attr("width",$("#canvas").width());
	$("#hxzcanvas").attr("height",$("#canvas").height());
    clickleftshowctrl();
    clickrightshowctrl();
    $("#leftcontent").css('height',$("#leftshow").height()*0.7936+'px');
	$("#rightcontent").css('height',$("#leftshow").height()*0.7936+'px');

	$("#rightshowcontent").css('height',$("#rightshow").height()*0.7936+'px');
	
	$(document).ready(function() {
		$('body').mouseup(function(e){
				/*$(".infopoint").css("-webkit-animation","animationinfo 2s");
				$(".infopoint2").css("-webkit-animation","animationinfo 2s");*/
				});
/*		var pointMiss = 0;
		$("body").bind("mousemove",function(e){
			$(".infopoint").css("opacity",1);
			$(".infopoint").stop();
			$(".infopoint2").css("opacity",1);
			$(".infopoint2").stop();
			clearTimeout(pointMiss);	

			// $(".tag-wrap").css("display","block");
			pointMiss = setTimeout(function(){
				$(".infopoint").animate({
					"opacity" : 0
				},1000);
				$(".infopoint2").animate({
					"opacity" : 0
				},1000);
			},500)

		});*/
	$("#hxzcanvas").bind("mousedown",function(e){
		//$('#hxzcanvas').unbind("mousemove");
			clearpoint();
			moveX =  e.offsetX || e.originalEvent.layerX;
			moveY =  e.offsetY || e.originalEvent.layerY;
			window.startX = moveX;
			window.startY =  moveY;
		$('#hxzcanvas').bind("mousemove",function(e){
			moveX =  e.offsetX || e.originalEvent.layerX;
			moveY =  e.offsetY || e.originalEvent.layerY;
			if(window.startX!=0||window.startY!=0){
				var tempx = window.absoluteX -(moveX - startX);
				if((tempx>-1)&&(tempx < window.borderx)){
					window.absoluteX -=(moveX - startX);
					//console.log(startX);
					var tempy =window.absoluteY -(moveY - startY);
					if((tempy>-1)&&(tempy<window.bordery)){
						window.absoluteY -=(moveY - startY);
						}
						drawhxz();
						initmovebar();
						window.startX = moveX;
						window.startY = moveY;
					}

				}

			});
		});
	/*	$("#hxzcanvas").mousedown(function(e){
		//$('#hxzcanvas').unbind("mousemove");
			
			clearpoint();
			window.startX = e.offsetX;
			window.startY = e.offsetY;
		//console.log("mouseevent is ok")
		$('#hxzcanvas').bind("mousemove",function(e){
			if(window.startX!=0||window.startY!=0){
				var tempx = window.absoluteX -(e.offsetX - startX);
				if((tempx>-1)&&(tempx<window.borderx)){
					window.absoluteX -=(e.offsetX - startX);
					var tempy =window.absoluteY -(e.offsetY - startY);
					if((tempy>-1)&&(tempy<window.bordery)){
						window.absoluteY -=(e.offsetY - startY);
						}
						drawhxz();
						initmovebar();
						window.startX = e.offsetX;
						window.startY = e.offsetY;
					}

				}

			});
		});*/
		$("#hxzcanvas").mouseup(function(e){
				window.startX = 0;
				window.startY = 0;
				showinfopoint();
				/*$(".infopoint").css("-webkit-animation","animationinfo 2s");
				$(".infopoint2").css("-webkit-animation","animationinfo 2s");
				$(".infopoint").css("-o-animation","animationinfo 2s");
				$(".infopoint2").css("-o-animation","animationinfo 2s");
				$(".infopoint").css("-ms-animation","animationinfo 2s");
				$(".infopoint2").css("-ms-animation","animationinfo 2s");*/
			});

	});
	initinfocheck();

	window.onresize = resizehxzcontrol;
	function resizehxzcontrol(){
		 location.reload();
	}
}

/*function closeindexvideo(){
	document.getElementById("index_video").innerHTML = '';
	mousewheelinit();
	$('#logo').css("left",'2.5%');	
	$('#logo').css("top",'2.1%');
	$('#hxzlogo').css("margin-left",'0');
	$('#hxzlogo').css("left",$("body").width()*0.975 - $("#right_buttons").width() -$("#hxzlogo").width() - 20 + 'px');
	$('#hxzlogo').css("top",'2.1%');
	$("#showcontroller").css("visibility","visible");
	$("#index_video").css("z-index","0");
	$("#imgcontrol").css("perspective","500");	
	$("#imgcontrol").css("-webkit-perspective","500");
	$("#imgcontrol").css("-ms-perspective","500");	
	$("#imgcontrol").css("-moz-perspective","500");		
	$("#hxz").css("-webkit-transform","rotateX(45deg)");
	$("#hxz").css("-ms-transform","rotateX(45deg)");
	document.getElementById("indexaudio").play();
	if(window.autoshowhelp == 1){
		showhelp();
	}
}*/
/*function playindexvideo(){
	window.videoplay = 1;
	document.getElementById("index_video").innerHTML = '<img id="indexcloseicon" src="./resource/img/close.png" onClick="closeindexvideo()"><video id="indexvideofile" poster="./resource/img/indexvideobkg.jpg" src="./resource/video/indexvideo.mp4" controls></video>';

	$("#index_video").css("z-index","30");
	mousewheelinit();
	$("#showcontroller").css("visibility","hidden");

}

function closeinfovideo(){
	window.videoplay = 0;
	document.getElementById("index_video").innerHTML = '';
	mousewheelinit();


	$("#showcontroller").css("visibility","visible");
	$("#index_video").css("z-index","0");
	$("#backcolor").css("z-index","0");
	document.getElementById("indexaudio").play();
	
}

function playinfovideo(videoname){
	clearlv2info();
	window.videoplay = 1;
	$("#backcolor").css("z-index","99");
	document.getElementById("index_video").innerHTML = '<img id="infocloseicon" src="./resource/img/close.png" onClick="closeinfovideo()"><video id="infovideofile" poster="" src="./resource/video/'+videoname+'.mp4" controls></video>';
	$("#index_video").css("z-index","100");
	mousewheelinit();
	$("#infovideofile").css("margin-top",window.infovidetop);
	document.getElementById("indexaudio").pause();
	$("#infocloseicon").css("margin-left",window.closeicon+"px");
}
*/
function changeaudionstatus(){
	if(document.getElementById("indexaudio").paused == true){
		window.status = 0;
		document.getElementById("indexaudio").play();
	}else if(document.getElementById("indexaudio").paused == false){
		window.status = 1;
		document.getElementById("indexaudio").pause();
		}
	}
function changeinfopoint(targetx,targety){
	var canvas = document.getElementById("hxzcanvas");
	var context = canvas.getContext("2d");	
	var width = canvas.width;
	var pic_h = Math.round( canvas.height / 2);		
	window.levelcontrolvar = 2;
	window.absoluteZ = 1;
	window.absoluteX = targetx * pic_h / 256;
	window.absoluteY = targety;
	$("#hxz").animate({width:"200%",left:"0", marginLeft:"-50%"});
	$("#up_tag").css("visibility","hidden");
	$("#down_tag").css("visibility","hidden");
	$("#imgcontrol").animate({opacity:0});
	$("#level2control").animate({opacity:1});
	$("#level2control").css("visibility","hidden");
	$("#level2info").css("visibility","hidden");
	$("#down_buttons").css("visibility","hidden");
	$("#down_info_buttons").css("visibility","hidden");
	$("#menu").css("visibility","hidden");
	$("#imgcontrol").css("visibility","hidden");
		//3层打开遮罩
	$("#canvas").css("visibility","visible");
	$("#hxzcanvas").css("visibility","visible");
	$("#hxznavctrl").css("visibility","visible");
	$("#topbar").css("visibility","visible");
	$("#bottombar").css("visibility","visible");
	//buttons=============
	var down_buttons ="";
	down_buttons +='<img id="down_button0" onMouseOut="initbutton(down_button0)" onMouseOver="changebutton(down_button0)" onClick="" src="./resource/img/hxz/button/down_button0.png">';
	//down_buttons +='<img id="down_button1" onMouseOut="initbutton(down_button1)" onMouseOver="changebutton(down_button1)" onClick="" src="./resource/img/hxz/button/down_button1.png">';
	/*if(window.nowpart == 1){
		down_buttons +='<img id="down_button2" onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)" onClick="playinfovideo(2)" src="./resource/img/hxz/button/down_button2.png">';
	}
	else if(window.nowpart == 2){
		down_buttons +='<img id="down_button2" onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)" onClick="playinfovideo(3)" src="./resource/img/hxz/button/down_button2.png">';
	}
	else if(window.nowpart == 3){
		down_buttons +='<img id="down_button2" onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)" onClick="playinfovideo(4)" src="./resource/img/hxz/button/down_button2.png">';
	}
	else if(window.nowpart == 4){
		down_buttons +='<img id="down_button2" onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)" onClick="playinfovideo(5)" src="./resource/img/hxz/button/down_button2.png">';
	}
	else if(window.nowpart == 5){
		down_buttons +='<img id="down_button2" onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)" onClick="playinfovideo(6)" src="./resource/img/hxz/button/down_button2.png">';
	}*/
	document.getElementById("down_buttons").innerHTML = down_buttons;
	drawhxz();
	showinfopoint();
	initmovebar();
}

function playvideo(videoname){
 	var height = canvas_height;
 	var width = height *480 /400 * 4 / 3;
 	if(document.getElementById("indexaudio").paused == false){
 		 	changeaudionstatus();
		}


	if(videoname == 'zhurengong'){
		//kaichang 
		file = '<embed src="http://player.youku.com/player.php/sid/XODkyMzgyNjUy/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
	}

	if(videoname == 'huaxiangheyi'){
		//huaxiangheyi
		file = '<embed src="http://player.youku.com/player.php/sid/XODY0MjQ1MDI0/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
	}

	if(videoname == 'yuejiqingchui'){
		file = '<embed src="http://player.youku.com/player.php/sid/XODY0MjEyNTQw/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
	}
	if(videoname == 'diancha'){
		file = '<embed src="http://player.youku.com/player.php/sid/XODY0MTI4Njc2/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
	}


	if(videoname == 'liuyao'){
		file = '<embed src="http://player.youku.com/player.php/sid/XODY0MDU5MDQ0/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'"align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
	}

	if(videoname == 'liji'){
		file = '<embed src="http://player.youku.com/player.php/sid/XODY0MDE3OTE2/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
	}
	if(videoname == 'duandai'){
		file = '<embed src="http://player.youku.com/player.php/sid/XODYzMjgzMDg0/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
	}

	if(videoname == 'huafa'){
			file ='<embed src="http://player.youku.com/player.php/sid/XODkyMzkzMTAw/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
		}

	if(videoname == 'beijing'){
			file = '<embed src="http://player.youku.com/player.php/sid/XODMyOTAyMDEy/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
		}

	if(videoname == 'jieju'){
			file = '<embed src="http://player.youku.com/player.php/sid/XODkyNDA4NDQ4/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
			
	}

	if(videoname == 'liuchuan'){

			file = '<embed src="http://player.youku.com/player.php/sid/XODkyNDE5Mjcy/v.swf" allowFullScreen="true" quality="high" width="'+width+'" height="'+height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
			

	}

	


	document.getElementById('videofile').innerHTML = file;
	$("body").unbind("mousewheel");
	$("#videoshow").css('display','block');
	$("#videoback").css('display','block');
	$("#closediv").css('display','block');
	$("#videofile").css('display','block');
}
function closevideo(){
	mousewheelinit();
	$("#videoshow").css('display','none');
	$("#videoback").css('display','none');
	$("#closediv").css('display','none');
	$("#videofile").css('display','none');
	changeaudionstatus();
}
/*function changevedioinfopoint(nowpartnum){
	window.nowpart = nowpartnum;
	var down_buttons = "canvas";
	down_buttons +='<img id="down_button0" onMouseOut="initbutton(down_button0)" onMouseOver="changebutton(down_button0)" onClick="" src="./resource/img/hxz/button/down_button0.png">';
	down_buttons +='<img id="down_button1" onMouseOut="initbutton(down_button1)" onMouseOver="changebutton(down_button1)" onClick="" src="./resource/img/hxz/button/down_button1.png">';
	if(window.nowpart == 1){
		//console.log("1");
		$("#num1").css("right",0);
		$("#num2").css("right",0 + $("body").width());
		$("#num3").css("right",0 + $("body").width()*2);
		$("#num4").css("right",0 + $("body").width()*3);
		$("#num5").css("right",0 + $("body").width()*4);
		down_buttons +='<img id="down_button2" onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)" onClick="playinfovideo(2)" src="./resource/img/hxz/button/down_button2.png">';

	}
	else if(window.nowpart == 2){
		//console.log("2");
		$("#num1").css("right",0 - $("body").width());
		$("#num2").css("right",0);
		$("#num3").css("right",0 + $("body").width());
		$("#num4").css("right",0 + $("body").width()*2);
		$("#num5").css("right",0 + $("body").width()*3);

		down_buttons +='<img id="down_button2" onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)" onClick="playinfovideo(3)" src="./resource/img/hxz/button/down_button2.png">';
		
	}
	else if(window.nowpart == 3){
		//console.log("3");
		$("#num1").css("right",0 - $("body").width()*2);			
		$("#num2").css("right",0 - $("body").width()*1);
		$("#num3").css("right",0);
		$("#num4").css("right",$("body").width());
		$("#num5").css("right",$("body").width()*2);
		down_buttons +='<img id="down_button2" onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)" onClick="playinfovideo(4)" src="./resource/img/hxz/button/down_button2.png">';
	}else if(window.nowpart ==4){
		//console.log("4");
		$("#num5").css("right",$("body").width());
		$("#num4").css("right",0);
		$("#num3").css("right",0 - $("body").width());
		$("#num2").css("right",0 - $("body").width()*2);
		$("#num1").css("right",0 - $("body").width()*3);

		down_buttons +='<img id="down_button2" onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)" onClick="playinfovideo(5)" src="./resource/img/hxz/button/down_button2.png">';
		
	}else if(window.nowpart ==5){
		//console.log("5");
		$("#num5").css("right",0);
		$("#num4").css("right",0 - $("body").width());
		$("#num3").css("right",0 - $("body").width()*2);
		$("#num2").css("right",0 - $("body").width()*3);
		$("#num1").css("right",0 - $("body").width()*4);
		down_buttons +='<img id="down_button2" onMouseOut="initbutton(down_button2)" onMouseOver="changebutton(down_button2)" onClick="playinfovideo(6)" src="./resource/img/hxz/button/down_button2.png">';
	}
	$("#menu").attr("src","./resource/img/hxz/video.png");	//3d变化
	$("#hxz").animate({width:"100%",left:"0", marginLeft:"0"});
	$("#hxz").css("-webkit-animation","animation1 0.5s");
	$("#hxz").css("-webkit-transform","rotateX(0deg)");	
	$("#up_tag").css("visibility","hidden");
	$("#down_tag").css("visibility","hidden");
	$("#level2control").css("visibility","visible");
	$("#level2info").css("visibility","visible");
	$("#imgcontrol").delay(300).animate({opacity:0});
	$("#level2control").delay(300).animate({opacity:1});
	$("#imgcontrol").delay(300).css("visibility","hidden");
	//
	document.getElementById("down_buttons").innerHTML = down_buttons;
	level2infoinit();
	window.levelcontrolvar =1;
}*/

function changetofullscreen(){
	//window.nowpart = 0;

	clearlv2info();
	clearpoint();
	window.backlevelcontroller = window.levelcontrolvar ;
	$('#imgcontrol').css("visibility",'hidden');
	$('#down_buttons').css("visibility",'hidden');
	$('#up_tag').css("visibility",'hidden');
	$('#down_tag').css("visibility",'hidden');
	$('#menu').css("visibility",'hidden');
	$('#logo').css("visibility",'hidden');
	$('#hxzlogo').css("visibility",'hidden');
	$('#right_buttons').css("visibility",'hidden');	
	$("#closefullscreen").css("visibility","visible");
	$("#canvas").css("top","0");
	$('#canvas').css("height",'100%');
	document.getElementById("canvas").height = document.getElementById('backcolor').height;
	document.getElementById("canvas").width = document.getElementById('backcolor').width;
	$("#hxzcanvas").attr("width",$("#canvas").width());
	$("#hxzcanvas").attr("height",$("#canvas").height()-45);
	$("#hxzcanvas").css("margin-top","45px");
	$('#hxzcanvas').css("visibility",'visible');
	$("#hxznavctrl").css("visibility","hidden");

	$("#leftshow").css("left","-100%");
	$("#rightshow").css("right","-100%");
	//$("#leftshowctrl").css("left","0");
	$("#rightshowctrl").css("right","0");
	window.rightstatus = 0;
	window.leftstatus = 0;

	$("#leftshowctrl").css("visibility","hidden");
	$("#rightshowctrl").css("visibility","hidden");

	//$("#topbar").css("visibility","hidden");
	$("#bottombar").css("visibility","hidden");
	var canvas = document.getElementById("hxzcanvas");
	var context = canvas.getContext("2d");
	if(window.levelcontrolvar < 2){
		window.absoluteZ = 1;
		window.levelcontrolvar = 2;
	}
	if(window.absoluteZ == 1){
		var pic_h_full = Math.round( canvas.height / 2);
		var pic_h = $("#backcolor").height()*0.75*0.5;
		window.absoluteX = Math.round( (window.absoluteX ) * (Math.round(11652 * pic_h_full) / 256 ) / (Math.round((11652) * pic_h) / 256 ) );
		window.absoluteY = Math.round((window.absoluteY  ) * pic_h_full /  pic_h);
	}else {
		var pic_h = 256;
	}	
    window.fullscreen = 1;
   // console.log(window.absoluteX);
	//console.log("zoom out 2 to 1");
	var width = canvas.width;
	if(window.nowpart == 1){	
		var pic_h_full = Math.round( canvas.height / 2);	
		window.absoluteX = Math.round(Math.round((11652- width -1752) * pic_h) / 256 )*pic_h_full/pic_h;
		}
	if(window.nowpart == 2){
		var pic_h_full = Math.round( canvas.height / 2);
		window.absoluteX = Math.round(Math.round((11652- width -3288) * pic_h) / 256 )*pic_h_full/pic_h;
		}

	if(window.nowpart == 3){
		var pic_h_full = Math.round( canvas.height / 2);
		window.absoluteX = Math.round(Math.round((11652- width -4056) * pic_h) / 256 )*pic_h_full/pic_h;
		}

	if(window.nowpart == 4){
		var pic_h_full = Math.round( canvas.height / 2);
		window.absoluteX = Math.round(Math.round((11652- width -5336) * pic_h) / 256 )*pic_h_full/pic_h;
		}

	if(window.nowpart == 5){
		var pic_h_full = Math.round( canvas.height / 2);
		window.absoluteX = Math.round(Math.round((11652- width -6360) * pic_h) / 256 )*pic_h_full/pic_h;
		}
	//console.log(window.absoluteX);
	drawhxz();

}

function closefullscreen(){
	//console.log(window.backlevelcontroller);
			//3层打开遮罩
	if(window.backlevelcontroller == 0){
		$('#logo').css("visibility",'visible');
		$('#hxzlogo').css("visibility",'visible');
		$('#menu').css("visibility",'visible');
		$('#right_buttons').css("visibility",'visible');
		$("#closefullscreen").css("visibility","hidden");
		$("#canvas").css("top","6.82%");
		$('#canvas').css("height",'75%');
		$('#canvas').css("visibility",'hidden');
		$("#hxzcanvas").attr("width",$("#canvas").width());
		$("#hxzcanvas").attr("height",$("#canvas").height());
		$("#canvas").css("visibility","hidden");
		$("#hxzcanvas").css("visibility","hidden");
		$("#hxznavctrl").css("visibility","hidden");

		$("#hxzcanvas").css("margin-top","0");
		$("#up_tag").css("visibility","visible");
		$("#down_tag").css("visibility","visible");
		$("#imgcontrol").css("visibility","visible");


		//window.absoluteX = Math.round(Math.round((11652- width -1752) * pic_h) / 256 );
		window.fullscreen = 0;
		window.levelcontrolvar = 0;
		window.absoluteZ = 0;
		
	}
	if(window.backlevelcontroller == 1){
		$('#logo').css("visibility",'visible');
		$('#hxzlogo').css("visibility",'visible');
		$('#right_buttons').css("visibility",'visible');

		$("#closefullscreen").css("visibility","hidden");
		$("#canvas").css("top","6.82%");
		$('#canvas').css("height",'75%');
		$('#canvas').css("visibility",'hidden');
		$("#hxzcanvas").attr("width",$("#canvas").width());
		$("#hxzcanvas").attr("height",$("#canvas").height());
		$("#canvas").css("visibility","hidden");
		$("#hxzcanvas").css("visibility","hidden");
		$("#hxznavctrl").css("visibility","hidden");
		$("#hxzcanvas").css("margin-top","0");
		$("#down_buttons").css("visibility","visible");
		$("level2control").css("visibility","visible");
		$("#level2info").css("visibility","visible");
		level2infostatus = 1;
		infodescription();

		//clearpoint();
		//window.absoluteX = Math.round(Math.round((11652- width -1752) * pic_h) / 256 );
		window.fullscreen = 0;
		window.levelcontrolvar = 1;
		window.absoluteZ = 0;
		
	}
	if(window.backlevelcontroller == 2){
		$('#logo').css("visibility",'visible');
		$('#hxzlogo').css("visibility",'visible');
		$('#right_buttons').css("visibility",'visible');
		$("#closefullscreen").css("visibility","hidden");
		$("#canvas").css("top","6.82%");
		$('#canvas').css("height",'75%');
		$('#canvas').css("visibility",'hidden');
		$("#hxzcanvas").attr("width",$("#canvas").width());
		$("#hxzcanvas").attr("height",$("#canvas").height());
		$("#canvas").css("visibility","visible");
		$("#hxzcanvas").css("visibility","visible");
		$("#hxznavctrl").css("visibility","visible");
		$("#hxzcanvas").css("margin-top","0");
		$("#leftshowctrl").css("visibility","visible");
		$("#rightshowctrl").css("visibility","visible");

		$("#topbar").css("visibility","visible");
		$("#bottombar").css("visibility","visible");
		$("#rightshow").css("visibility","visible");
		$("#leftshow").css("visibility","visible");
		var canvas = document.getElementById("hxzcanvas");
		var context = canvas.getContext("2d");
		var pic_h = Math.round( canvas.height / 2);
		var width = canvas.width;
		var pic_h_full = $('body').height()/2;
		window.absoluteX =  Math.round(window.absoluteX * pic_h / pic_h_full);
		window.absoluteY = 0;
		window.fullscreen = 0;
		drawhxz();
		showinfopoint();
	}

	if(window.backlevelcontroller >= 3){
		$('#logo').css("visibility",'visible');
		$('#hxzlogo').css("visibility",'visible');
		$('#right_buttons').css("visibility",'visible');
		$("#closefullscreen").css("visibility","hidden");
		$("#canvas").css("top","6.82%");
		$('#canvas').css("height",'75%');
		$('#canvas').css("visibility",'hidden');
		$("#hxzcanvas").attr("width",$("#canvas").width());
		$("#hxzcanvas").attr("height",$("#canvas").height());
		$("#canvas").css("visibility","visible");
		$("#hxzcanvas").css("visibility","visible");
		$("#hxznavctrl").css("visibility","visible");
		$("#hxzcanvas").css("margin-top","0");
		$("#leftshowctrl").css("visibility","visible");
		$("#rightshowctrl").css("visibility","visible");

		$("#topbar").css("visibility","visible");
		$("#bottombar").css("visibility","visible");

		var canvas = document.getElementById("hxzcanvas");
		var context = canvas.getContext("2d");
		var pic_h = 256;
		var width = canvas.width;
		var pic_h_full = $('body').height()/2;
		window.fullscreen = 0;
		drawhxz();
		showinfopoint();
	}
   }
