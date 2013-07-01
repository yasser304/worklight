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
	require([ "dojo", "dojo/parser", "dojox/mobile", "dojox/mobile/compat", "dojox/mobile/deviceTheme", "dojox/mobile/ScrollableView", "dojox/mobile/Container", "dojox/mobile/Heading", "dojox/mobile/RoundRect", "dojox/mobile/TextArea", "dojox/mobile/TextBox", "dojox/mobile/TabBar", "dojox/mobile/TabBarButton", "dojox/mobile/View", "dojox/mobile/Button", "dojox/mobile/EdgeToEdgeList", "dojox/mobile/ListItem", "dojox/mobile/IconContainer", "dojox/mobile/Tooltip", "dojox/mobile/IconMenu", "dojox/mobile/IconItem", "dojox/mobile/RoundRectList", "dojox/mobile/EdgeToEdgeCategory" ],
			function(dojo) {
				dojo.ready(function() {
				});
			});
}
