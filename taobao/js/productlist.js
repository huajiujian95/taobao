/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-30 23:24:28
 * @version $Id$
 */
//分页实现异步加载
var procon1=document.querySelectorAll(".pro-container");
var len=procon1.length;  
var procon2=document.querySelectorAll(".pro-r-con");
var len1=procon2.length;
$.getJSON("productlist.json",function(data){
      for(var i=0;i<len;i++){
              var index=i+1;
              var s="g"+index;
          	  $(procon1[i]).find("img").attr("src",data.page1[s][0]);
              $(procon1[i]).find(".price").text(data.page1[s][1]);
              $(procon1[i]).find(".comment").text(data.page1[s][2]);
              $(procon1[i]).find(".describe a").text(data.page1[s][3]);
            
          }
     for(var j=0;j<len1;j++){
     	var index=21+j;
     	var s="g"+index;
     	 $(procon2[j]).find("img").attr("src",data.page1[s][0]);
          $(procon2[j]).find(".price").text(data.page1[s][1]);
          $(procon2[j]).find(".comment").text(data.page1[s][2]);
     }
})

var page=1;
$(".next").click(function(){
  if(page<5){
	page++;
	if(page>5){
		page=5;
	}
	$(".page-c em").text(page);
	 $.getJSON("productlist.json",function(data){

	 	var p="page"+page;
	 	console.log(p);
      for(var i=0;i<len;i++){
              var index=i+1;
              var s="g"+index;
              console.log(data[p]);
          	  $(procon1[i]).find("img").attr("src",data[p][s][0]);
              $(procon1[i]).find(".price").text(data[p][s][1]);
              $(procon1[i]).find(".comment").text(data[p][s][2]);
              $(procon1[i]).find(".describe a").text(data[p][s][3]);
            
          }
     for(var j=0;j<len1;j++){
     	var index=21+j;
     	var s="g"+index;
     	 $(procon2[j]).find("img").attr("src",data[p][s][0]);
          $(procon2[j]).find(".price").text(data[p][s][1]);
          $(procon2[j]).find(".comment").text(data[p][s][2]);
     }
  })
	}
});
$(".prev").click(function(){
  if(page>1){
	page--;
	if(page<2){
		page=1;
	}
	$(".page-c em").text(page);
	 $.getJSON("productlist.json",function(data){

	 	var p="page"+page;
	 	console.log(p);
      for(var i=0;i<len;i++){
              var index=i+1;
              var s="g"+index;
              console.log(data[p]);
          	  $(procon1[i]).find("img").attr("src",data[p][s][0]);
              $(procon1[i]).find(".price").text(data[p][s][1]);
              $(procon1[i]).find(".comment").text(data[p][s][2]);
              $(procon1[i]).find(".describe a").text(data[p][s][3]);
            
          }
     for(var j=0;j<len1;j++){
     	var index=21+j;
     	var s="g"+index;
     	 $(procon2[j]).find("img").attr("src",data[p][s][0]);
          $(procon2[j]).find(".price").text(data[p][s][1]);
          $(procon2[j]).find(".comment").text(data[p][s][2]);
     }
  })
	}
});
console.log($(".pro-container a"));
$(".pro-container a").click(function(){
  var $par=$(this).parents(".pro-container");
  var imgsrc=$par.find("img").attr("src");
  var text=$par.find(".describe a").text();
  var price=$par.find(".price").text();
  var value=imgsrc+"&"+text+"&"+price;
  Cookie.set("product","detail",value,new Date(2016,7,20,12,00,00));
})
$(".pro-r-con a").click(function(){
  var $par=$(this).parents(".pro-r-con");
  var imgsrc=$par.find("img").attr("src");
  var text=$par.find(".describe a").text();
  var price=$par.find(".price").text();
  var value=imgsrc+"&"+text+"&"+price;
  Cookie.set("product","detail",value,new Date(2016,7,20,12,00,00));
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