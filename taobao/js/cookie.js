/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-24 22:13:09
 * @version $Id$
 */
//目的解决浏览器对cookie的个数限制，具有扩展性;
//最终获取或设置的cookie形如name=subnam1=value1|subname2=value2|subname3=value2....
//设置单个子cookie调用Cookie.set(name,subname,value,path,domain,secure) ;
//获取单个子cookie调用Cookie.get(name,subname);得到一个值;这个值是通过subcookies这个保存子cookie的对象获取
//设置所有的子c okie调用Cookie.getAll(name);得到一个保存子cookie信息的对象，子cookie用键值对保存;
//获取所有的子cookie调用Cookie.setAll(name,subcookies,value,path,domain,secure);获取到的是一个对象，其中保存了以键值对的方式存储的子cookie;
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
			this.setAll(name,subcookies,"",path,domain,secure);
		}
	},
	unsetAll:function(name,path,domain,secure){
		this.setAll(name,"",new Date(-1),path,domain,secure);
	}
}
