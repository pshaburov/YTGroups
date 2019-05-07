function videoDisplay(data) {
 var videoIdArray = [];
    for(var i = 0; i < 20; i++) {
        videoIdArray.push(data[i].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/));
		 }
    
        for (var i = 0; i < 20; i++) {
            document.getElementById("parentId").innerHTML += "<div class=" + "wrapper" + "> <div class=youtube data-embed=" + videoIdArray[i][1] + "> <div class=" + "play-button" + "></div> </div></div>";
        }
        hey();
	}

function hey() {
    var youtube = document.querySelectorAll(".youtube");
    for (var i = 0; i < youtube.length; i++) {
        var source = "https://img.youtube.com/vi/" + youtube[i].dataset.embed + "/sddefault.jpg";

        var image = new Image();
        image.src = source;
        image.addEventListener("load", function() {
            youtube[i].appendChild(image);
        }(i));

        youtube[i].addEventListener("click", function() {

            var iframe = document.createElement("iframe");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");

            this.innerHTML = "";
            this.appendChild(iframe);
        });
    }
}
    function deleteAll() {
		$(".videos").empty();
    }