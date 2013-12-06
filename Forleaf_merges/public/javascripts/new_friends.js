$(document).ready(function() {
	//$("input[name=email]").focus();
	/*var status = $.getUrlVar('status');
	if(status == "failed"){
		$(".alert-div").html("");
		history.pushState('','','/');
	}*/
	getRecommend(1);
	getRequest(1);
});

function area_measure(x1, y1, x2, y2){
	var r = 5;
	var d = Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2));
	var S = r*r*(Math.acos( d/(2*r) ) - (d * Math.sqrt(4*r*r - d*d) / (4*r*r)));
	return S;
}

function getRecommend(page) {
	$.ajax({
		type: "POST",
		url: "/getrecommend",
		dataType: "json",
		data: {page: page},
		resetForm: false,
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "failed"){
				top.document.location.reload(); 
			}
			else if(result.length > 0){
				var idx, sexcmp, my_idx = result[0].session_idx;
				var my_pub_lan, my_sub_lan;
				var my_pub_level, my_sub_level;
				var match = new Array(result.length);
				for(var i=0; i<result.length; i++){
					if(result[i].idx == my_idx){
						idx = i;
						if(result[i].pub_language == "")	my_pub_lan = [];
						else my_pub_lan = result[i].pub_language.split(",");
						if(result[i].sub_language == "")	my_sub_lan = []
						else my_sub_lan = result[i].sub_language.split(",");
						if(result[i].pub_level == "")	my_pub_level = [];
						else my_pub_level = result[i].pub_level.split(",");
						if(result[i].sub_level == "")	my_sub_level = [];
						else my_sub_level = result[i].sub_level.split(",");
						break;
					}
				}
				for(var i=0; i<result.length; i++){
					match[i] = 0.0;
					if(result[i].idx == my_idx)	continue;
					var rmd_pub_lan, rmd_sub_lan;
					var rmd_pub_level, rmd_sub_level;
					var lancmp = 0, matching_len = 0;
					if(result[i].pub_language == "")	rmd_pub_lan = [];
					else rmd_pub_lan = result[i].pub_language.split(",");
					if(result[i].sub_language == "")	rmd_sub_lan = [];
					else rmd_sub_lan = result[i].sub_language.split(",");
					if(result[i].pub_level == "")	rmd_pub_level = [];
					else rmd_pub_level = result[i].pub_level.split(",");
					if(result[i].sub_level == "")	rmd_sub_level = [];
					else rmd_sub_level = result[i].sub_level.split(",");

					if((result[i].sex == 0 && result[idx].sex == 1) || (result[i].sex == 1 && result[idx].sex == 0))		sexcmp=2;
					else if(result[i].sex == 1 && result[idx] == 1)	sexcmp=1;
					else											sexcmp=0;

					for(var j=0; j<my_pub_lan.length; j++){
						for(var l=0; l<rmd_sub_lan.length; l++){
							if(my_pub_lan[j] == rmd_sub_lan[l]){
								for(var m=0; m<my_sub_lan.length; m++){
									for(var n=0; n<rmd_pub_lan.length; n++){
										if(my_sub_lan[m] == rmd_pub_lan[n]){
											matching_len++;
											lancmp += Math.abs(my_pub_level[j] - rmd_sub_level[l])
												   + Math.abs(my_sub_level[m] - rmd_pub_level[n]) + 1;
										}
									}
								}
							}
						}
					}
					if(result[i].age == null)	match[i] = 0;
					else						match[i] = 1/(Math.abs(result[i].age - result[idx].age)+1) * 1;
					match[i] += sexcmp * 2;
					if(lancmp != 0) match[i] += 1 / lancmp * matching_len * 4;
				}
				for(var i=0; i<result.length; i++){
					for(var j=i+1; j<result.length; j++){
						if(match[i]<match[j]){
							var tmp;
							tmp = result[i];
							result[i] = result[j];
							result[j] = tmp;
							tmp = match[i];
							match[i] = match[j];
							match[j] = tmp;
						}
					}
				}
				var request_div = $('#recommendList');
				request_div.html("");
				for(var i=0; i<result.length; i++){
					if(result[i].idx == my_idx)		continue;
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
					var age = result[i].age;
					var sex = result[i].sex;
					var pub_level = result[i].pub_level;
					var sub_level = result[i].sub_level;
					item_source += '<div class="profileList">';
						item_source += '<form action="/friend_session" method="POST" name="request_profile">';
						item_source += '</form>';
						item_source += '<form action="/request_profile_move" method="POST" name="request_profile_move">';
							item_source += '<div class="profileWrapper" onclick="requestProfile(' + result[i].idx + ')">';
								item_source += '<div class="profileThumbWrapper">';
									item_source += '<div class="profileThumb">';
										item_source += '<img src="' + profile + '" width="50" height="50">';
									item_source += '</div>';
									item_source += '<div class="profileBrief">';
										item_source += '<p class="profileName">' + name + '</p>';
										item_source += '<img src="' + country_thumb + '" class="flags" width="19" height="19">';
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
					request_div.append(item_source);
				}
			}
		}
	});
}

function getRequest(page) {
	$.ajax({
		type: "POST",
		url: "/getrequest",
		dataType: "json",
		resetForm: false,
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "failed"){
				top.document.location.reload(); 
			}
			else if(result.length > 0){
				var request_div = $('#requestList');
				request_div.html("");
				for(var i=0; i<result.length; i++){
					var item_source = "";
					if(result[i].profile_imagename == ""){
						var profile = "../images/profile_thum/profileThumb0.png";
					}
					else{
						var profile = "../images/profile_thum/" + result[i].profile_imagename;
					}
					if(result[i].country == ""){
						var country_thumb = "../images/country_thum/unknown.png";
					}
					else {
						var country_thumb = "../images/country_thum/" + result[i].country + ".png";
					}
					var name = result[i].name;
					var pub_language = result[i].pub_language;
					var sub_language = result[i].sub_language;
					var age = result[i].age;
					var sex = result[i].sex;
					var location = result[i].location;
					var pub_level = result[i].pub_level;
					var sub_level = result[i].sub_level;
					item_source += '<div class="profileList">';
						item_source += '<form action="/friend_session" method="POST" name="request_profile">';
						item_source += '</form>';
						item_source += '<form action="/request_profile_move" method="POST" name="request_profile_move">';
							item_source += '<div class="profileWrapper" onclick="requestProfile(' + result[i].idx + ')">';
								item_source += '<div class="profileThumbWrapper">';
									item_source += '<div class="profileThumb">';
										item_source += '<img src="' + profile + '" width="50" height="50">';
									item_source += '</div>';
									item_source += '<div class="profileBrief">';
										item_source += '<p class="profileName">' + name + '</p>';
										item_source += '<img src="' + country_thumb + '" class="flags" width="19" height="19">';
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
					request_div.append(item_source);
				}
			}
		}
	});
}

function requestProfile(friend_idx) {
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
	$('form[name=request_profile]').ajaxSubmit(Opt);
	$('form[name=request_profile_move]').submit();
}

$('#toggleToRecommend').click(function(e) {
	$('.recBtns').toggle();
	$('.reqBtns').toggle();
	$('.recommendAndRequest').toggle();
});

$('#toggleToRequest').click(function(e) {
	$('.recBtns').toggle();
	$('.reqBtns').toggle();
	$('.recommendAndRequest').toggle();
});

$('#title1').click(function(e) {
	$('#statementContent').slideDown();
	$('.viewOrClose').toggle();
});

// 작가 노트 올리기
$('#title1Highlighted').click(function(e) {
	$('#statementContent').slideUp();
	$('.viewOrClose').toggle();
});

$('#title1').click(function()
{
	$('#content').slideToggle(null);
});