var form = document.querySelector('.esk-form');

var formGroups = form.querySelectorAll('.form-group');

formGroups.forEach(function(el){
	el.lastElementChild.placeholder = el.firstElementChild.textContent;
});

function imageSize(){
	
	var images = document.querySelectorAll('.esk-page-list-image');
	var wi = document.querySelector('.type-one:not(.double) img');
	var instafeed = document.querySelector('.esk-insta-feed-list');
	if (wi) {
		var wit = wi.width;
	}
	
	if (images) {
		images.forEach(function(el) {
			el.style.height = wit + 'px';
			el.height = wit;
		});
	}	
	
	if (instafeed) {
		instafeed.style.height = wit + 'px';
	}
}

//imageSize();
window.onload = imageSize;
window.onresize = imageSize;

//$(document).ajaxComplete(function() {
//	console.log('complete');
//});