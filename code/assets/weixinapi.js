(function(){
	function getUrl(){
		return location.href.split('#')[0];
		//return window.location.href.replace(window.location.hash,'');		
	}
	function getSignature(callback){
		var url = getUrl();
		$.get('http://www.foshannews.net/webapp/share/weixinapi.php',{weiqingid:12,url:url,appId:appId},function(s){
			//判断返回结果是否正确，现默认为正确
			timestamp = s.timestamp;
			nonceStr = s.noncestr;
			signature = s.signature;
			callback();
		},'json')
	}
	function wxconfig(){
		var zuobicanshu = 'openjsdebug';
		var reg = new RegExp("(^|&)" + zuobicanshu + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		var zuobi = r ? true : false;
		debug = zuobi || debug;
		getSignature(function(){
			wx.config({
				debug : debug,
				appId : appId,
				timestamp : timestamp,
				nonceStr : nonceStr,
				signature : signature,
				jsApiList : jsApiList
			})
		})
	}
	
	var jsApiList = ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","startRecord","stopRecord","onVoiceRecordEnd","playVoice","pauseVoice","stopVoice","onVoicePlayEnd","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","translateVoice","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"];
	var debug = false;
	var appId = 'wx9d0f857215e69a94';
	var timestamp;
	var nonceStr;
	var signature;

	var recordHandler;
	
	var weixin = {
		//初始配置
		init : function(appid,apiList){
			if(window.$ == ''){
				alert('请先加载jquery');return false;
			}
			if(window.wx == ''){
				alert('请先加载wxapi');return false;
			}
			if(appid){
				appId = appid;
			}
			if(apiList){
				jsApiList = apiList;
			}
			wxconfig();	
		},	

		//开启debug模式
		wxdebug : function(){
			debug = true;
		}
	}

	window.weixinapp = weixin;
}())
