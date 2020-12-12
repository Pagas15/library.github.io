
$(document).ready(function(){
  if($(window).width() > 992)
  $(window).scroll(function() {
    $('.header').toggleClass('scroll', $(this).scrollTop() > 20);
  });

  $('.menu__item--hamburger').click(function(){
    if(!$('.menu__item--hamburger').hasClass('active')){
      $('.menu__item--hamburger').addClass('active')
      document.querySelector("#navbar").style.width = "100%";
      document.querySelectorAll(".open")[0].style.opacity = 0;
    }
    else{
      $('.menu__item--hamburger').removeClass('active')
      document.querySelector("#navbar").style.width = "0";
      document.querySelectorAll(".open")[0].style.opacity = 1;
    }
  })
  



  $('.review-slider').slick({
    autoplay: true,
    appendArrows: '.review-wrap',
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        },
      }
    ]
  })

  $('.photo-slider').slick({
    slidesToShow: 1,
    appendArrows: '.photo-arrows',
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
    responsive: [
      {
        breakpoint: 3024,
          settings: {
            centerMode: true,
            centerPadding: '500px',
          },
        },
        {
        breakpoint: 2024,
        settings: {
          centerMode: true,
          centerPadding: '300px',
        },
      },
      {
        breakpoint: 1800,
        settings: {
          centerMode: true,
          centerPadding: '200px',
        },
      },
      {
        breakpoint: 1600,
        settings: {
          centerMode: true,
          centerPadding: '120px',
        },
      },
      {
        breakpoint: 1400,
        settings: {
          centerMode: true,
          centerPadding: '100px',
        },
      },
      {
        
        breakpoint: 1300,
        settings: {
          centerMode: false,
          centerPadding: '0',
        },
      },
      
    ]
  })
  
})
function initMap() {
  var pos = {lat: 50.450464, lng: 30.522128}, // Координаты центра карты
    

  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 1,
    disableDefaultUI: true,
    scrollwheel: false,
  });
  marker = new google.maps.Marker({
    position: pos,
    map: map,
    animation: google.maps.Animation.DROP,
  });
}
google.maps.event.addDomListener(window, 'load', initMap)