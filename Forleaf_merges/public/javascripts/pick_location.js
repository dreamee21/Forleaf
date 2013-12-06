var map, n=0, marker = new Array(3);
function initialize(){
	var myLatlng = new google.maps.LatLng(37.563357690435545, 126.97998046875); 
	var myOptions = {   
		zoom: 13,     
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	google.maps.event.addListener(map, 'click', function(event) {
		placeMarker(event.latLng, n);
		n++;
	});
}

function placeMarker(location, n)
{ 
	var clickedLocation = new google.maps.LatLng(location);
	if(n<3) {
		marker[n%3] = new google.maps.Marker({position: location, map: map, animation: google.maps.Animation.BOUNCE, title: "location " + (n+1)%3});
		setTimeout(function() {
			marker[n%3].setAnimation(null);
	    }, 728);
	}
	else{
		marker[n%3].setOptions({
			map: null,
			visible: false
		});
		marker[n%3] = null;
		marker[n%3] = new google.maps.Marker({position: location, map: map, animation: google.maps.Animation.BOUNCE, title: "location " + (n+1)%3});
		setTimeout(function() {
			marker[n%3].setAnimation(null);
	    }, 728);
	}
	console.log("a : " + marker[0].position.ob);
	console.log("b : " + marker[1]);
	console.log("c : " + marker[2]);
	console.log(location.ob);
	console.log(location.pb)
}

function insertLocation(){
	if(n>=3){
		var flag = 0;
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(marker[0].position.ob, marker[0].position.pb);
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				flag ++;
				var a = results[0].formatted_address.split(' ');
				$.ajax({
					type: "POST",
					url: "/profile_location_session",
					data: {location: a[3], number: 0},
					dataType: "json",
					resetForm: false,
					beforeSubmit: function(){},
					success: function(result){
					}
				});
				console.log(flag);
			}
		});
		console.log(flag);
		latlng = new google.maps.LatLng(marker[1].position.ob, marker[1].position.pb);
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				a = results[0].formatted_address.split(' ');
				$.ajax({
					type: "POST",
					url: "/profile_location_session",
					data: {location: a[3], number: 1},
					dataType: "json",
					resetForm: false,
					beforeSubmit: function(){},
					success: function(result){
					}
				});
			}
		});
		latlng = new google.maps.LatLng(marker[2].position.ob, marker[2].position.pb);
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var a = results[0].formatted_address.split(' ');
				$.ajax({
					type: "POST",
					url: "/profile_location_session",
					data: {location: a[3], number: 2},
					dataType: "json",
					resetForm: false,
					beforeSubmit: function(){},
					success: function(result){
					}
				});
			}
		});
	}

	else	alert("위치를 3곳 선택해 주세요.");
}