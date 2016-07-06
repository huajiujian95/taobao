/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-22 17:17:00
 * @version $Id$
 */
var Carousel=function(){
   this.index=0;
}
Carousel.prototype={
play:function(selector,btnwidth,stgspan){
            var container=document.querySelector(selector);
    		var prev=container.querySelector(".prev");
    		var next=container.querySelector(".next");
    		var ul=container.querySelector("ul");
            var imgnum=ul.children.length;
    		var imgwidth=parseInt(Animate.getStyle(container,"width"));
    		var cloneli=ul.children[0].cloneNode(true);
    		var span=container.querySelectorAll("span");
           
    		ul.appendChild(cloneli);
    		var timer;
            var autoplay=function(){
    	        clearInterval(timer);
    	        timer=setInterval(function(){
    			     next.onclick();},3000);
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
function CarouselV(){
   this.index=0;
}
CarouselV.prototype={
    play:function(selector){
          var container=document.querySelector(selector);
            var ul=container.querySelector("ul");
            var imgnum=ul.children.length;
            var imgwidth=parseInt(Animate.getStyle(container,"height"));
            var cloneli=ul.children[0].cloneNode(true);
           
            ul.appendChild(cloneli);
            var timer;
            var autoplay=function(){
                clearInterval(timer);
                timer=setInterval(function(){
                    move();},5000);
            }
            var count=0;
            var move=function(){
                count++;
                if(count==imgnum+1){
                    count=1;
                    ul.style.top="0px";
                }
                Animate.move(ul,{top:-1*count*imgwidth+"px"},17);
            }
            autoplay();
    }
}