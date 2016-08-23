<?php

require_once('twitterapi/twitter_proxy.php');

// Twitter OAuth Config options
$oauth_access_token        = 'YOUR_ACCESS_TOKEN';
$oauth_access_token_secret = 'ACCESS_TOKEN_SECRET';
$consumer_key              = 'consumer_key';
$consumer_secret           = 'CONSUMER_SECRET';
$user_id                   = 'YOUR_TWITTER_USER_ID';
$screen_name               = 'YOUR_TWITTER_NAME';
$count                     = NUM_OF_TWEET;

$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$user_id,						// User id (http://gettwitterid.com/)
	$screen_name,					// Twitter handle
	$count							// The number of tweets to pull out
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);

echo $tweets;

?>