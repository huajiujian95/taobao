/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-20 14:21:51
 * @version $Id$
 */
var Animate={
getStyle:function(dom,attrName){
  if(dom.currentStyle){
    return dom.currentStyle[attrName];
  }
  else{
    return document.defaultView.getComputedStyle(dom,null)[attrName];
  }
},
getAllStyle:function(dom){
  if(dom.currentStyle){
    return dom.currentStyle;
  }
  else{
    return document.defaultView.getComputedStyle(dom,null);
  }
},
setStyle:function(dom,attrName,attrvalue){
   dom.style[attrName]=attrvalue;
},
move:function(dom,props,duration,callback){
    clearInterval(dom.timer);
    var that=this;
    dom.timer=setInterval(function(){
       var count=0;
       var propsLength=0;
      for(var attrName in props){
        var str=props[attrName].slice(-2);  
        if(str=="px"){
             var attr=parseInt(that.getStyle(dom,attrName));
             var step=(parseInt(props[attrName])-attr)/5;
             step=step>0?Math.ceil(step):Math.floor(step);
             dom.style[attrName]=attr+step+"px";
             var finalvalue=that.getStyle(dom,attrName);
             var animationvalue=parseInt(props[attrName])+"px";
             if(finalvalue==animationvalue){
                count++;
             }
               propsLength++;

        }
        else{ 
          var attr=dom[attrName];
          var step=(parseInt(props[attrName])-attr)/5;
          step=step>0?Math.ceil(step):Math.floor(step);
          dom[attrName]=attr+step;
          var finalvalue=dom[attrName];
          var animationvalue=parseInt(props[attrName]);
          if(finalvalue==animationvalue){
          count++;
           }
           propsLength++;
        }
      }
        if(count==propsLength){
        clearInterval(dom.timer);
         if(callback){
         callback();
     }
      }
    }.bind(this),duration);
}
}
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
var Cookie={
	//获取单个子cookie的值
	get:function(name,subname){
		var subcookies=this.getAll(name);
		if(subcookies){
			return subcookies[subname];
		}
		else{
			return null;
		}
	},
	//这种"父"cocokie的形式，也只是单一的形式，思考，怎么可以在document.cookie中，包含多种此类型的cookie,获取所有的子cookie值，返回的是一个对象;
	getAll:function(name){
		//将名称转为查询字符串格式
         var cookiename=encodeURIComponent(name)+"=";
         //得到cookie值开始的起始位置
         var cookiestart=document.cookie.indexOf(cookiename);
         //定义各种变量存储接下来用到的值
         var cookieend,cookievalue,subcookies,parts=[],result={},cookies;
         if(cookiestart>-1){
         	//是否有多个cookie
         	
         	cookieend=document.cookie.indexOf(";",cookiestart);
         	//进行判断,只有一个cookie时
         	if(cookieend==-1){
         		cookieend=document.cookie.length;}

         		//获取cookie中除cookiename=的字符串
               cookievalue=document.cookie.slice(cookiestart+cookiename.length,cookieend);
               //判断cookievalue是否为空
               if(cookievalue.length>0){
               	//用"|"分隔子cookie,形如name=subname1=value1|subname2=value2.....,其中value1可以随意拼接，存储信息;
               	subcookies=cookievalue.split("|");
               	//遍历分隔出来的子cookie,["subname1=value1","subname2=value2",.....];
               for(var i=0;i<subcookies.length;i++){
                 parts=subcookies[i].split("=");
                 result[decodeURIComponent(parts[0])]=decodeURIComponent(parts[1]);
               }
               return result;
         	}
         }
         return null;
	},
	//设置单个子cookie,
	set:function(name,subname,value,expires,path,domain,secure){
		//取得所有的子cookie,其中subcookies是一个对象;
		var subcookies;
		subcookies=this.getAll(name)||{};
		//在原有的cookie上添加，若没有cookie赋予一个空对象;
		subcookies[subname]=value;
		//设置好单个子cookie后，重新设置下cookie，调用setAll();
		this.setAll(name,subcookies,expires,path,domain,secure);

	},
	//一次性设置cookie
	setAll:function(name,subcookies,expires,path,domain,secure){
		//保存数组项形如subname1=value1;
		var subcookiesParts=[];
		//保存子cookie组成的字符串,包括expires,path,domain,secure;
		var cookievalue=encodeURIComponent(name)+"=";
		//将子cookie以数组项subname1=value1保存在subcookiesParts数组中;
		var subname;
		for(subname in subcookies){
			if(subname.length>0&&subcookies.hasOwnProperty(subname)){subcookiesParts.push(encodeURIComponent(subname)+"="+encodeURIComponent(subcookies[subname]));}
		}
		if(subcookiesParts.length>0){

			cookievalue+=subcookiesParts.join("|");
			if(expires instanceof Date){
                 cookievalue+=";expires="+expires.toUTCString();
			}
			if(path){
				cookievalue+=";path="+path;
			}
			if(domain){
				cookievalue+=";domain="+domain;
			}
			if(secure){
				cookievalue+=";secure";
			}
		}
		//最终的cookie=name=subname1=value1|subname2=value2...;
		document.cookie=cookievalue;
	},
	unset:function(name,subname,path,domain,secure){
		var subcookies=this.getAll(name);
		//删除某个子cookie
		if(subcookies){
			delete subcookies[subname];
			//再重新设置下cookie;
			this.setAll(name,subcookies,null,path,domain,secure);
		}
	},
	unsetAll:function(name,path,domain,secure){
		this.setAll(name,null,new Date(-1),path,domain,secure);
	}
}
window.fakeStorage={
	data:{},
	setItem:function(id,value){
		return this.data[id]=String(value);
	},
	getItem:function(id){
		return this.data.hasOwnProperty(id)?this.data[id]:undefined;
	},

	removeItem:function(id){
		return delete this.data[id];
	},

	clear:function(){
		return this.data={};
	}
};
function localStorageManager(){
	this.bestScore="bestscore";
  this.loginname="LoginName";
  this.vipname="VipName";
  this.password="PassWord";
	var support=this.localStorageSupport();
	this.storage=support?window.localStorage:window.fakeStorage;
}
localStorageManager.prototype={
    localStorageSupport:function(){
    	var testid="test";
    	var storage=window.localStorage;
    	try{
         storage.setItem(testid,"1");
         storage.removeItem(testid);
         return true;
    	}
    	catch(error){
          return false;
    	}
    },
    getBestScore:function(){
    	return this.storage.getItem(this.bestScore)||0;
    },
    setBestScore:function(score){
    	this.storage.setItem(this.bestScore,score);
    },
     getLoginName:function(){
      return this.storage.getItem(this.loginname)||"该用户不存在";
    },
    setLoginName:function(username){
      return this.storage.setItem(this.loginname,username);
    },
    getPassWord:function(){
      return this.storage.getItem(this.password)||"null";
    },
    setPassWord:function(password){
        return this.storage.setItem(this.password,password);
    },
    getVipName:function(){
      return this.storage.getItem(this.vipname)||"";
    },
    setVipName:function(vipname){
      return this.storage.setItem(this.vipname,vipname);
    }
}
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
