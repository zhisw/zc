layui.config({
	base : "js/"
}).use(['form','layer'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery;
    var append = "?clearCache=" + new Date().getTime() + "a" + Math.random();
    $(".code img").prop("src",ApiUrl+"login/LoginCtrl-getVerifyImage" + append);
    $(".code").on('click',function(){
    	var append = "?clearCache=" + new Date().getTime() + "a" + Math.random(); 
    	$(".code img").prop("src",ApiUrl+"login/LoginCtrl-getVerifyImage" + append);
    })
	//video背景
	$(window).resize(function(){
		if($(".video-player").width() > $(window).width()){
			$(".video-player").css({"height":$(window).height(),"width":"auto","left":-($(".video-player").width()-$(window).width())/2});
		}else{
			$(".video-player").css({"width":$(window).width(),"height":"auto","left":-($(".video-player").width()-$(window).width())/2});
		}
	}).resize();
	
	//登录按钮事件
	form.on("submit(login)",function(data){
		var phone = "";
		var email = "";
		var username = $("input[name=username]").val();
		var password = $("input[name=password]").val();
		var yzm = $("input[name=code]").val();
		var reg = /^1[3|5|7|8][0-9]\d{4,8}$/;
		var reg2 =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(reg.test(username)==false&&reg2.test(username)==false){
			$(".msgtishi").html("用户名格式不正确");
			var append = "?clearCache=" + new Date().getTime() + "a" + Math.random(); 
		    $(".code img").prop("src",ApiUrl+"login/LoginCtrl-getVerifyImage" + append);
		}else{
			$(".msgtishi").html("");
			if(reg.test(username)==true){
				phone = username;
			}else if(reg2.test(username)==true){
				email = username;
			}
			$.ajax({
				type:"post",
				url:ApiUrl+"login/login",
				async:true,
				xhrFields:{
    			withCredentials:true,
    		    },
                crossDomain:true,
				data:{
					'phone':phone,
					'email':email,
					'userPassword':password,
					'verifyCode':yzm
				},
				
				success:function(res){
					if(res.data==0){
						$(".msgtishi").html(res.info);
						var append = "?clearCache=" + new Date().getTime() + "a" + Math.random(); 
						$(".code img").attr("src",ApiUrl+"login/LoginCtrl-getVerifyImage" + append);
					}else{
						var result = res.info;
						
						$.cookie("id", result.id,{ expires: 1 ,path: '/' });//用户id
						$.cookie("realName", result.realName,{ expires: 1 ,path: '/' });//用户姓名
						$.cookie("userCode", result.userCode,{ expires: 1 ,path: '/' });//用户编号
						$.cookie("organizationId", result.organizationId,{ expires: 1 ,path: '/' });//机构ID
						$.cookie("organizationTitle", result.organizationTitle,{ expires: 1 ,path: '/' });//机构名称
						$.cookie("deptId", result.deptId,{ expires: 1 ,path: '/' });//部门ID
						$.cookie("deptName", result.deptName,{ expires: 1 ,path: '/' });//部门名称
						$.cookie("photo", result.photo,{ expires: 1 ,path: '/' });//头像
						$.cookie("jobState", result.jobState,{ expires: 1 ,path: '/' });//在职状态
						$.cookie("isStoreman", result.isStoreman,{ expires: 1 ,path: '/' });//是否是保管员(1-是,-1-不是）
						$.cookie("isAdmin", result.isAdmin,{ expires: 1 ,path: '/' });//是否是管理员(1-是,-1-不是）
						$.cookie("adminId", result.adminId,{ expires: 1 ,path: '/' });//管理员id
						$.cookie("roleIds", result.roleIds,{ expires: 1 ,path: '/' });//权限ID
						$.cookie("groupCode",result.groupCode,{expires:1 ,path: '/'});//集团ID
						$.cookie("lastLoginIp",result.lastLoginIp,{expires:1,path:'/'});
						$.cookie("lastLoginTime",result.lastLoginTime,{expires:1,path:'/'});
						$.cookie("logins",result.logins,{expires:1,path:'/'});
						window.location.href = "../../index.html";
					}
					
				},error:function(){
					alert("网络错误！")
				}
			});
		}
		//
		return false;
	})
})
