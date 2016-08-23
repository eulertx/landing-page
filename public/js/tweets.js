$(function(){
	$.ajax({
		url: 'php/get_tweets.php',
		type: 'GET',
		success: function(response) {

			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				
				var $tweets = $('<div class="tweetfeed"></div>');
				$.each(response, function(i, obj) {
					$tweets.append('<div class="tweet"><div class="tweet-content z-depth-1"><a target="_blank" href="http://twitter.com/' + obj.user.name +'">'+ obj.user.name +'</a> ' + obj.text + '</div><div class="tweet-date"><i class="mdi-device-access-time"></i>' + obj.created_at + '</div></div>');
				});

				$('.tweetfeed').html($tweets);

			} else {
				$('.tweetfeed p:first').text('Response error');
			}
		},
		error: function(errors) {
			$('.tweetfeed p:first').text('Request error');
		}
	});
});