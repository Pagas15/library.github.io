"use strict"


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


const images = (workSectionName, imgClassName) => {
  const imgPopup = document.createElement('div'),
        workSection = document.querySelector(workSectionName),
        bigImage = document.createElement('img');

  imgPopup.classList.add('popup');
  workSection.appendChild(imgPopup);

  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';
  imgPopup.style.display = 'none';


  imgPopup.appendChild(bigImage);

  workSection.addEventListener('click', (e) => {
    e.preventDefault();

    let target = e.target;

    if(target && target.classList.contains(imgClassName)) {
      setTimeout(() => {
        imgPopup.style.display = "flex";
        imgPopup.classList.remove('hideSection');
        imgPopup.classList.add('showItem');
      }, 0)
      
      const path = target.getAttribute('src');
      bigImage.setAttribute('src', path);
    }

    if (target && target.matches('div.popup')) {
      animationHide(imgPopup, 'hideSection');
      // imgPopup.style.display = 'none'
    }
  })
};

const openWorks = (showPages) => {
  animationHide('[tab-section]', 'hideSection');
  animationShow(showPages, 'hideSection');
}

const openTabs = (event) => {
  const target = event.target,
        tabItem = target.closest('.nav-bar-head__link'),
        path = tabItem.getAttribute('name-tabs'),
        tabses = document.querySelectorAll(`.${path}`);
  let showPage = document.querySelectorAll('[tab-section=""]');
  if (path) {
    showPage = tabses;
  }
  openWorks(showPage);

}

const navBarChecked = () => {
  const navBarWraps = document.querySelectorAll('.nav-bar-head__list');
  navBarWraps.forEach(item => {
    item.addEventListener('click', openTabs)
  })
}

function onSlider(){
  $('.interior-slider').slick({
    slidesToShow: 1,
    appendArrows: '.interior-slider__arrows',
    prevArrow: '<a type="button" class="interior-slider__arrow interior-slider__arrow-left"><img src="img/elements/ArrowLeft.svg" alt="Arrow left"></a>',
		nextArrow: '<a type="button" class="interior-slider__arrow interior-slider__arrow-right"><img src="img/elements/ArrowRight.svg" alt="Arrow right"></a>',
  })
};

const contactsTab = () => {
  document.querySelector('#contacts-tab').classList.add('active');
}

const mobMenu = () => {
  const btn = document.querySelector('#nav-bar-phone__head-btn'),
        btnBlock = document.querySelector('#nav-bar-phone'),
        contTab = document.querySelector('#contacts-tab');
        
  btn.addEventListener('click', () => {
    btnBlock.classList.toggle('active');
    contTab.classList.remove('active');
  })
}

const sections = (nameSec) => {
  animationHide('.wrapper', 'hideSections');
  animationShow(nameSec, 'hideSections');
  animationShow('.contacts', 'hideSections');
  document.querySelector('#nav-bar-phone__head-btn').click();
};


const animationShow = (blockItem, nameHideClass) => {
  let selector;
  if (typeof(blockItem) === 'object') { 
    if (Array.isArray(blockItem)){
      setTimeout(() => {
        blockItem.style.display = "";
        blockItem.classList.remove(nameHideClass);
        blockItem.classList.add('showItem');
      }, 300)
      return
    } else {
      selector = blockItem;
    }
  } else {
    selector = document.querySelectorAll(blockItem)
  }
  selector.forEach(item => {
    setTimeout(() => {
      item.style.display = "";
      item.classList.remove(nameHideClass);
      item.classList.add('showItem');
    }, 300)
  })
}

const animationHide = (blockItem, nameHideClass) => {
  let selector;
  if (typeof(blockItem) === 'object') {
    if (!Array.isArray(blockItem)){
      blockItem.classList.remove('showItem');
      blockItem.classList.add(nameHideClass);
      setTimeout(() => {
        blockItem.style.display = 'none';
      }, 300)
      return
    } else {
      selector = blockItem;
    }
  } else {
    selector = document.querySelectorAll(blockItem)
  }
  selector.forEach(item => {
    item.classList.remove('showItem');
    item.classList.add(nameHideClass);
    setTimeout(() => {
      item.style.display = 'none';
    }, 300)
  })
}


$(document).ready(function(){
  if (window.innerWidth < 992) {
    sections('.head-box')
  }

  if (window.innerWidth > 992) {
    navBarChecked();
  }

  if($(window).width() > 992){
    $('.interior-slider').slick({
      slidesToShow: 1,
      appendArrows: '.interior-slider__arrows',
      prevArrow: '<a type="button" class="interior-slider__arrow interior-slider__arrow-left"><img src="img/elements/ArrowLeft.svg" alt="Arrow left"></a>',
      nextArrow: '<a type="button" class="interior-slider__arrow interior-slider__arrow-right"><img src="img/elements/ArrowRight.svg" alt="Arrow right"></a>',
    })
  }
  
  $('.tabs a').click(function(){
    $('.tab-cont').addClass('hide');
    $(this).parents().siblings().removeClass('active');
    var id = $(this).attr('href');
    $(id).removeClass('hide');
    $(this).parent().addClass('active');
    return false
  })

  mobMenu();
  images('.work', 'nav-tab-img__img');
  images('.interior-slider', 'interior-slider__img-img');
  scrolling();
})
