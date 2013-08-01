/*
 * Licensed Materials - Property of IBM
 * 5725-G92 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

function wlCommonInit() {

	/*
	 * Application is started in offline mode as defined by a connectOnStartup
	 * property in initOptions.js file. In order to begin communicating with
	 * Worklight Server you need to either:
	 * 
	 * 1. Change connectOnStartup property in initOptions.js to true. This will
	 * make Worklight framework automatically attempt to connect to Worklight
	 * Server as a part of application start-up. Keep in mind - this may
	 * increase application start-up time.
	 * 
	 * 2. Use WL.Client.connect() API once connectivity to a Worklight Server is
	 * required. This API needs to be called only once, before any other
	 * WL.Client methods that communicate with the Worklight Server. Don't
	 * forget to specify and implement onSuccess and onFailure callback
	 * functions for WL.Client.connect(), e.g:
	 * 
	 * WL.Client.connect({ onSuccess: onConnectSuccess, onFailure:
	 * onConnectFailure });
	 * 
	 */

	// Common initialization code goes here
}

/*
 * function doLogin(){ WL.Logger.debug($('input[id=log_username]').val()); }
 */

onUserReg = function(e) {
	$.mobile.showPageLoadingMsg();
	WL.Logger.debug("onUserRegisteration");
	var name = $('input[id=reg_name]').val();
	var login = $('input[id=reg_username]').val();
	var password = $('input[id=reg_password]').val();
	var repassword = $('input[id=reg_repassword]').val();

	WL.Logger.debug("Name---->" + name);
	WL.Logger.debug("Login---->" + login);
	WL.Logger.debug("Password-------->" + password);

	if (name == "") {
		displayErrorMessage("please enter your name");
	}
	;

	if (login == "") {
		displayErrorMessage("please enter your Username");

	}
	;

	if (password == "") {
		displayErrorMessage("please enter your password");

	}
	;

	if (repassword == "") {
		displayErrorMessage("please confirm your password");

	}
	;

	if (password != repassword) {
		displayErrorMessage("Passwords do not match");
	}

	var invocationData = {
		adapter : 'UserManagementAdapter',
		procedure : 'addUser',
		parameters : [ name, login, password ]
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getAddUserSuccess,
		onFailure : getAddUserFailure
	});

};

function displayErrorMessage(message) {
	document.getElementById("reg_error").innerHTML = message;
}

function getAddUserSuccess(response) {
	WL.Logger.debug("getAddUserSuccess");
	var blank = "";
	$('input[id=reg_name]').val(blank);
	$('input[id=reg_username]').val(blank);
	$('input[id=reg_password]').val(blank);
	$('input[id=reg_repassword]').val(blank);
	$.mobile.changePage($("#homepage"), {
		transition : "slide"
	});
	$.mobile.hidePageLoadingMsg();
}

function getAddUserFailure(response) {
	document.getElementById("reg_error").innerHTML = "Unknown error";
	$.mobile.hidePageLoadingMsg();
};

function doLogin() {
	$.mobile.showPageLoadingMsg();
	var login = $('input[id=log_username]').val();
	var password = $('input[id=log_password]').val();
	WL.Logger.debug("Username------>" + login);
	WL.Logger.debug("Password------>" + password);

	var invocationData = {
		adapter : 'UserManagementAdapter',
		procedure : 'getUser',
		parameters : [ login, password ]
	};

	WL.Client.invokeProcedure(invocationData, {
		onSuccess : getUserLoginSuccess,
		onFailure : getUserLoginFailure

	});

}

function getUserLoginSuccess(result) {
	WL.Logger.debug("Now in getUserLoginSuccess");

	var data = result.invocationResult.result;
	var user = JSON.parse(data);

	WL.Logger.debug("Found User!");
	WL.Logger.debug("Name----->" + user.name);
	WL.Logger.debug("Username------>" + user.login);
	WL.Logger.debug("Password------>" + user.password);
	WL.Logger.debug("Entered Password------>"
			+ $('input[id=log_password]').val());

	if (user.login != "default") {
		$.mobile.changePage($("#homescreen"), {
			transition : "slide"
		});
		$.mobile.hidePageLoadingMsg();
		WL.Logger.debug("Auth success!");
	} else {
		WL.Logger.debug("Auth fail!");
		getUserLoginFailure();
		$.mobile.hidePageLoadingMsg();
	}

}

function getUserLoginFailure(response) {
	document.getElementById("log_error").innerHTML = "Authentication Error";
	$.mobile.hidePageLoadingMsg();
};

/*
 * $(function() { var yourStartLatLng = new google.maps.LatLng(59.3426606750,
 * 18.0736160278); // $('#map_canvas').gmap({'center': yourStartLatLng});
 * $('#page_id').live("pageshow", function() { $('#map_canvas').gmap('refresh');
 * }); $('#page_id').live("pageinit", function() {
 * $('#map_canvas').gmap({'center': '59.3426606750, 18.0736160278'}); }); });
 */

$(document)
		.ready(
				function() {
					getTweets = function() {

						var user = $("#tuser").val();
						if (user != "") {
							$("#tweets").html('');
							// show loading image
							$.mobile.showPageLoadingMsg();
							$
									.getJSON(
											'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='
													+ user + '&count=10',
											function(data) {
												var template = "";
												var screenname = "";
												var realname = "";
												var tweet = "";
												var avataar = "";
												$
														.each(
																data,
																function(index,
																		item) {
																	screenname = item.user.screen_name;
																	realname = item.user.name;
																	tweet = item.text;
																	created_at = item.created_at;
																	avataar = item.user.profile_image_url;
																	created_at = created_at
																			.split(" ");

																	// create
																	// list item
																	// template
																	$("#tweets")
																			.append(
																					'<li><a href="#"><img style="margin:1%;" src="'
																							+ avataar
																							+ '" /><h3>'
																							+ screenname
																							+ '</h3><p>'
																							+ tweet
																							+ '</p><p class="light-text">'
																							+ created_at[1]
																							+ ' '
																							+ created_at[2]
																							+ '</p></a></li>');

																	// Refresh
																	// list so
																	// jquery
																	// mobile
																	// can apply
																	// iphone
																	// look to
																	// the list
																	$("#tweets")
																			.listview();
																	$("#tweets")
																			.listview(
																					"refresh");

																});
												// hide loading image
												$.mobile.hidePageLoadingMsg();
											});
						}
					};
				});

$(document).on("pageinit", "#youtubePage", function(event) {
	$.mobile.loading( 'show' ,{ theme: "b", text: "Loading Videos..."});
	WL.Logger.debug("Getting Youtube Videos");
	$.getJSON('http://gdata.youtube.com/feeds/api/users/prolificstv/uploads?orderby=updated&alt=json&v=2',
			function(data) {
				$.each(	data.feed.entry,
								function(i, item) {
									var updated = item.updated;
									var url = item['media$group']['media$content'][0]['url'];
									var thumb = item['media$group']['media$thumbnail'][0]['url'];
									var media_title = item['title']['$t'];
									//var numViews = item['yt$statistics']['viewCount'];

									WL.Logger.debug(media_title +" "+ thumb+" "+url+updated);
									
									$("#youtubefeed").append('<li style="fontsize:15px"><a href="'+url+'"><img src="'+thumb+'" />'+media_title+'</a></li>').listview('refresh');;
								});
				$.mobile.loading('hide');

				WL.Logger.debug("Success retrieving VDOS!");
			});
});