/*
* Licensed Materials - Property of IBM
* 5725-G92 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

function wlCommonInit(){
	require([ "dojo/core-web-layer", "dojo/mobile-ui-layer",
			"dojo/mobile-compat-layer" ], dojoInit);

	/*
	 * Application is started in offline mode as defined by a connectOnStartup property in initOptions.js file.
	 * In order to begin communicating with Worklight Server you need to either:
	 * 
	 * 1. Change connectOnStartup property in initOptions.js to true. 
	 *    This will make Worklight framework automatically attempt to connect to Worklight Server as a part of application start-up.
	 *    Keep in mind - this may increase application start-up time.
	 *    
	 * 2. Use WL.Client.connect() API once connectivity to a Worklight Server is required. 
	 *    This API needs to be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 *    Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	
	// Common initialization code goes here

}

function dojoInit() {
	require([ "dojo", "dojo/parser", "dojox/mobile", "dojox/mobile/compat",
			"dojox/mobile/deviceTheme", "dojox/mobile/ScrollableView",
			"dojox/mobile/Container", "dojox/mobile/Heading",
			"dojox/mobile/RoundRect", "dojox/mobile/TextArea",
			"dojox/mobile/TextBox", "dojox/mobile/TabBar",
			"dojox/mobile/TabBarButton", "dojox/mobile/View",
			"dojox/mobile/Button", "dojox/mobile/EdgeToEdgeList",
			"dojox/mobile/ListItem", "dojox/mobile/IconContainer",
			"dojox/mobile/Tooltip", "dojox/mobile/IconMenu",
			"dojox/mobile/IconItem", "dojox/mobile/RoundRectList",
			"dojox/mobile/EdgeToEdgeCategory" ],
			function(dojo) {
				dojo.ready(function() {
				});
			});
}


onUserReg = function(e){
	WL.Logger.debug("onUserRegisteration");
	var name = dijit.registry.byId("reg_name").value;
	var login = dijit.registry.byId("reg_username").value;
	var password = dijit.registry.byId("reg_password").value;
	var repassword = dijit.registry.byId("reg_repassword").value;
	
	WL.Logger.debug("Name---->"+name);
	WL.Logger.debug("Login---->"+login);
	WL.Logger.debug("Password-------->"+password);
	
	if (name == ""){
			displayErrorMessage("please enter your name");
	};
	
	if (login == ""){
		displayErrorMessage("please enter your Username");
		
	};
	
	if (password == ""){
		displayErrorMessage("please enter your password");
		
	};
	
	if (repassword == ""){
		displayErrorMessage("please confirm your password");
		
		
	};
	
	if (password != repassword){
		displayErrorMessage("Passwords do not match");
	}
	
	var invocationData = {
			adapter : 'UserManagementAdapter',
			procedure: 'addUser',
			parameters: [name, login, password]
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: getAddUserSuccess,
		onFailure: getAddUserFailure
	});
	
};

function displayErrorMessage(message){
	document.getElementById("error_reg").innerHTML = message;
}

function getAddUserSuccess(response){
	WL.Logger.debug("getAddUserSuccess");
	dijit.registry.byId("reg_name").value = "";
	dijit.registry.byId("reg_username").value = "";
	dijit.registry.byId("reg_password").value = "";
	dijit.registry.byId("reg_repassword").value = "";
	dijit.registry.byId("register").performTransition(
			"login", 1, "slide");
}

function getAddUserFailure(response) {
	document.getElementById("error_reg").innerHTML = "Unknown error";
};

function doLogin(){
	var login = dijit.registry.byId("log_username").value;
	var password_log = dijit.registry.byId("log_password").value;
	WL.Logger.debug("Username------>"+login);
	WL.Logger.debug("Password------>"+password_log);
	
	console.log("THis is the password that was entered by user "+ password_log);
	
	var invocationData = {
			adapter : 'UserManagementAdapter',
			procedure: 'getUser',
			parameters: [login, password_log]
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: getUserLoginSuccess,
		onFailure: getUserLoginFailure
		
	});
	
	
}

function getUserLoginSuccess(result) {
	WL.Logger.debug("Now in getUserLoginSuccess");
	
	var data = result.invocationResult.result;
	var user = JSON.parse(data);
	
	WL.Logger.debug("Found User!");
	WL.Logger.debug("Name----->"+ user.name);
	WL.Logger.debug("Username------>"+user.login);
	WL.Logger.debug("Password------>"+user.password);
	WL.Logger.debug("Entered Password------>"+dijit.registry.byId("log_password").value);
	
	
	if(user.login != "default"){
		dijit.registry.byId("home").performTransition("welcomepage", 1, "slide", null);
		WL.Logger.debug("Auth success!");
	}else{
		WL.Logger.debug("Auth fail!");
		getUserLoginFailure();
	}
	
	
}

function getUserLoginFailure(response) {
	document.getElementById("error_log").innerHTML = "Authentication Error";
};

var doLogout=function(){
	document.getElementbyId("error_log").innerHTML="";
	document.getElementbyID("log_username").innerHTML="";
	document.getElementbyID("log_password").innerHTML="";
	dijit.registry.byId("welcomepage").performTransition(
			"login", 1, "slide");
};