const createSlider = (indifier) => {
  const wrapper = document.querySelector(indifier);
  wrapper.querySelectorAll('.swiperSlide').forEach((item) => {
    item.classList.remove('swiperSlide');
    item.classList.add('swiper-slide');
  });
  const wr = document.createElement('div');
  const pagin = document.createElement('div');
  pagin.classList = 'swiper-pagination';
  wr.classList = 'swiper-wrapper';
  wr.innerHTML = wrapper.innerHTML;
  wrapper.innerHTML = '';
  wrapper.appendChild(wr);
  wrapper.appendChild(pagin);

  const swiper = new Swiper(indifier, {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
};
const sliders = () => {
  createSlider('.review__video');
  createSlider('.review__photo');
};

const init = () => {
  if (window.innerWidth < 980) {
    sliders();
  }
};

window.addEventListener('DOMContentLoaded', init);
