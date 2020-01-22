
const parllax = document.querySelector(".headbox");

window.addEventListener("scroll", function() {
	let offset = window.pageYOffset;
	parllax.style.backgroundPositionY = offset * 0.3 + 'px';
});
