// // Was made by Pagas15
// // My site - https://pagas15.github.io/SiteForPr4%20(port)/


(function($) {

	var listSlide = '#cubeTransition>div.slide-wrap';
	var length = $(listSlide).length,
		current = 1,
		next = 1,
		outClass, inClass, onGoing = false;
	$(`${listSlide}:eq(0)`).addClass('visible');

	const listSlideMas = document.querySelectorAll(listSlide);

	lengthWh = length;
	if (length > 0){
		let i = 0;
		while(i < length){
			i += 1;
			listSlideMas[i - 1].querySelectorAll('.slide')[0].classList.add("visible");
		}
	};

  const sumNumSlide = (num, listNum, maxNum) => {
    if ((listNum == 0) && (num == -1)){
			listNum = maxNum - 1;
      return listNum 
    }
    if ((listNum == (maxNum - 1)) && (num == +1)){
      listNum = 0;
      return listNum 
		}
		listNum = listNum + num;
    return listNum;
  } 

	function openIndex(i) {
		if (!onGoing && next != i) {
			onGoing = true;
			next = i
			outClass = current > i ? 'rotateCubeBottomOut' : 'rotateCubeTopOut'
			inClass = current > i ? 'rotateCubeBottomIn' : 'rotateCubeTopIn';
			show()
		}
	}

	const listLink = () => {
		const listLinks = document.querySelectorAll('[linkSlideClick]');
		listLinks.forEach(item => {
			item.addEventListener('click', () => {
				openIndex(Number(item.getAttribute('linkSlideClick')));
			})
		})
	}

	listLink()

	const rightSlider = (numRight) => {
		let lengthRight = $('.slide-wrap.visible>.slide'),
				lengthRightLength = lengthRight.length,
				numRightList = 0;
		
		while (numRightList < lengthRightLength) {
			if (lengthRight[numRightList].classList.contains('visible')) {
				break
			} else {
				numRightList += 1;
			}
		}
		let itemRight = lengthRight[sumNumSlide(numRight, numRightList, lengthRightLength)];
		itemRight.classList.add('visible');
		lengthRight[numRightList].classList.add(outClass);
		itemRight.classList.add(inClass);	
		
		animationOut(current - 1)
		setTimeout(() => {
			lengthRight[numRightList].classList.remove('visible');
		}, 500)
		setTimeout(function() {
			
		lengthRight[numRightList].classList.remove(outClass);
		itemRight.classList.remove(inClass);	
			// $(`${listSlide}:eq(`  + (current - 1) + ')').removeClass(outClass);
			// $(`${listSlide}:eq(`  + (next - 1) + ')').removeClass(inClass);
			animationIn(sumNumSlide(numRight, numRightList, lengthRightLength) - 1)
			// current = next;
			onGoing = false;
		}, 600)
	}

	function trans(direction) {
		if (!onGoing) {
			if (direction == 'left') {
				outClass = 'rotateCubeLeftOut';
				inClass = 'rotateCubeLeftIn';
				rightSlider(-1)
			}
			if (direction == 'right') {
				outClass = 'rotateCubeRightOut';
				inClass = 'rotateCubeRightIn';
				rightSlider(+1)
			}
			if (direction == 'up') {
				onGoing = true;
				next = current > 1 ? current - 1 : length;
				outClass = 'rotateCubeBottomOut';
				inClass = 'rotateCubeBottomIn';
				show();
			} 
			if (direction == 'down') {
				onGoing = true;
				next = current < length ? current + 1 : 1;
				outClass = 'rotateCubeTopOut';
				inClass = 'rotateCubeTopIn';
				show();
			}
		}
	}

	function show() {
		$(`${listSlide}:eq(` + (next - 1) + ')').addClass('visible');
		$(`${listSlide}:eq(`  + (current - 1) + ')').addClass(outClass);
		$(`${listSlide}:eq(`  + (next - 1) + ')').addClass(inClass);	
		
		animationOut(current - 1)
			setTimeout(function() {
			$(`${listSlide}:eq(`  + (current - 1) + ')').removeClass('visible');
		}, 500)
		setTimeout(function() {
			
			$(`${listSlide}:eq(`  + (current - 1) + ')').removeClass(outClass);
			$(`${listSlide}:eq(`  + (next - 1) + ')').removeClass(inClass);
			animationIn(next - 1)
			current = next;
			onGoing = false;
		}, 600)
	}

	$(document).ready(

	function() {
    
//for scroll by mouse or MAC track pad
      var indicator = new WheelIndicator({
      callback: function(e){   
          if (e.direction == 'down') {
            trans('down')
          } else {
            trans('up')
          }
      }
    });
    indicator.getOption('preventMouse'); // true
//update this instead of mousewheel.js
//in issuses#2 a friend want to use this plugin on MAC track pad

		$(document).keydown(function(e) {
			if (e.keyCode == 38 || e && e.keyCode == 37) {
				trans('up')
			}
			if (e.keyCode == 39 || e && e.keyCode == 40) {
				trans('down')
			}

		});

		$('.arrows').on('click', function(e) {
			if(e.target.classList.contains("arrow__top")){
				trans('up');
			};
			if(e.target.classList.contains("arrow__bottom")){
				trans('down');
			};
			if(e.target.classList.contains("arrow__left")){
				trans('left');
			};
			if(e.target.classList.contains("arrow__right")){
				trans('right');
			};
		});

		$(document).swipe({
			swipe: function(event, direction, distance, duration, fingerCount) {
				if (direction == "up") {
					trans('down')
				} else if (direction == "down") {
					trans('up')
				}
			}
		});


	});
})(jQuery);