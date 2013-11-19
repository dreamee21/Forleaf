$(document).ready(function() {
	getProfile_edit();
});

function getProfile_edit() {
	$.ajax({
		type: "POST",
		url: "/geteditprofile",
		dataType: "json",
		resetForm: false,
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "failed"){
				top.document.location.reload(); 
			}
			else if(result.length > 0){
				var edit_profile_div = $('#profilePictureWrapper_append');
				edit_profile_div.html("");
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
				edit_profile_div.append(item_source);

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

				var my_pub_lan, my_sub_lan;
				var my_pub_level, my_sub_level;
				if(result[0].pub_language == "")	my_pub_lan = [];
				else my_pub_lan = result[0].pub_language.split(",");
				if(result[0].sub_language == "")	my_sub_lan = []
				else my_sub_lan = result[0].sub_language.split(",");
				if(result[0].pub_level == "")	my_pub_level = [];
				else{
					my_pub_level = result[0].pub_level.split(",");
					for(var i=0; i<my_pub_level.length; i++){
						if(my_pub_level[i] == '0')	my_pub_level[i] = "None";
						else if(my_pub_level[i] == '1')	my_pub_level[i] = "Poor";
						else if(my_pub_level[i] == '2')	my_pub_level[i] = "Normal";
						else if(my_pub_level[i] == '3')	my_pub_level[i] = "Good";
						else if(my_pub_level[i] == '4')	my_pub_level[i] = "Great";
						else							my_pub_level[i] = "Unknown";
					}
				}
				if(result[0].sub_level == "")	my_sub_level = [];
				else{
					my_sub_level = result[0].sub_level.split(",");
					for(var i=0; i<my_sub_level.length; i++){
						if(my_sub_level[i] == '0')	my_sub_level[i] = "None";
						else if(my_sub_level[i] == '1')	my_sub_level[i] = "Poor";
						else if(my_sub_level[i] == '2')	my_sub_level[i] = "Normal";
						else if(my_sub_level[i] == '3')	my_sub_level[i] = "Good";
						else if(my_sub_level[i] == '4')	my_sub_level[i] = "Great";
						else							my_sub_level[i] = "Unknown";
					}
				}

				edit_profile_div = $('#profileDetailWrapper');
				edit_profile_div.html("");
				var item_source = "";
				item_source = '<div class="profileTitle">';
					item_source += '<p>AGE</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
					item_source += '<input type="text" placeholder="Add age" name="add_age" value="' + age + '"/>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
					item_source += '<p>GENDER</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
					item_source += '<select name="add_sex">';
						item_source += '<option value="male">male</option>';
						item_source += '<option value="female">female</option>';
					item_source += '</select>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
					item_source += '<p>COUNTRY</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
					item_source += '<select name="add_country">';
						item_source += '<option value="korea">Korea</option>';
						item_source += '<option value="america">America</option>';
						item_source += '<option value="japan">Japan</option>';
						item_source += '<option value="france">Frence</option>';
						item_source += '<option value="spain">Spain</option>';
						item_source += '<option value="china">China</option>';
					item_source += '</select>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
					item_source += '<p>LANGUAGE</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
					item_source += '<select name="add_language">';
						item_source += '<option value="korean">Korean</option>';
						item_source += '<option value="english">English</option>';
						item_source += '<option value="japanese">Japanese</option>';
						item_source += '<option value="french">French</option>';
						item_source += '<option value="spanish">Spanish</option>';
						item_source += '<option value="chinese">Chinese</option>';
					item_source += '</select>';
					item_source += '<select name="add_language_level">';
						item_source += '<option value="great">Great</option>';
						item_source += '<option value="good">Good</option>';
						item_source += '<option value="normal">Normal</option>';
						item_source += '<option value="poor">Poor</option>';
						item_source += '<option value="none">None</option>';
					item_source += '</select>'
					for(var i=0; i<my_pub_lan.length; i++){
						item_source += '<div class="language">';
							item_source += '<p class="languageName">' + my_pub_lan[i] + '</p>';
							item_source += '<p class="languageLevel">' + my_pub_level[i] + '</p>';
						item_source += '</div>';
					}
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
					item_source += '<p>WANT TO STUDY</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
					item_source += '<select name="add_want">';
						item_source += '<option value="korean">Korean</option>';
						item_source += '<option value="english">English</option>';
						item_source += '<option value="japanese">Japanese</option>';
						item_source += '<option value="french">French</option>';
						item_source += '<option value="spanish">Spanish</option>';
						item_source += '<option value="chinese">Chinese</option>';
					item_source += '</select>';
					item_source += '<select name="add_want_level">';
						item_source += '<option value="great">Great</option>';
						item_source += '<option value="good">Good</option>';
						item_source += '<option value="normal">Normal</option>';
						item_source += '<option value="poor">Poor</option>';
						item_source += '<option value="none">None</option>';
					item_source += '</select>'
					for(var i=0; i<my_sub_lan.length; i++){
						item_source += '<div class="language">';
							item_source += '<p class="languageName">' + my_sub_lan[i] + '</p>';
							item_source += '<p class="languageLevel">' + my_sub_level[i] + '</p>';
						item_source += '</div>';
					}
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
					item_source += '<p>JOB</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<input type="text" placeholder="Add School / Job" name="add_job" value="' + job + '">';
				item_source += '<p>' + job + '</p>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
				item_source += '<p>LOCATION</p>';
				item_source += '</div>';
				//item_source += '</form >';
				item_source += '<div class="profileContent">';
				item_source += '<div><span id="location_div">' + location + '</span>';
				item_source += '</div>';
				item_source += '<form action="/profile_location_move" method="POST" name="profile_location_move"><button type="button" onclick="location_map(\'' + location + '\')">Change Location</button></form>';
				item_source += '</div>';
				//item_source += '</form>';

				item_source += '<div class="profileTitle">';
				item_source += '<p>INTERESTS</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<input type="text" placeholder="Add Hobby" name="add_hobby" value="' + hobby + '">';
				item_source += '<p>' + hobby + '</p>';
				item_source += '</div>';

				item_source += '<div class="profileTitle">';
				item_source += '<p>INTRODUCTION</p>';
				item_source += '</div>';
				item_source += '<div class="profileContent">';
				item_source += '<textarea rows="4" cols="38" style="colr: #8b8b8d" value ="' + introduce + '" name="add_introduce">' + introduce + '</textarea>';
				item_source += '</div>';
				edit_profile_div.append(item_source);
			}
		}
	});
}

function insertProfile() {
	var Opt = {
		type: "POST",
		url: "/insert_profile",
		dataType: "json",
		resetForm: false,
		data: {location: $('#location_div').text()},
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "successed"){
				$('#back').submit();
			}
		}
	}
	$('form[name=insert_profile]').ajaxSubmit(Opt);
}

function location_map(location){
	$('form[name=profile_location_move]').submit();
	//$("#location_div").text(result.location);
}

