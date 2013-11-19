$(document).ready(function() {
	getMessage();
});

function getMessage() {
	$.ajax({
		type: "POST",
		url: "/getmessage",
		dataType: "json",
		resetForm: false,
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "failed"){
				top.document.location.reload(); 
			}
			else if(result.length > 0){
				var message_div = $('#messageList_append');
				message_div.html("");
				for(var i=0; i<result.length; i++){
					var item_source = "";
					if(result[i].profile_imagename == ""){
						var profile = "../images/profile_thum/profileThumb0.png";}
					else{
						var profile = "../images/profile_thum/" + result[i].profile_imagename;}
					if(result[i].country == ""){
						var country_thumb = "../images/country_thum/unknown.png";}
					else {
						var country_thumb = "../images/country_thum/" + result[i].country + ".png";}
					if(result[i].name == ""){
						var name = "Profile 미입력";}
					else{
						var name = result[i].name;}
					if(result[i].pub_language == ""){
						var pub_language = "Profile 미입력";}
					else{
						var pub_language = result[i].pub_language;}
					if(result[i].sub_language == ""){
						var sub_language = "Profile 미입력";}
					else{
						var sub_language = result[i].sub_language;}
					if(result[i].location == ""){
						var location = "Profile 미입력";}
					else{
						var location = result[i].location;}
					var pub_level = result[i].pub_level;
					var sub_level = result[i].sub_level;
					item_source += '<div class="profileList" id="messageList">';
						item_source += '<form action="/friend_session" method="POST" name="message_profile">';
						item_source += '</form>';
						item_source += '<form action="/message_profile_move" method="POST" name="message_profile_move">';
							item_source += '<div class="profileWrapper" onclick="messageProfile(' + result[i].idx + ')">';
								item_source += '<div class="profileThumbWrapper">';
									item_source += '<div class="profileThumb">';
										item_source += '<img src="' + profile + '" width="50" height="50" />';
									item_source += '</div>';
									item_source += '<div class="profileBrief">';
										item_source += '<p class="profileName">' + name + '</p>';
										item_source += '<img src="' + country_thumb + '" class="flags" width="19" height="19" />';
									item_source += '</div>';
								item_source += '</div>';
								item_source += '<div class="profileInfo">';
									item_source += '<div class="profileInfoRow">';
										item_source += '<p class="profileInfoRowTitles">CAN</p>';
										item_source += '<p class="profileInfoRowContents">' + pub_language + '</p>';
									item_source += '</div>';
									item_source += '<div class="profileInfoRow">';
										item_source += '<p class="profileInfoRowTitles">WANT</p>';
										item_source += '<p class="profileInfoRowContents">' + sub_language + '</p>';
									item_source += '</div>';
									item_source += '<div class="profileInfoRow">';
										item_source += '<p class="profileInfoRowTitles">AREA</p>';
										item_source += '<p class="profileInfoRowContents">' + location + '</p>';
									item_source += '</div>';
								item_source += '</div>';
							item_source += '</div>';
						item_source += '</form>';
					item_source += '</div>';
					message_div.append(item_source);
				}
			}
		}
	});
}

function messageProfile(friend_idx) {
	var Opt = {
		type: "POST",
		url: "/friend_session",
		data: {friend_idx: friend_idx},
		dataType: "json",
		resetForm: false,
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "failed"){
				top.document.location.reload();
			}
		}
	}
	$('form[name=message_profile]').ajaxSubmit(Opt);
	$('form[name=message_profile_move]').submit();
}