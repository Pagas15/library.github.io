

// Made up this site Pagas15 or Anton Klymko
// My site - https://pagas15.github.io/
// Customer is honest


function textOpacity(thisis){
    $(".address-text").toggleClass("classOpasity05");
    $(thisis).toggleClass("classOpasity1");
    let numberId = Number($(thisis).attr('id').slice(12));
    let minusid = numberId - 1;
    let plusId = numberId + 1;
    let addressText = "#address-text";
    $(addressText + minusid).toggleClass("classOpasity07");
    $(addressText + plusId).toggleClass("classOpasity07");
}

function starShadow(starId){
    $(starId).toggleClass("shadow")
}

$(document).ready(function(){
    $(".map__big-star").hover(function(){
        starShadow(this)
    })
    $(".address-text").hover(function(){
        textOpacity(this)
    })
})