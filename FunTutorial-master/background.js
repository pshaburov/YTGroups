var config = {
    apiKey: "AIzaSyAyWdgJ_a-yvH2EaDOKhILIuLvqkhtsIKM",
    authDomain: "ytdemo3-bee16.firebaseapp.com",
    databaseURL: "https://ytdemo3-bee16-586d6.firebaseio.com/",
    projectId: "ytdemo3-bee16",
    storageBucket: "ytdemo3-bee16.appspot.com",
    messagingSenderId: "187839479436"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var number = 0;
var user = Math.floor((Math.random() * 1000000) + 1);
var userString = user.toString(8) + "/";
var childData = [];

var youtuberef = firebase.database()
function readNumberOne(datas) {

childData = [];


firebase.database().ref().child(datas).on('value', function(snapshot) {
    snapshot.forEach(function(child) {
         childData.push(child.val());
    	});
	});
	clear('color');
	console.log(childData);

    chrome.storage.local.set({color: childData}, function() {
      console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
    

}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      clear('color');
      onLoad();
      sendResponse({farewell: "goodbye"});
     
    
  });

function clear(key) {
chrome.storage.local.remove(key,function(){
 var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
});

}
function onLoad() {
 chrome.storage.local.get('group', function(data) {
 	 var data = data.group;
 	 if(data == "Youtube") {
 	 data = "First";
 	 } else {
 	 data = data + "First"
 	 }
	
 	 if (typeof data != "undefined") {
 	 	readNumberOne(data);
 	 }
 	 });
}

 function debug(value) {
   chrome.storage.local.set({debug: value}, function() {
      console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
 }
function writeUserData(link) {
//optimized for multiple groups
	var group = "";
  chrome.storage.local.get('group', function(data) {
  	group = data.group;
  	if (data.group != "") {
  		youtuberef.ref(group).push({
  	  link: link,
 	 });
  }
  });
}

var globalURL = "";
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	var url = tabs[0].url;
	if (url.includes("www.youtube.com/watch?") && (globalURL != url || globalURL == "")) {
		number = number + 1;
		var urlString = url.toString()
    	writeUserData(urlString);
    	globalURL = url;
    	}
	});
  }
})

