// Was made by Pagas15
// My site - https://pagas15.github.io/SiteForPr4%20(port)/

$(document).ready(function(){
    $('#ol-btn-download').on("click", function(){
        $('body').css('overflow','hidden')
        $('#ol-pop-up').fadeIn(300)
    })
    
    $('#ol-close').on("click", function(){
        $('#ol-pop-up').fadeOut(300);
        $('body').css('overflow','auto')
    })
})