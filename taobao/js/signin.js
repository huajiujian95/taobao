/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-26 16:49:43
 * @version $Id$
 */

$(function(){
	$(".content-wrap .login-switch").click(function(){
		$(".content-wrap").removeClass("active");
		$(".content-con").addClass("active");
	});

	$(".content-con .login-switch").click(function(){
        $(".content-con").removeClass("active");
		$(".content-wrap").addClass("active");
	});
	$(".login-c").mouseenter(function(){
      $(".login-sm").stop().animate({left:"13px"},500,function(){
      	$(".login-help").css("display","block")
      });
	});
	$(".login-c").mouseleave(function(){
		$(".login-help").css("display","none");
		$(".login-sm").stop().animate({left:"80px"},500);
	})
  var flag1=false,flag2=false;
  var storage=new localStorageManager();
  
  $(".content-wrap .login-c .username").blur(function(){
     if($(this).val()==storage.getLoginName()){
        flag1=true;
        
     }
     if($(this).val()==storage.getVipName()){
      flag1=true;
    
     }
  })
  $(".content-wrap .login-c .password").blur(function(){
     if($(this).val()==storage.getPassWord()){
        flag2=true;
        
     }
  })
 
   $(".login").click(function(){
     if(flag1&&flag2){
      location.href="index.html";
     }
   })

})
