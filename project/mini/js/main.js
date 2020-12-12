const scrolling = () => {
  const element = document.documentElement,
        body = document.body;

  
  const calcScroll = () => {
    const listHrefAnchor = document.querySelectorAll("a[href^='#']");
    let listHrefAnchorList = [];
    listHrefAnchor.forEach(item => {
      if (!(item.getAttribute('href').length <= 1)) {
        listHrefAnchorList.push(item);
      }
    })
    listHrefAnchorList.forEach(item => {
      item.addEventListener('click', function(event){
        let scrollTop = Math.round(body.scrollTop || element.scrollTop);

        if (this.hash !== "") {
          event.preventDefault();
          let hashElement = document.querySelector(this.hash),
              hashElementTop = 0;

          while (hashElement.offsetParent) {
            hashElementTop += hashElement.offsetTop;
            hashElement = hashElement.offsetParent;
          }
          
          hashElementTop = Math.round(hashElementTop);
          smoothScroll(scrollTop, hashElementTop, this.hash);

        }
      });
    });
  }

  const smoothScroll = (from, to, hash) => {
    let timeInterval = 1,
        prevScrollTop,
        speed;

    if (to > from) {
      speed = 30;
    } else {
      speed = -30;
    }

    let move = setInterval(function(){
      let scrollTop = Math.round(body.scrollTop || element.scrollTop);

      if (
        prevScrollTop === scrollTop || 
        (to > from && scrollTop >= to) ||
        (to < from && scrollTop <=to) 
      ) {
        clearInterval(move);
        history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
      } else {
        body.scrollTop += speed;
        element.scrollTop += speed;
        prevScrollTop = scrollTop;  
      }
    }, timeInterval);
  };
  calcScroll();
};


$(function(){
  $('.menu-togle').click(function(){
    $(this).toggleClass('active')
    $('.menu').slideToggle(400)
  })
  $('.tabs a').click(function(){
		$(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
		$(this).parent().siblings().removeClass('active');
		var id = $(this).attr('href');
		$(id).removeClass('hide');
		$(this).parent().addClass('active');
		return false
	});

  $('.banner-slider, .testimonial-slider').slick({
		arrows: false,
		dots: true,
  });
  
  $('.portfolio-slider').slick({
		dots: true,
		appendArrows: '.portfolio-slider__buttons',
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
		responsive: [
	    {
	      breakpoint: 767,
	      settings: {
	      	dots: false,
	      }
	    }
	  ] 
	});
  
  $nav_tabs_slider = $('.nav-tab-list');
	settings = {
		slidesToShow: 1,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
		infinite: false,
  }
  
  
  $nav_tabs_slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
		$(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
		$(this).find('.slick-current').siblings().removeClass('active');
		var id = $(this).find('.slick-current a').attr('href');
		$(id).removeClass('hide');
		$(this).find('.slick-current').addClass('active');
		return false
  })
  
  
  $(window).on('resize load', function(){
    if($(window).width() > 767) {
      if($nav_tabs_slider.hasClass('slick-initialized')) {
        $nav_tabs_slider.slick('unslick')
      }
      return
    }
    if(!$nav_tabs_slider.hasClass('slick-initialized')) {
      return $nav_tabs_slider.slick(settings)
    }
  })
  scrolling()
});


function initMap() {
  var pos = {lat: -37.806006, lng: 144.961291}, // Координаты центра карты
    

  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 16,
    disableDefaultUI: true,
    scrollwheel: false,
  });
  marker = new google.maps.Marker({
    position: pos,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: 'https://i.postimg.cc/bvFGdZKs/marker.png',
  });
}
google.maps.event.addDomListener(window, 'load', initMap)
