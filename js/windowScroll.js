/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-25 10:46:36
 * @version $Id$
 */


	var nav=document.querySelector(".fixed-nav");
	var isClick=false;
    window.onscroll=function(){
    	//吸顶效果
	   if(document.body.scrollTop>100){
            nav.style.display="block";
	   }else{nav.style.display="none";}
       //右侧导航栏
	   if(document.body.scrollTop>400){
	   	$(".scroll-r").addClass("scroll-r-selected");
	   }else{$(".scroll-r").removeClass("scroll-r-selected");}
       //回到顶部按钮出现
       if(document.body.scrollTop>700){
       	$(".scroll-hidden").addClass("scroll-top");
       }else{
       	$(".scroll-hidden").removeClass("scroll-top");
       }
      //滚动时异步加载图片
       if(document.body.scrollTop>200){
           $.getJSON("index.json",function(data){

           })
       }

       if(!isClick){
       var scrolltop=$(window).scrollTop();
       $(".floorcon").each(function(){
       	if(scrolltop>=$(this).offset().top-49){
       		 $(".scroll-r .floor").eq($(this).index()).addClass("active").siblings().removeClass("active");
       	}
       });
   }
  }
    $(".floor").click(function(){
   	   isClick=true;
       $(this).addClass("active").siblings(".floor").removeClass("active");
       console.log($(this).index());
       console.log($(".floorcon"));
   	  var _top=$(".floorcon").eq($(this).index()).offset().top-49;
       $("html,body").stop().animate({scrollTop:_top},500,function(){
       	isClick=false;
       });
   	   // _top=String(_top);
   	   // Animate.move(document.body,{scrollTop:_top},17);
   	  
   })
    //不能通过动态添加的class选择元素
    //回到顶部
   $(".scroll-hidden").click(function(){
   	console.log("ok");
   	 var _top=$("body").offset().top;
   	 console.log(_top);
   	 //Animate.move(document.body,{scrollTop:"0"},17);
   	 $("html,body").stop().animate({scrollTop:0},500);
   })



   $(".fixed-nav-input ul").mouseenter(function(){
        $(this).addClass("ul-selected");
        var $li=$(this).children();
       
   });
    $(".fixed-nav-input ul").on("click","li",function(event){
        	console.log(this);
        	var text1=$("li.fixed-selected").text();
        	var text2=$(this).text();
           $(this).text(text1);
           $("li.fixed-selected").text(text2);
           if($("li.fixed-selected").text()=="天猫"){
               $("li.fixed-selected").parent().parent().addClass("Tmall-active");
           }else{$("li.fixed-selected").parent().parent().removeClass("Tmall-active");}

        });
   $(".fixed-nav-input ul").mouseleave(function(){
   	$(this).removeClass("ul-selected");
   });

   //tab切换菜单
   $(".nav-c-left ul li.nav-tab-li").mouseover(function(){
   	  $(".nav-tab").css("display","block");
   	  console.log($(this).parent().children().length);
   	  $(".nav-tab-c").eq($(this).index()).addClass("active").siblings().removeClass("active");
   })
   $(".nav-c-left ul li.nav-tab-li").mouseout(function(){
   	$(".nav-tab").css("display","none");
   });
    $(".nav-tab").mouseenter(function(){
   	  	 $(this).css("display","block");
   	  	 console.log($(this).css("display"));
   	  })
        $(".nav-tab").mouseleave(function(){
   	  	 $(this).css("display","none");
   	  	 console.log($(this).css("display"));
   	  })