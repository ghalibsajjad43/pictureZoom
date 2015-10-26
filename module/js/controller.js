window.levelcontrolvar = 0;
var Time = 0;
window.absoluteX = 0;
window.absoluteY = 0;
window.absoluteZ = 1;

function init(){
    var topbarH = $("#topbar").height();
    var canvas_H = $("body").height() - topbarH;
    $("#canvas").css({
        "height":canvas_H,
        "top":topbarH
    });
    $("#canvasContent").attr("width",$("#canvas").width());
    $("#canvasContent").attr("height",$("#canvas").height());

    window.onresize = resizehxzcontrol;
    function resizehxzcontrol(){
        location.reload();
    }
}

$("body").bind("mousewheel",function(event){
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
            drawhxz();
        }
    }
})

$("#canvasContent").bind("mousedown",function(e){
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
                var tempy =window.absoluteY -(moveY - startY);
                if((tempy>-1)&&(tempy<window.bordery)){
                    window.absoluteY -=(moveY - startY);
                }
                drawhxz();
                window.startX = moveX;
                window.startY = moveY;
            }
        }
    });
});

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