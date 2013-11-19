$(document).ready(function() {
	getProfile();
});

function getProfile() {
	$.ajax({
		type: "POST",
		url: "/getfriendprofile",
		dataType: "json",
		resetForm: false,
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "failed"){
				top.document.location.reload(); 
			}
			else if(result.length > 0){
				var message_profile_div = $('#profilePictureWrapper_append');
				message_profile_div.html("");
				var item_source = "";
				if(result[0].profile_imagename == ""){
					var profile = "../images/profile_thum/profileThumb0.png";}
				else{
					var profile = "../images/profile_thum/" + result[0].profile_imagename;}
				if(result[0].country == ""){
					var country = "프로필 미입력";
					var country_thumb = "../images/country_thum/unknown.png";
				}
				else {
					var country = result[0].country;
					var country_thumb = "../images/country_thum/" + result[0].country + ".png";
				}
				if(result[0].name == ""){
					var name = "Profile 미입력";}
				else{
					var name = result[0].name;}
				if(result[0].pub_language == ""){
					var pub_language = "Profile 미입력";}
				else{
					var pub_language = result[0].pub_language;}
				if(result[0].sub_language == ""){
					var sub_language = "Profile 미입력";}
				else{
					var sub_language = result[0].sub_language;}
				item_source += '<div id="profilePictureWrapper" style="background-image: url(\'' + profile + '\')">';
				item_source += '<div id="profileData">';
				item_source += '<div id="profileBlank"></div>';
				item_source += '<div id="profileCircle">';
				item_source += '<div id="profilePictureBlank"></div>';
				item_source += '<div id="profilePicture" style="background-image: url(\'' + profile + '\')"></div>';
				item_source += '</div>';
				item_source += '<div id="name">';
				item_source += '<p>' + name + '</p>';
				item_source += '</div>';
				item_source += '<div id="country">';
				item_source += '<img src="' + country_thumb + '" id="flag" width="14" height="9"/>';
				item_source += '<p>' + country + '</p>' ;
				item_source += '</div></div></div>';
				message_profile_div.append(item_source);

				message_profile_div = $('#friendProfileWrapper');
				message_profile_div.html("");
				var item_source = "";
				item_source += '<div class="languageContainer" id="friendLanguages">';
				item_source += '<div class="profileTitle">';
				item_source += '<p>LANGUAGE</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<p>' + pub_language + '</p>';
				item_source += '</div></div>';
				item_source += '<div class="languageContainer" id="friendStudying">';
				item_source += '<div class="profileTitle">';
				item_source += '<p>WANT TO STUDY</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<p>' + sub_language + '</p>';
				item_source += '</div></div>';
				message_profile_div.append(item_source);
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