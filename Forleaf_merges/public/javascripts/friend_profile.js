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
				var profile_div = $('#profilePictureWrapper_append');
				profile_div.html("");
				var item_source = "";
				var name = result[0].name;
				if(result[0].profile_imagename == ""){
					var profile = "../images/profile_thum/profileThumb0.png";
				}
				else{
					var profile = "../images/profile_thum/" + result[0].profile_imagename;
				}
				if(result[0].country == ""){
					var country = "프로필 미입력";
					var country_thumb = "../images/country_thum/unknown.png";
				}
				else {
					var country = result[0].country;
					var country_thumb = "../images/country_thum/" + result[0].country + ".png";
				}
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
				profile_div.append(item_source);

				if(result[0].pub_language == "")	var pub_language = "프로필 미입력";
				else		var pub_language = result[0].pub_language;
				if(result[0].sub_language == "")	var sub_language = "프로필 미입력";
				else		var sub_language = result[0].sub_language;
				if(result[0].age == null)	var age = "프로필 미입력";
				else		var age = result[0].age;
				if(result[0].sex == null)	var sex = "프로필 미입력";
				else{
					if(result[0].sex == 0) var sex = "Male";
					else				   var sex = "FeMale";
				}
				if(result[0].location == "")	var location = "프로필 미입력";
				else		var location = result[0].location;
				if(result[0].job == "")	var job = "프로필 미입력";
				else		var job = result[0].job;
				if(result[0].introduce == "")	var introduce = "프로필 미입력";
				else		var introduce = result[0].introduce;
				if(result[0].hobby == "")	var hobby = "프로필 미입력";
				else		var hobby = result[0].hobby;
				profile_div = $('#profileDetailWrapper');
				profile_div.html("");
				var item_source = "";
				item_source = '<div class="profileTitle">';
				item_source += '<p>AGE</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<p>' + age + '</p>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
				item_source += '<p>GENDER</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<p>' + sex + '</p>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
				item_source += '<p>LANGUAGE</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<p>' + pub_language + '</p>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
				item_source += '<p>WANT TO STUDY</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<p>' + sub_language + '</p>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
				item_source += '<p>JOB</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<p>' + job + '</p>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
				item_source += '<p>LOCATION</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<p>' + location + '</p>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
				item_source += '<p>INTERESTS</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<p>' + hobby + '</p>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
				item_source += '<p>INTRODUCTION</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<p>' + introduce + '</p>';
				item_source += '</div>';
				profile_div.append(item_source);
			}
		}
	});
}

function setFriend() {
	var Opt = {
		type: "POST",
		url: "/set_friend",
		dataType: "json",
		resetForm: false,
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "successed"){
				history.pushState('','','/');
				top.document.location.reload(); 
			}
		}
	}
	$('form[name=set_friend]').ajaxSubmit(Opt);
}