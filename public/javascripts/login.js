$(document).ready(function() {
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


$('#title1').click(function()
{
	$('#content').slideToggle(null);
});