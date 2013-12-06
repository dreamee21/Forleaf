$(document).ready(function() {
	var i=1;
	var image = $('#loginPageWrapper');
	setInterval(function () {
		image.fadeOut(4000, function(){
			i = String(i);
			image.css("background-image", "url('/images/signup_login/" + i + ".png')");
			image.fadeIn(4000);
			i = Number(i);
			i++;
			if(i===8) {
				i=0;
			}
		});
	},2000);	
	$("input[name=email]").focus();
	/*var status = $.getUrlVar('status');
	if(status == "failed"){
		$(".alert-div").html("");
		history.pushState('','','/');
	}*/
});


function login() {
	var Opt = {
		type: "POST",
		url: "/login",
		dataType: "json",
		resetForm: false,
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "failed"){
				$(".alert-div").html("");
				$(".login-" + result.target + "-alert").html(result.msg);
				$("form[name=login_form] input").css({border:"1px solid rgba(204, 204, 204, 0.47)"});
				$("form[name=login_form] input[name="+result.target+"]").css({border:"3px solid rgba(255, 0, 0, .4)"});
				$("form[name=login_form] input[name="+result.target+"]").focus();
			}
			else{
				history.pushState('','','/');
				top.document.location.reload(); 
			}
		}
	}
	$('form[name=login_form]').ajaxSubmit(Opt);
}

function signUp() {
	var Opt = {
		type: "POST",
		url: "/signup",
		dataType: "json",
		resetForm: false,
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "failed"){
				$(".alert-div").html("");
				$(".signup-" + result.target + "-alert").html(result.msg);
				$("form[name=signup_form] input").css({border:"1px solid rgba(204, 204, 204, 0.47)"});
				$("form[name=signup_form] input[name="+result.target+"]").css({border:"3px solid rgba(255, 0, 0, .4)"});
				$("form[name=signup_form] input[name="+result.target+"]").focus();
			}
			else{
				history.pushState('','','/');
				top.document.location.reload();
			}
		}
	}
	$('form[name=signup_form]').ajaxSubmit(Opt);
}

/*function checkEmail(){
	$('form[name=signup_form')
}*/