$(document).ready(function() {

});

function err(message) {
	alert(message);
}

/*
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
*/

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