var page = document.querySelector('.ccm-page');

function toggle(e) {
	e.preventDefault();
	var el = e.target;
	var mode = el.dataset.toggle;
	var toggleClass = el.dataset.toggleClass;
	var tar = el.parentNode;
	if (mode == 'page') {
		tar = page;
	} 
	
	tar.classList.toggle(toggleClass);
}

var toggles = document.querySelectorAll('.toggle');

toggles.forEach(function(el){
	el.addEventListener('click', toggle);
});