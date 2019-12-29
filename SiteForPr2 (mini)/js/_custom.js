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
  });
  