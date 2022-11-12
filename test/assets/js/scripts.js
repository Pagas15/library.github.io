const header = () => {
  const header = document.querySelector('.header');
  if (header) {
    const btn = header.querySelector('.header__btn');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (header.classList.contains('active')) {
        header.classList.remove('active');
        document.body.style.overflow = 'auto';
      } else {
        header.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
};

const sliders = () => {
  const replaceSize = (nameClass) => {
    const slider1 = document.querySelector(nameClass);
    if (slider1) {
      const wrapper = slider1.querySelector('.swiperWrapper');
      const items = slider1.querySelectorAll('.swiperSlide');
      wrapper.classList.add('swiper-wrapper');
      wrapper.classList.remove('swiperWrapper');
      items.forEach((item) => {
        item.classList.add('swiper-slide');
        item.classList.remove('swiperSlide');
      });
    }
  };
  if (window.innerWidth < 767) {
    replaceSize('.swiper1');
    replaceSize('.swiper2');
    replaceSize('.swiper3');

    const swiper1 = new Swiper('.swiper1', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination1',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
    });
    const swiper2 = new Swiper('.swiper2', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination2',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
    });
    const swiper3 = new Swiper('.swiper3', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 30,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination3',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
    });
  }
};

const init = () => {
  header();
  sliders();
};

window.addEventListener('DOMContentLoaded', init);
