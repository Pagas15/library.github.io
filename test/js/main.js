
$(document).ready(function(){
    $('.popular-wrap__slider').slick({
        arrows: true,
        appendArrows: $('.popular-wrap__slider-menu'),
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        dots: true,
        dotsClass: 'popular-dots',
        appendDots: $('.popular-wrap__slider-dots'),
        slidesToShow: 3,
        rows: 2,
        responsive: [
            {
                breakpoint: 1120,
                setting: {
                    slidesToShow: 2,

                }
            }
        ],
    });
  
})