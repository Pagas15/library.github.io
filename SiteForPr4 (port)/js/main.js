
$(document).ready(function(){
    // let loading = document.querySelector(".loading__text");
    // let letters = loading.textContent.split("");
    // loading.textContent = "";
    // letters.forEach((letter, i) => {
    //   let span = document.createElement("span");
    //   span.textContent = letter;
    //   span.style.animationDelay = `${i / 10}s`;
    //   loading.append(span);
    // });
    // setTimeout(function(){ 
    //     $('.loading').addClass('loading-hide')
    //     setTimeout(function(){ 
    //         $('.loading').hide(); 
    //     }, 500);
    // }, 2000);
})
function slowScroll (id) {
  var offset = 0;
  $('html, body').animate ({
    scrollTop: $(id).offset ().top - offset
  }, 500)
  return false
}