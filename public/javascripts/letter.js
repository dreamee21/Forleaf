var my_idx, friends_idx, friend_profile_name, friend_profile_image, message_idx;
$(document).ready(function(){
	getLetter();
	var messageBox = $('#letterTextBox');
	var letter_div = $('#letterWrapper_append');
	var room = io.connect('/room');
	var showMessage = function(msg, idx){
		var date = new Date();
		date = date.getUTCFullYear() + '-' +
		    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
		    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
		    ('00' + date.getUTCHours()).slice(-2) + ':' + 
		    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
		    ('00' + date.getUTCSeconds()).slice(-2);
		date = date.split(' ');
		$.ajax({
			type: "POST",
			url: "/inputletter",
			dataType: "json",
			data: {msg: msg},
			resetForm: false,
			beforeSubmit: function(){},
			success: function(result){
			}
		});
		if(my_idx != idx){
			var item_source = "";
			item_source += '<div class="friendsLetter">';
				item_source += '<div class="friendsProfile">';
					item_source += '<img class="friendLetterProfilePhoto" src="/images/profile_thum/' + friend_profile_image + '" width="40" height="40" />';
					item_source += '<p class="profileName">' + friend_profile_name + '</p>';
				item_source += '</div>';
				item_source += '<div class="friendTail"></div>';
				item_source += '<div class="friendsLetterContents">';
					item_source += '<p>' + msg + '</p>';
				item_source += '</div>';
				item_source += '<div class="friendLetterTime"><p>' + date[0].slice(2,10) + '</p><p>' + date[1] + '</p></div>';
			item_source += '</div><div class="clearboth"></div>';
			letter_div.append(item_source);
			letter_div.scrollTop(letter_div.height());
		}
		else{
			var item_source = "";
			item_source += '<div class="myLetter">';
				item_source += '<div class="myTail"></div>';
				item_source += '<div class="myLetterContents">';
					item_source += '<p>' + msg + '</p>';
				item_source += '</div>';
				item_source += '<div class="myLetterTime"><p>' + date[0].slice(2,10) + '</p><p>' + date[1] + '</p></div>';
			item_source += '</div><div class="clearboth"></div>';
			letter_div.append(item_source);
			letter_div.scrollTop(letter_div.height());
		}
	};
	room.on('connect', function(){
		room.emit('join', {roomName: message_idx, user_idx:my_idx});
	});
	room.on('joined', function(data){
	});
	room.on('message', function(data){
		showMessage(data.msg, data.idx);
	});
	$('#message_input').submit(function(e){
		e.preventDefault();
		var msg = messageBox.val();
		if($.trim(msg) !== ''){
			showMessage(msg, my_idx);
			room.json.send({msg:msg, idx: my_idx});
			messageBox.val('');
		}
	});
	$('#back').click(function(e){
		room.emit('leave', {idx: my_idx});
		$('#back').submit();
	});
});

function getLetter(){
	$.ajax({
		type: "POST",
		url: "/getletter",
		dataType: "json",
		resetForm: false,
		beforeSubmit: function(){},
		success: function(result){
			if(result.result == "failed"){
				top.document.location.reload(); 
			}
			else if(result.length > 0){
				var letter_div = $('#letterWrapper');
				letter_div.html("");
				if(result[1][0].profile_imagename == "")	profile_image = "profileThumb0.png";
				else										profile_image = result[1][0].profile_imagename;
				friend_profile_image = profile_image;
				friend_profile_name = result[1][0].name;
				my_idx = result[1][0].idx;
				friends_idx = result[1][0].friend_idx;
				message_idx = result[1][0].message_idx;
				console.log(result);
				var item_source = "";
				for(var i=0; i<result[0].length; i++){
					var date;
					date = new Date(result[0][i].reg_date);
					date = date.getUTCFullYear() + '-' +
					    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
					    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
					    ('00' + date.getUTCHours()).slice(-2) + ':' + 
					    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
					    ('00' + date.getUTCSeconds()).slice(-2);
					date = date.split(' ');
					if(result[1][0].idx == result[0][i].user_idx){
						item_source += '<div class="myLetter">';
							item_source += '<div class="myTail"></div>';
							item_source += '<div class="myLetterContents">';
								item_source += '<p>' + result[0][i].message + '</p>';
							item_source += '</div>';
							item_source += '<div class="myLetterTime"><p>' + date[0].slice(2,10) + '</p><p>' + date[1] + '</p></div>';
						item_source += '</div><div class="clearboth"></div>';
					}
					else{
						item_source += '<div class="friendsLetter">';
							item_source += '<div class="friendsProfile">';
								item_source += '<img class="friendLetterProfilePhoto" src="/images/profile_thum/' + profile_image + '" width="40" height="40" />';
								item_source += '<p class="profileName">' + result[1][0].name + '</p>';
							item_source += '</div>';
							item_source += '<div class="friendTail"></div>';
							item_source += '<div class="friendsLetterContents">';
								item_source += '<p>' + result[0][i].message + '</p>';
							item_source += '</div>';
							item_source += '<div class="friendLetterTime"><p>' + date[0].slice(2,10) + '</p><p>' + date[1] + '</p></div>';
						item_source += '</div><div class="clearboth"></div>';
					}				
				}
				letter_div.append(item_source);
			}
		}
	});
}