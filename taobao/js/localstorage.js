/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-06-08 20:04:31
 * @version $Id$
 */
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
  this.username="username";
  this.vipname="vipname";
  this.password="password";
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
    getUserName:function(){
      return this.storage.getItem(this.username)||"该用户不存在";
    },
    setUserName:function(username){
      return this.storage.setItem(this.username,username);
    },
    getPassWord:function(){
      return this.storage.getItem(this.password)||"null";
    },
    setPassWord:function(password){
        return this.storage.setItem(this.password,password);
    },
    getVipName:function(){
      return this.storage.getItem(this.username)||"该用户不存在";
    },
    setVipName:function(vipname){
      return this.storage.setItem(this.username,username);
    }
}