
    settings = {
        arrows: true,
        appendArrows: $('.popular-wrap__slider-menu'),
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        dots: true,
        dotsClass: 'popular-dots',
        appendDots: $('.popular-wrap__slider-dots'),
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '15px',
                },
            },
            {
                breakpoint: 374,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '0px',
                },
            }
        ]
    }

    if($(window).width() > 779) {
        settings['rows'] = '2'
    };
    
    $('.popular-wrap__slider').slick(settings);
  