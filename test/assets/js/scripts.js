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

const modal = () => {
  const modal = document.querySelector('[data-modal-wrapper]');
  if (modal) {
    const modalOpens = document.querySelectorAll('[data-modal-btn-open]');
    const modalClose = document.querySelectorAll('[data-modal-btn-close]');
    const modalItems = modal.querySelectorAll('[data-modal-window]');

    const obgListItems = {};
    modalItems.forEach((item) => {
      obgListItems[item.dataset.modalWindow] = item;
    });

    let nowOpenModal = null;

    const closeOllModal = () => {
      document.body.style.overflow = 'auto';
      for (let key in obgListItems) {
        obgListItems[key].classList.remove('active');
      }
    };
    const closeModal = () => {
      modal.classList.remove('active');
      nowOpenModal = null;
      closeOllModal();
    };

    const openModal = (identefier) => {
      if (nowOpenModal === null) {
        nowOpenModal = identefier;
        obgListItems[identefier].classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else if (nowOpenModal !== identefier) {
        closeOllModal();
        nowOpenModal = identefier;
        obgListItems[identefier].classList.add('active');
        document.body.style.overflow = 'hidden';
      } else if (nowOpenModal === identefier) {
        closeModal();
      }
    };

    modalOpens.forEach((btn) => {
      const identefier = btn.dataset.modalBtnOpen;
      btn.addEventListener('click', (e) => {
        openModal(identefier);
      });
    });

    modalClose.forEach((btn) => {
      btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
      e.target === modal && closeModal();
    });
  }
};

const init = () => {
  header();
  sliders();
  modal();
};

window.addEventListener('DOMContentLoaded', init);
