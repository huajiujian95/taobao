/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-22 22:10:04
 * @version $Id$
 */
var carousel1=new Carousel();
var carousel2=new Carousel();
carousel1.play(".carousel",24,null);
var container=document.querySelector(".tm-carousel");
var span=container.previousElementSibling.querySelector("strong span");
carousel2.play(".tm-carousel",24,span);
var carousel3=new CarouselV();
carousel3.play(".content-r-1-c");
