/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-25 23:15:36
 * @version $Id$
 */
var imgs=document.querySelectorAll(".content-cont-2 img");
var arry=[];
for(var i=0;i<imgs.length;i++){
	var index=imgs[i].src.indexOf("images");
	var t=imgs[i].src.slice(index);
  arry.push(t);
}
console.log(arry);

