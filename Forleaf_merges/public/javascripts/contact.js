function sendEmail() {
	if($('#emailAddress').val().length === 0) {
    	alert("Please fill in the email box!");
   	} else if($('#contactContent').val().length === 0) {
   		alert("Feel free to ask us anything but blank!");
   	} else {
		var Opt = {
			type: "POST",
			url: "/send_mail",
			dataType: "json",
			resetForm: false,
			beforeSubmit: function(){},
			success: function(result){
				console.log(result.result);
				if(result.result  === "success"){
					alert("Inquiry sended!");
				}
				else{
					alert("Contact send failed, please try again!");
				}
			}
		}
		$('form[name=send_mail]').ajaxSubmit(Opt);
   	}
}