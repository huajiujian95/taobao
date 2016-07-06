
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