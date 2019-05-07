function addSpinner() {
	 document.getElementById("parentIds").innerHTML  += "<div class=loading id=parentIds></div>"
}
function removeSpinner() {
	$(".loader").empty();
}