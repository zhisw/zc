var ApiUrl = "";
var westurl = {
	vesion:7
};
//alert(westurl.vesion);
// auto url detection
(function() {
   if(westurl.vesion==1){
   	ApiUrl = "http://oms.wm-iot.com";
   }else if(westurl.vesion==2){
    ApiUrl = "http://192.168.1.128:9080/";
   }else if(westurl.vesion==3){
    ApiUrl = "http://192.168.1.128:12000/crm/";
   }else if(westurl.vesion==4){
   	ApiUrl = "http://192.168.1.129:9060/";//王连生
   }else if(westurl.vesion==5){
   	ApiUrl = "http://192.168.1.78:9070/";//付海滨
   }else if(westurl.vesion==6){
   	ApiUrl = "http://192.168.1.238:9070/";//杨亮
   }else if(westurl.vesion==7){
   	ApiUrl = "http://192.168.1.216:9060/";//测试
   }else if(westurl.vesion==8){
   	ApiUrl = "http://192.168.1.162:9070/";//肖旖
   }else if(westurl.vesion==9){
       ApiUrl = "http://192.168.1.128:9080/";//郭加薪
   }
})();

function dateFunc(startDate,endDate){
	var startDate1 = layui.laydate.render({
	elem: startDate,
	done:function(value,date){
	startDate=date.year+'-'+date.month+'-'+date.date;
	if( value !== '' ){
		endDate1.config.min.year = date.year;
		endDate1.config.min.month = date.month - 1;
		endDate1.config.min.date = date.date;
	}else{
		endDate1.config.min.year = '1000';
		endDate1.config.min.month = '11';
		endDate1.config.min.date = '11';
	}
}
});

var endDate1 = layui.laydate.render({
elem: endDate,
done:function(value,date){
	endDateTime=date.year+'-'+date.month+'-'+date.date;
	if( value !== '' ){
		startDate1.config.max.year = date.year;
		startDate1.config.max.month = date.month - 1;
		startDate1.config.max.date = date.date;
	}else{
		startDate1.config.max.year = '2999';
		startDate1.config.max.month = '11';
		startDate1.config.max.date = '11';
	}
}
});
}




//判断session过期
layui.use(['jquery','layer','laydate'], function() {
    var $ = layui.$ , layer = layui.layer;
    var jQuery = layui.$;   
   var urlHref=window.location.href;
   if(urlHref.indexOf('login')=="-1"&&urlHref!="http://192.168.1.216:21000/"){
   
    $.ajaxSetup({
        xhrFields: {
            withCredentials: true,
        },
        crossDomain: true,
        complete: function (XMLHttpRequest, textStatus) {
        	
            if (XMLHttpRequest.responseText == -2) {
            	
                // 如果超时就处理 ，指定要跳转的页面
                //layer.msg('登录失效,请重新登录')
                layer.alert('登录失效,请重新登录', function(index){
  //do something
                window.top.location.replace("http://192.168.1.216:21000/");
                //layer.close(index);
                });  
                //
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }
    })
   //cookie
    $.cookie = function(name, value, options) {
        if(typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if(value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if(options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if(typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            // CAUTION: Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if(document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for(var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if(cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };
   
    if($.cookie("realName")!=""&&$.cookie("realName")!=null||urlHref.indexOf('assetProcess/history')>1){
    	//alert(123);
    }else{
     window.top.location.replace("http://192.168.1.216:21000/");	
    }
   }
  
});
//查询时间验证（可共用）
 function timecompare(){
   	var time1 = document.getElementById('date').value;
   	var time2 = document.getElementById('date1').value;
   	console.log(time1);
   	if(time1==""&&time2==""){
   		
   	}else if(time1==""&&time2!=""){
   		layui.use('layer',function(){
   			var layer = layui.layer;
   			layer.msg("时间区间不正确");
   		   
   		})
   		return false;
   		
   	}else if(time1!=""&&time2==""){
   		layui.use('layer',function(){
   			var layer = layui.layer;
   			layer.msg("时间区间不正确");
   		   
   		})
   		return false;
   	}else{
   		if(time2<time1){
   		layui.use('layer',function(){
   			var layer = layui.layer;
   			layer.msg("时间区间不正确");
   		   
   		})
   		return false;
   	    }
   	}
   	
   }
