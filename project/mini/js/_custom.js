
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
	$('.tabs a').click(function(){
	  $('.tab-cont').addClass('hide');
	  $(this).parents().siblings().removeClass('active');
	  var id = $(this).attr('href');
	  $(id).removeClass('hide');
	  $(this).parent().addClass('active');
	  return false
	});
  
	$('.banner-slider').slick({
	  arrows: false,
	  dots: true,
	})
	
	scrolling()
});


  