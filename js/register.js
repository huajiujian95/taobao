/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-26 19:58:19
 * @version $Id$
 */
//用户名验证
//手机号验证
var flag1=false;
var flag2=false;
var storage=new localStorageManager();
$(".mobile-validate").blur(function(){
	var reg=/1[3|4|5|8]\d{9}/g;
	var value=$(this).val();
	if(reg.test(value)){
		$(".username .validate-error").removeClass("active");
		$(this).css("border-color","#dedede");
		$(".username .validate-success").addClass("active");
		flag1=true;
    storage.setLoginName($(this).val());
		nextClick();
	}else{
		$(".username .validate-success").removeClass("active");
		$(this).css("border-color","#f40");
		$(".username .validate-error").addClass("active");
	}   
})
//用户名验证拖拽效果
var drag=document.querySelector(".drag");
var dragcon=document.querySelector(".drag-con");
var bg=document.querySelector(".bg");
var pleft=dragcon.offsetLeft;
var pwidth=parseInt(Animate.getStyle(dragcon,"width"));
var dragwidth=parseInt(Animate.getStyle(drag,"width"));
var maxwidth=pwidth-dragwidth;
var offsetx,offsety;
drag.onmousedown=function(ev){
   var e=window.event||ev;
    offsetx=e.offsetX;
    offsety=e.offsetY;
  
   document.onmousemove=function(ev){
       var e=window.event||ev;
       var clientx=e.clientX;
       var clientY=e.clientY;
       var x=clientx-offsetx;
       var x1=x-pleft;
      
      drag.style.left=x1+"px";
      bg.style.width=x1+"px";
      console.log(maxwidth);
      if(x1>=maxwidth){
      	drag.style.left=maxwidth+"px";
      	$("span.text").text("验证通过");
      	$("span.text").addClass("success");
      	$(".drag").text("");
      	$(".drag").append("<span class=\"validate-success\">√</span>");
      	document.onmousemove=null;
      	this.onmousedown=null;
      	flag2=true;
      	nextClick();
      }
      if(parseInt(drag.style.left)<0){
      	drag.style.left=0;
      	document.onmousemove=null;
      }  
   }
   document.onmouseup=function(){
   	document.onmousemove=null;
   	if(parseInt(drag.style.left)<maxwidth){
   	$(".drag").animate({left:"0px"},500);
      $(".validate-mobile .bg").animate({width:"0px"},500);
   }
   }
}

//下一步按钮可点击
function nextClick(){
if(flag1&&flag2){	
	$(".next input").css({"background-color":"#f40","color":"#fff","cursor":"pointer"});
	 $(".next input").attr("disabled",false);
   $(".next input").click(function(){
   $(".userinfo").addClass("active-c").siblings().removeClass("active-c");
   $(".content-c-h li").eq(1).addClass("active");
   $(".userinfo .loginname span").text(storage.getLoginName());
 });
 }
}
//填写账号信息
//登录密码确认
var flag3=false,flag4=false,flag5=false,flag6=false;
$(".userinfo .tpw").focus(function(){
  $(".setpassword-2 .pwdref").addClass("active-pwdref");
      $(".setpassword-2 .pwdref .pwdref-2").removeClass("active-ref")
      $(".setpassword-2 .pwdref .pwdref-3").removeClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-1").addClass("active-ref");
  $(this).keypress(function(e){ 
    var str=String.fromCharCode(e.which);
    var reg1=/[0-9]{1}/g;
    var reg2=/[a-zA-Z]{1}/g;
    var reg3=/[,|\.|\?|!|\(|\)|]/g;
     if(e.which>=33&&e.which<=126){
      $(".setpassword-2 .pwdref .pwdref-1").eq(1).removeClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-2").eq(1).removeClass("active-ref")
      $(".setpassword-2 .pwdref .pwdref-3").eq(1).addClass("active-ref");
      flag3=true;
     }else{
      $(".setpassword-2 .pwdref .pwdref-1").eq(1).removeClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-3").eq(1).removeClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-2").eq(1).addClass("active-ref")
    }
    var len=$(this).val().length+1;
    if(len>=6&&len<=20){
      $(".setpassword-2 .pwdref .pwdref-1").eq(0).removeClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-2").eq(0).removeClass("active-ref")
      $(".setpassword-2 .pwdref .pwdref-3").eq(0).addClass("active-ref");
      flag4=true;
    }else{
      $(".setpassword-2 .pwdref .pwdref-1").eq(0).removeClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-3").eq(0).removeClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-2").eq(0).addClass("active-ref");
    }
    $(this).keyup(function(){
    var str=$(this).val();
    var reg1=/[0-9]{1}/g;
    var reg2=/[a-zA-Z]{1}/g;
    var reg3=/[,|\.|\?|!|\(|\)]/g;
    console.log(str);
    if(reg1.test(str)&&reg2.test(str)){
      $(".setpassword-2 .pwdref .pwdref-1").eq(2).removeClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-2").eq(2).removeClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-3").eq(2).addClass("active-ref");
      flag5=true;
    }else{
      $(".setpassword-2 .pwdref .pwdref-1").eq(2).removeClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-2").eq(2).addClass("active-ref");
      $(".setpassword-2 .pwdref .pwdref-3").eq(2).removeClass("active-ref");
    }
    });
  });

})
var pwd;
$(".userinfo .tpw").blur(function(){
  $(".setpassword-2 .pwdref").removeClass("active-pwdref");
  pwd=$(this).val();
  console.log(pwd.length);
   if(flag3&&flag4&&flag5){
    $(".setpassword-2 .validate-success").addClass("active");
    $(".setpassword-2 .validate-error").removeClass("active");
     $(this).css("border-color","#dedede");
     flag6=true;
   }else{
    $(".setpassword-2 .validate-error").addClass("active");
    $(".setpassword-2 .validate-success").removeClass("active");
    $(this).css("border-color","#f40");
   }

})
//再次确认密码
var flag7=false;
$(".userinfo .retpw").focus(function(){
  $(".setpassword-3 .ref").addClass("active");
  $(".setpassword-3 .validate-success").removeClass("active");
  $(".setpassword-3 .validate-error").removeClass("active");
})
$(".userinfo .retpw").blur(function(){
  $(".setpassword-3 .ref").removeClass("active");

  if($(this).val()==pwd){
         $(".setpassword-3 .validate-success").addClass("active");
         $(".setpassword-3 .validate-error").removeClass("active");
         $(this).css("border-color","#dedede");
         flag7=true;
         storage.setPassWord($(this).val());
  }else{
      $(".setpassword-3 .validate-success").removeClass("active");
      $(".setpassword-3 .validate-error").addClass("active");
      $(this).css("border-color","#f40");
  }
})

//设置会员名
var charcount=0;
var flag8=false;
$(".userinfo .vname").focus(function(){
  $(".setvname .ref").addClass("active");
  $(".setvname .validate-success").removeClass("active");
  $(".setvname .validate-error").removeClass("active");
  $(".setvname .charcount").text(charcount+"字符");
  
})
$(".userinfo .vname").blur(function(){
  $(".setvname .charcount").text("");
  $(".setvname .ref").removeClass("active");
  var len=$(this).val().length;
  if(len>=5&&len<=25){
    $(".setvname .validate-success").addClass("active");
    $(".setvname .validate-error").removeClass("active");
    $(this).css("border-color","#dedede");
    flag8=true;
    storage.setVipName($(this).val());
  }else{
    $(".setvname .validate-success").removeClass("active");
    $(".setvname .validate-error").addClass("active");
    $(this).css("border-color","#f40");
  }
});
$(".userinfo .submit input").click(function(){
  if(flag6&&flag7&&flag8){
    $(".pay").addClass("active-c").siblings().removeClass("active-c");
    $(".content-c-h li").eq(2).addClass("active");
  }
});

//设置支付方式
var flag9=false,flag10=false,flaf11=false,flag12=false;
$(".pay .bankinput").blur(function(){
  var reg=/^62\d{9,17}$/g;
  var str=$(this).val();
  if(reg.test(str)){
    $(".bank .validate-error").removeClass("active");
    $(".bank .validate-success").addClass("active");
    flag9=true;
  }
  else{
    $(".bank .validate-error").addClass("active");
    $(".bank .validate-success").removeClass("active");
  }
})
$(".pay .banknameinput").blur(function(){
  var reg=/[\u3400-\u9FFF]{2,4}/g;
  var str=$(this).val();
  if(reg.test(str)){
        $(".bankusername .validate-error").removeClass("active");
    $(".bankusername .validate-success").addClass("active");
    flag10=true;
  }else{
    $(".bankusername .validate-error").addClass("active");
    $(".bankusername .validate-success").removeClass("active");
  }
})
$(".pay .cardinput").blur(function(){
  var reg=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/g;
  var str=$(this).val();
  if(reg.test(str)){
     $(".card .validate-error").removeClass("active");
    $(".card .validate-success").addClass("active");
    flag11=true;
  }else{
     $(".card .validate-error").addClass("active");
    $(".card .validate-success").removeClass("active");
  }
})
$(".pay .submit").click(function(){
  if(flag9&&flag10&&flag11){
    $(".regsuccess").addClass("active-c").siblings().removeClass("active-c");
    $(".content-c-h li").eq(3).addClass("active");
    $(".regsuccess .loginusername span").text(storage.getLoginName());
    $(".regsuccess .vipname span").text(storage.getVipName());
  }
});
$(".regsuccess .locatelogin input").click(function(){
  location.href="signIn.html";
})