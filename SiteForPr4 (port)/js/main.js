
    const parllax = document.querySelector(".headbox");

    window.addEventListener("scroll", function() {
        let offset = window.pageYOffset;
        parllax.style.backgroundPositionY = offset * 0.3 + 'px';
    });

    const paraaallax = document.querySelector(".services");

    window.addEventListener("scroll", function() {
        let offset = window.pageYOffset;
        var pixtop = $(".headbox").height() + $(".project").height();
        paraaallax.style.backgroundPositionY = (offset * 0.3) - (pixtop * 0.3) + 'px';
    });



$(document).ready(function(){
	$('#tooptip').on("click", function(){
		$("span").attr("tooltip", "Успешно скопировано");
	})
})

var clipboard = new ClipboardJS('.email');

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });