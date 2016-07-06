/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-29 09:17:58
 * @version $Id$
 */
//头部切换
$(".content-c-h li").mouseover(function(){
  $(this).addClass("active").siblings().removeClass("active");
})

//底部图片显示区域
var Carousel=function(){
   this.index=0;
}
Carousel.prototype={
    play:function(dom,btnwidth,stgspan){
        var container=dom;
        var prev=container.querySelector(".prev");
        var next=container.querySelector(".next");
        var ul=container.querySelector("ul");
            var imgnum=ul.children.length;
        var imgwidth=parseInt(Animate.getStyle(container,"width"));
        var cloneli=ul.children[0].cloneNode(true);
        var spancon=dom.querySelector(".dot");
        var span=spancon.querySelectorAll("span");
           
        ul.appendChild(cloneli);
        var timer;
            var autoplay=function(){
              clearInterval(timer);
              timer=setInterval(function(){
               next.onclick();},10000);
                for(var i=0;i<imgnum;i++){
                    if(span[i].className=="carousel-on"){
                        this.index=i;
                    }

                  if(stgspan!=null){stgspan.innerHTML=this.index+1;}
                  
                }
        
            }
        container.onmouseover=function(){
                Animate.move(prev,{left:"0px"},17);
                Animate.move(next,{right:"0px"},17);
                console.log(prev.style.left);
        }
        container.onmouseout=function(){
                Animate.move(prev,{left:-1*btnwidth+"px"},17);
                Animate.move(next,{right:-1*btnwidth+"px"},17);
        }
        var count=0;
        next.onclick=function(){
                count++;
                if(count==imgnum+1){
                  count=1;
                  ul.style.left="0px";
                }
                Animate.move(ul,{left:-1*count*imgwidth+"px"},17);
                for(var i=0;i<span.length;i++){
                  span[i].className="";
                }
                if(count>imgnum-1){
                  span[0].className="carousel-on";
                }else{
                span[count].className="carousel-on";}
              for(var i=0;i<imgnum;i++){
                    if(span[i].className=="carousel-on"){
                        this.index=i;
                    }
                 if(stgspan!=null){stgspan.innerHTML=this.index+1;}
                }
        }
        prev.onclick=function(){
                count--;
                if(count==-1){
                  count=imgnum-1;
                  ul.style.left=-1*(count+1)*imgwidth+"px";
                }
                Animate.move(ul,{left:-1*count*imgwidth+"px"},17);
                 for(var i=0;i<span.length;i++){
                  span[i].className="";
                }
                if(count<0){
                  span[imgnum-1].className="carousel-on";
                }else{
                span[count].className="carousel-on";}
             for(var i=0;i<imgnum;i++){
                    if(span[i].className=="carousel-on"){
                        this.index=i;
                    }
                  if(stgspan!=null){stgspan.innerHTML=this.index+1;}
                }
        }
        for(var i=0;i<span.length;i++){
          span[i].index=i;
          span[i].onclick=function(){
            for(var k=0;k<span.length;k++){
              span[k].className="";
            }
                     this.className="carousel-on";
                     count=this.index;
                     autoplay();
                     Animate.move(ul,{left:-1*this.index*imgwidth+"px"},17);
          }
        }
        autoplay();
        }
}

//底部轮播
var dom1=document.querySelector(".recommend-c-1");
var carousel1=new Carousel();
carousel1.play(dom1,24);
var dom2=document.querySelector(".recommend-c-2");
var carousel2=new Carousel();
carousel2.play(dom2,24);
var dom3=document.querySelector(".recommend-c-3");
var carousel3=new Carousel();
carousel1.play(dom3,24);
$(".recommend-h ul li").mouseover(function(){
  console.log("ok");
	$(this).addClass("active").siblings().removeClass("active");
	$(".carousel").eq($(this).index()).addClass("active").siblings().removeClass("active");
});
//头部商品数量显示

//商品添加至购物车
var lcookie=document.cookie.split(";");
console.log(lcookie);
var clen=lcookie.length=0?1:lcookie.length;
console.log(clen);
for(var i=0;i<clen-1;i++){
    var index=i+1;
    var str="<div class=\"product product"+index+"\"><label><input type=\"checkbox\"/></label><div class=\"pro-con\"><div class=\"product-img\"><a href=\"product.html\"><img src=\"\"/></a></div><div class=\"describe\"><a href=\"product.html\"></a><span class=\"budget\">分期购</span></div></div><div class=\"product-catlog\"><div><span>颜色分类:</span><span>黑色表身x驼色表带</span></div></div><div class=\"price\">990.00</div><div class=\"count\"><a class=\"reduce\" href=\"javascript:void(0)\">-</a><input class=\"countinput\" type=\"text\" value=\" \" /><a class=\"add\" href=\"javascript:void(0)\">+</a></div><div class=\"sub\"><span>990.00</span></div><div class=\"operate\"><a href=\"javascript:void(0)\">移入收藏夹</a><a class=\"deleteEle\" href=\"javascript:void(0)\">删除</a><a class=\"similar\" href=\"javascript:void(0)\">相似宝贝</a></div></div>";
    $(str).appendTo(".content-con");
    //删除某条记录;
    $(".deleteEle").click(function(){
    	console.log("ok");
    	var pnode=$(this).parent().parent();
    	console.log(pnode[0]);
      for(var k=0;k<clen-1;k++){
        var index1=k+1;
        if(pnode.hasClass("product"+index1)){
             Cookie.unsetAll("product"+index1);
        }
      }
    	pnode.remove();
        var procheck1=document.querySelectorAll(".product label input");
      $(".content-c-h ul li.allcount").find("span").text(procheck1.length);
    })
    //获取cookie中的数据，并设置数据到dom节点中
    var cookie=Cookie.get("product"+index,"detail");
    console.log(cookie);
    if(cookie!=null){
        var cookieary=cookie.split("&");
        var imgsrc=cookieary[0];
        var describe=cookieary[1];
        var price=cookieary[2];
        var catalogtext=cookieary[3];
        var count=cookieary[4];
        var priceall=String((parseFloat(price)*count).toFixed(2));
        $(".product"+index+" .product-img img").attr("src",imgsrc);
        $(".product"+index+" .describe a").text(describe);
        $($(".product"+index+" .product-catlog span")[1]).text(catalogtext);
        $(".product"+index+" .price").text(price);
        $(".product"+index+" .count .countinput").val(count);
        $(".product"+index+" .sub span").text(priceall);
      }else{
        $(".product"+index).remove();
        console.log(decodeURIComponent(document.cookie))
      }

}

//商品记录选择按钮
 var procheck=document.querySelectorAll(".product label input");
var subs=document.querySelectorAll(".sub span");
//头部显示当前商品数量
  $(".content-c-h ul li.allcount").find("span").text(procheck.length);
$(".product label input").click(function(){
      $(this).parent().parent().toggleClass("bgcolor");
});

//全选商品的情况
$(".content-list input").click(function(){
  if(this.checked==true){
    for(var k=0;k<procheck.length;k++){  
          procheck[k].checked=true;
     }
    $(".content-b .checkall")[0].checked=true;
    var suball=0.0;
    for(var j=0;j<procheck.length;j++){
       var sub=parseFloat($(subs[j]).text());
       suball+=sub;
    }
    $(".selproduct em").text("￥"+suball.toFixed(2));
    $(".selproduct input").addClass("active");
    $(".checkbtn input").addClass("active");
    $(".dollarsub").text(suball.toFixed(2));
    $(".checkcount").text($(".product").length);
    $(".product").addClass("bgcolor");
  }else{
    for(var k=0;k<procheck.length;k++){  
          procheck[k].checked=false;
     }
    $(".content-b .checkall")[0].checked=false;
    $(".selproduct em").text("￥0.00");
    $(".selproduct input").removeClass("active");
    $(".checkbtn input").removeClass("active");
    $(".dollarsub").text("0.00");
     $(".checkcount").text("0");
    $(".product").removeClass("bgcolor");
  }
})

$(".content-b .checkall").click(function(){
  if(this.checked==true){
    console.log(typeof this.checked);
       for(var k=0;k<procheck.length;k++){  
          procheck[k].checked=true;
     }
    var suball=0.0;
    for(var j=0;j<procheck.length;j++){
       var sub=parseFloat($(subs[j]).text());
       suball+=sub;
    }
    $(".content-list input")[0].checked=true;
    $(".selproduct em").text("￥"+suball.toFixed(2));
    $(".selproduct input").addClass("active");
    $(".checkbtn input").addClass("active");
    $(".dollarsub").text(suball.toFixed(2));
    $(".checkcount").text($(".product").length);
    $(".product").addClass("bgcolor");
  }else{
       for(var k=0;k<procheck.length;k++){  
          procheck[k].checked=false;
     }
    $(".content-list input")[0].checked=false;
    $(".selproduct em").text("￥0.00");
    $(".selproduct input").removeClass("active");
    $(".checkbtn input").removeClass("active");
    $(".dollarsub").text("0.00");
     $(".checkcount").text("0");
    $(".product").removeClass("bgcolor");
  }
})
//全选删除

//数量调节
//增加按钮
var ecount,eprice;
$(".count .add").click(function(){   
     ecount=parseInt($(this).prev().val());
     ecount++;
     eprice=parseFloat($(this).parent().prev().text())*ecount;
     eprice=String(eprice.toFixed(2));
     $(this).prev().val(ecount);
     $(this).parent().next().find("span").text(eprice);
});
//减少按钮
$(".count .reduce").click(function(){
     ecount=parseInt($(this).next().val());
     ecount--; 
    if(ecount<=1){
     ecount=1;
    }
    eprice=parseFloat($(this).parent().prev().text())*ecount;
    eprice=String(eprice.toFixed(2));
    $(this).next().val(ecount);
    $(this).parent().next().find("span").text(eprice);
  
});
//单独选择商品的情况
   var addall=0;
   var flag=false;
   var count=0;
   $(".product label input").click(function(){
     var $s=$(this).parents(".product").find(".sub");
     var add=parseFloat($s.text());
     if(this.checked==true){
     addall+=add;
     count++;
     }else{
      addall-=add;
      count--;
     }
     console.log(typeof addall);
     $(".checkcount").text(count);
     $(".selproduct input").addClass("active");
     $(".checkbtn input").addClass("active");
     $(".selproduct em").text("￥"+addall.toFixed(2));
     $(".dollarsub").text(addall.toFixed(2));
     $(".product label input").each(function(i,item){
        flag=flag||item.checked;
        console.log(flag);
     });
     if(addall==0){
       $(".selproduct input").removeClass("active");
       $(".checkbtn input").removeClass("active");
     }
   })

//跳转到结算界面
$(".selproduct input").click(function(){
  if($(this).hasClass("active")){
    //跳转到结算页面
    console.log("ok");
  }else{
    console.log("no");
  }
});
 $(".checkbtn input").click(function(){
  if($(this).hasClass(active)){
    //跳转到结算页面
    
  }
 })
 //登录操作
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