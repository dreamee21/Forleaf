$(document).ready(function() {

});

function err(message) {
	alert(message);
}

var doTemp = function() {
	 $.ajax({
	 	type: "POST",
	 	url: "/new_friends",
	 	data: {
	 	},
	 	success: function(result) {
	 	},
	 	dataType: "text"
	 });	
}