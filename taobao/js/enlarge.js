/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-20 12:00:04
 * @version $Id$
 */
var Enlarge={
	//dom元素position设置为relative
	enlarge:function(dom,mag,elarea,scale){
		elarea.children[0].style.width=scale*dom.offsetWidth+"px";
		elarea.children[0].style.height=scale*dom.offsetHeight+"px";
		dom.onmouseover=function(){
          mag.style.display="block";
          elarea.style.display="block";}
        dom.onmousemove=function(event){
         var e=event||window.event;
         mag.style.left=e.pageX-dom.offsetLeft-mag.offsetWidth/2+"px";
         mag.style.top=e.pageY-dom.offsetTop-mag.offsetHeight/2+"px";
         if(mag.offsetLeft<=0){
            mag.style.left=0+"px";	
         }
         if(mag.offsetTop<=0){
         	mag.style.top=0+"px";
         }
         if(mag.offsetLeft>=this.offsetWidth-mag.offsetWidth){
         	mag.style.left=this.offsetWidth-mag.offsetWidth+"px";
         }
         if(mag.offsetTop>=this.offsetHeight-mag.offsetHeight){
         	mag.style.top=this.offsetHeight-mag.offsetHeight+"px";
         }
         elarea.children[0].style.top=-scale*mag.offsetTop+"px";
         elarea.children[0].style.left=-scale*mag.offsetLeft+"px";
		}
		dom.onmouseout=function(){
			mag.style.display="none";
			elarea.style.display="none";
		}
	}
}

