/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-27 23:07:18
 * @version $Id$
 */
var i=0;
//选择特定的商品
var cookie=Cookie.get("product","detail");
console.log(cookie);
var cookieary=cookie.split("&");
for(var k=0;k<cookieary.length;k++){
    $(".bigimg-i").last().attr("src",cookieary[0]);
    $(".describe").text(cookieary[1]);
    $(".imglist ul li").first().find("img").attr("src",cookieary[0]);
    $(".pricedetail").text(cookieary[2]);
}
console.log(Cookie.get("product","detail"));
console.log(decodeURIComponent(document.cookie));
$(".bigimg-i").last()
$(window).scroll(function(){
	if($(this).scrollTop()>$(".content-b-2").offset().top){
         $(".fixed").css("display","block");
		}else{
			$(".fixed").css("display","none");
		}
	})

    $(".catlog").mouseover(function(event) {
    	$(".productlist").css("display","block");
    });
    $(".catlog").mouseout(function(event){
    	$(".productlist").css("display","none");
    });
    $(".allproduct").mouseover(function(){
    	$(".allproduct ul").css("display","block");
    });
     $(".allproduct").mouseout(function(){
    	$(".allproduct ul").css("display","none");
    });

//放大镜
$(".imglist li").mouseover(function(){
    var index=$(this).index()+1;
    $(this).addClass("active").siblings().removeClass("active");
    $(".bigimg-i").eq(-1*index).siblings().fadeOut();
    $(".bigimg-i").eq(-1*index).fadeIn();
    var src=$(".bigimg-i").eq(-1*index).attr("src")
    $(".enlarge img").attr("src",src);
})
var imgshow=document.querySelector(".bigimg");
var mag=document.querySelector(".magnify");
var elarea=document.querySelector(".enlarge");
Enlarge.enlarge(imgshow,mag,elarea,2);

//加入购物车触发动作
     var count=1;
     var text=[];
     $(".pay li span").each(function(){
         var price=parseFloat($(this).text()).toFixed(2);
         text.push(price);
     });
     var pay=$(".pay li span");
     var cartpay=$(".cart-pay li span");
     var buypay=$(".buy-pay li span");
     $(".countinput").val("1");
    $(".add").click(function(){
    	count++;
    	
    	$(".countinput").val(count);
    	$.each(pay,function(i,item){ 
          $(item).text(parseFloat(text[i]*count).toFixed(2));
    	});
        $.each(cartpay,function(i,item){
            $(item).text(parseFloat(text[i]*count).toFixed(2));
        });
        $.each(buypay,function(i,item){
            $(item).text(parseFloat(text[i]*count).toFixed(2));
        });
    })
    $(".reduce").click(function(){
    	count--;
    	if(count<=1){
    		count=1;
    	}
    	$(".countinput").val(count);
        $.each(pay,function(i,item){
          $(item).text(parseFloat(text[i]*count).toFixed(2));
        });
        $.each(cartpay,function(i,item){
            $(item).text(parseFloat(text[i]*count).toFixed(2));
        });
        $.each(buypay,function(i,item){
            $(item).text(parseFloat(text[i]*count).toFixed(2));
        });
    })
var flag1=false,flag2=false,flag3=false;
//颜色选择
$(".color-select li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    flag1=true;
});
$(".cart-color-select li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
    flag2=true;
});
$(".buy-color-select li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
     flag3=true;

});

//分期付款选择
$(".pay li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
})
$(".buy-pay li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
})
$(".cart-pay li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");
})

//购物车选项确定框是否弹出
$(".button .cart").click(function(){
    if(!flag1){
        $(".prodetail .cart-select").css("display","block");
    }
    if(flag1){
        //在这里将数据写到Cookie里，并跳转到购物车页面
        setCookie("");
        alert("加入购物车成功");
        
       
    }
});
$(".cart-select .check").click(function(){
    if(flag2){
        setCookie("cart-");
        alert("加入购物车成功");
       
    }
});
$(".addCart").click(function(){
     $(".fixed .cart-select").css("display","block")
})

//购买选项确定框是否弹出
$(".button .buy").click(function(){

    if(!flag1){
        $(".buy-select").css("display","block");
    }
    if(flag1){     
        //在这里将数据写到cookie李，并跳转到结算页面
        setCookie("");
        location.href="pay.html";  
    }
});

$(".buy-select .check").click(function(){
    if(flag3){
        setCookie("buy-");
        location.href="pay.html";
    }
});



//购买弹出框点击关闭按钮，可关闭
$(".buy-select em").click(function(){
   $(".buy-select").css("display","none");
});

//购物车弹出框点击关闭按钮，可关闭
$(".cart-select em").click(function(){
   $(".cart-select").css("display","none");
});

 function setCookie(){
    i++;
    //参数类型为"","buy-","cart-"三种形式
    var str=arguments[0];
    var imgsrc=$(".bigimg-i").last().attr("src");
    console.log(imgsrc);
    var describe=$(".describe").text();
    var colortext=$("."+str+"color-select li.active img").attr("title");
    var index=$("."+str+"color-select li.active").index();
    var price;
    if(index==0){
        price="890.00";
    }else{price="990.00";}

    var $span=$("."+str+"pay li.active span");
    var bugetprice=$($span[0]).text()+$($span[1]).text();
    var count=$("."+str+"count-select .countinput").val();
    var value;
    if(bugetprice!=""){
        value=imgsrc+"&"+describe+"&"+price+"&"+colortext+"&"+count+"&"+bugetprice;
   }else{
        value=imgsrc+"&"+describe+"&"+price+"&"+colortext+"&"+count;
    }
    Cookie.set("product"+i,"detail",value,new Date(2016,7,30,12,00,00));
    console.log("设置cookie成功");
    console.log("设置的cookie是："+decodeURIComponent(document.cookie));
 }
 $(".over").mouseover(function(){
    $(this).children(".sidediv").addClass("active");
 })
 $(".over").mouseout(function(){
    $(".over").children(".sidediv").removeClass("active");
 })
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