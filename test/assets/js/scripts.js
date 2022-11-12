const header = () => {
  const header = document.querySelector('.header');
  if (header) {
    const btn = header.querySelector('.header__btn');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      header.classList.toggle('active');
    });
  }
};

const sliders = () => {
  const settingSliders = {
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
  };
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

    const swiper1 = new Swiper('.swiper1', settingSliders);
    const swiper2 = new Swiper('.swiper2', settingSliders);
    const swiper3 = new Swiper('.swiper3', settingSliders);
  }
};

const init = () => {
  header();
  sliders();
};

window.addEventListener('DOMContentLoaded', init);
