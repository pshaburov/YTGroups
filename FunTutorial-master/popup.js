var commune = ""


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Button").addEventListener("click", handler);

    chrome.storage.local.get('group', function(data) {
		if(data.group != "") {
			addSpinner();
			if(data.group == "Republican") {
				document.getElementById("community").innerHTML = "OC Republicans";
				}
			if(data.group == "Youtube") {
				document.getElementById("community").innerHTML = "Testify Hip Hop";
			}
			if(data.group == "Alpha") {
				document.getElementById("community").innerHTML = "Alpha Test";
			}
        	loadEverything(data.group);
        }
    });
	
    document.getElementById("Republican").addEventListener("click", function(){
			    saveCurrentGroup("Republican");
				loadEverything("Republican");
				addSpinner();
				document.getElementById("community").innerHTML = "OC Republicans";
			
			});

			document.getElementById("Alpha").addEventListener("click", function(){
				saveCurrentGroup("Alpha");
 				 loadEverything("Alpha");	
 				 addSpinner();
 				 document.getElementById("community").innerHTML = "Alpha";

		
 			});

			document.getElementById("testify").addEventListener("click", function(){
				saveCurrentGroup("Youtube");
 				loadEverything("Youtube");	
 			    addSpinner();
 			    document.getElementById("community").innerHTML = "Testify Hip Hop";

	
 			});


});

function saveCurrentGroup(community) {
    chrome.storage.local.set({group: community}, function() {
        console.log('The color is mad.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    hostEquals: 'developer.chrome.com'
                },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
}



function loadEverything(datas) {
	    deleteAll();

		commune = datas


      chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  			 chrome.storage.local.get('color', function(data) {
  			 	if(typeof data.color == "undefined"){
  			 	loadEverything(datas);
  			 	} else {
  			 		removeSpinner();
  					console.log(data.color);
  					videoDisplay(data.color); 
  				}
   				 });
   			 
		 });
}

function handler() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}