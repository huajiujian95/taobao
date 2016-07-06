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
	   if(document.documentElement.scrollTop>100||document.body.scrollTop>400){
            nav.style.display="block";
	   }else{nav.style.display="none";}
       //右侧导航栏
	   if(document.documentElement.scrollTop>400||document.body.scrollTop>400){
	   	$(".scroll-r").addClass("scroll-r-selected");
	   }else{$(".scroll-r").removeClass("scroll-r-selected");}
       //回到顶部按钮出现
       if(document.documentElement.scrollTop>700||document.body.scrollTop>700){
       	$(".scroll-hidden").addClass("scroll-top");
       }else{
       	$(".scroll-hidden").removeClass("scroll-top");
       }
      //滚动时异步加载图片
        if($(window).scrollTop()>200){
          $.getJSON("index.json",function(data){
                var len=$(".nav-c-b img").length;
                var imglist=document.querySelectorAll(".nav-c-b img");
                
                for(var i=0;i<len;i++){
                     imglist[i].src=data.navcb[i];
                     
                     
                }
           })
        }
        if($(window).scrollTop()>300){
              $.getJSON("index.json",function(data){
               
                var imglist=document.querySelectorAll(".content-l-1 img");
                var len=imglist.length;
                var imglist1=document.querySelectorAll(".content-r-1 img");
                var len1=imglist1.length;
                var imglist2=document.querySelectorAll(".content-r-2 img");
                var len2=imglist2.length;
                for(var i=0;i<len;i++){
                     imglist[i].src=data.contentl1[i];                     
                     
                }
                for(var k=0;k<len1;k++){
                    imglist1[k].src=data.contentr1[k];
                }
                for(var j=0;j<len2;j++){
                  imglist2[j].src=data.contentr2[j];
                }
           })

        }

        if($(window).scrollTop()>400){
              $.getJSON("index.json",function(data){
                 var img=document.querySelector(".content-l-ad img");
                 img.src=data.contentlad[0];
                var imglist=document.querySelectorAll(".content-l-2 img"); 
                var len=imglist.length;         
                for(var i=0;i<len;i++){
                     imglist[i].src=data.contentl2[i];
                                       
                }
           })
        }
        if($(window).scrollTop()>500){
              $.getJSON("index.json",function(data){

                var imglist=document.querySelectorAll(".content-l-3 img"); 
                var len=imglist.length;
                var imglist1=document.querySelectorAll(".content-r-3 img");
                var len1=imglist1.length;         
                for(var i=0;i<len;i++){
                     imglist[i].src=data.contentl3[i];                            
                }
                for(var k=0;k<len1;k++){
                     imglist1[k].src=data.contentr3[k];
                }
           })

        }
          if($(window).scrollTop()>600){
              $.getJSON("index.json",function(data){

                var imglist=document.querySelectorAll(".content-l-4 img"); 
                var len=imglist.length;     
                for(var i=0;i<len;i++){
                     imglist[i].src=data.contentl4[i];                            
                }

           })

        }
          if($(window).scrollTop()>700){
              $.getJSON("index.json",function(data){
       
                var imglist=document.querySelectorAll(".content-l-5 img"); 
                var len=imglist.length;
                var img=document.querySelector(".content-r-4 img");
                 img.src=data.contentr4[0];    
                for(var i=0;i<len;i++){
                     imglist[i].src=data.contentl4[i];                            
                }

           })

        }
          if($(window).scrollTop()>800){
              $.getJSON("index.json",function(data){
       
                var imglist=document.querySelectorAll(".content-l-5 img"); 
                var len=imglist.length;
                var img=document.querySelector(".content-r-4 img");
                 img.src=data.contentr4[0];    
                for(var i=0;i<len;i++){
                     imglist[i].src=data.contentl4[i];                            
                }

           })

        }
          if($(window).scrollTop()>900){
              $.getJSON("index.json",function(data){
       
                var imglist=document.querySelectorAll(".content-cont-1 img"); 
                var len=imglist.length; 
                for(var i=0;i<len;i++){
                     imglist[i].src=data.contentcont1[i];                            
                }

           })

        }
          if($(window).scrollTop()>1000){
              $.getJSON("index.json",function(data){
       
                var imglist=document.querySelectorAll(".content-cont-2 img"); 
                var len=imglist.length; 
                for(var i=0;i<len;i++){
                     imglist[i].src=data.contentcont2[i];                            
                }

           })

        }
       if(!isClick){
       var scrolltop=$(window).scrollTop();
       $(".floorcon").each(function(){
       	if(scrolltop>=$(this).offset().top-49){
           //$(this).index()传入选择器，选择特定的元素
       		 $(".scroll-r .floor").eq($(this).index(".floorcon")).addClass("active").siblings().removeClass("active");
       	}
       });
   }
  }

    $(".floor").click(function(){
   	   isClick=true;
       $(this).addClass("active").siblings(".floor").removeClass("active");
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

  //登录后相关处理
  var storage=new localStorageManager();
  if(storage.getVipName()!=""){
      $(".login").text(storage.getVipName());
      $(".login").attr("href","javascript:void(0)");
      $(".register").text("消息");
      $(".register").attr("href","javascript:void(0)");
  }else{
      $(".login").text("亲，请登录");
      $(".login").attr("href","signin.html");
      $(".register").text("免费注册");
      $(".register").attr("href","register.html");
  }
  $(".loginswitch").mouseover(function(){
    if($(".login").text()!="亲，请登录"){
         $(".logined").css("display","block");
         $(".login").css("background-color","#fff");
    }
  });
    $(".loginswitch").mouseout(function(){
    if($(".login").text()!="亲，请登录"){
         $(".logined").css("display","none");
         $(".login").css("background-color","#f5f5f5");
    }
  });
    $(".cancellogin").click(function(){
        $(".login").text("亲，请登录");
        location.href="signin.html";
    })
