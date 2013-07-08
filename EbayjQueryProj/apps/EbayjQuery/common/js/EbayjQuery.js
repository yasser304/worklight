/*
* Licensed Materials - Property of IBM
* 5725-G92 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
* US Government Users Restricted Rights - Use, duplication or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

function wlCommonInit(){

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

/*function doLogin(){
WL.Logger.debug($('input[id=log_username]').val());
}*/

onUserReg = function(e){
	WL.Logger.debug("onUserRegisteration");
	var name = $('input[id=reg_name]').val();
	var login = $('input[id=reg_username]').val();
	var password = $('input[id=reg_password]').val();
	var repassword = $('input[id=reg_repassword]').val();
	
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
	document.getElementById("error").innerHTML = message;
}

function getAddUserSuccess(response){
	WL.Logger.debug("getAddUserSuccess");
	var blank = "";
	$('input[id=reg_name]').val(blank);
	$('input[id=reg_username]').val(blank);
	$('input[id=reg_password]').val(blank);
	$('input[id=reg_repassword]').val(blank);
	$.mobile.changePage( $("#homepage"), { transition: "slide"});
}

function getAddUserFailure(response) {
	document.getElementById("reg_error").innerHTML = "Unknown error";
};

function doLogin(){
	var login = $('input[id=log_username]').val();
	var password = $('input[id=log_password]').val();
	WL.Logger.debug("Username------>"+login);
	WL.Logger.debug("Password------>"+password);
	
	var invocationData = {
			adapter : 'UserManagementAdapter',
			procedure: 'getUser',
			parameters: [login, password]
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
	WL.Logger.debug("Entered Password------>"+$('input[id=log_password]').val());
	
	
	if(user.login != "default"){
		$.mobile.changePage( $("#homescreen"), { transition: "slide"});
		WL.Logger.debug("Auth success!");
	}else{
		WL.Logger.debug("Auth fail!");
		getUserLoginFailure();
	}
	
	
}

function getUserLoginFailure(response) {
	document.getElementById("log_error").innerHTML = "Authentication Error";
};