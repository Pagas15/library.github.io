const createSlider = (indifier) => {
  const wrapper = document.querySelector(indifier);
  if (wrapper) {
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
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
};
const formToZero = (str) => {
  const strNew = String(str);
  return strNew.length < 2 ? '0' + strNew : strNew < 1 ? '00' : strNew;
};

const timer = () => {
  let currentTime = new Date();
  const setTime = (hour, min, sec, day) => {
    const endTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes() + 10,
    );
    const calc = () => {
      const leftTime = endTime.getTime() - new Date().getTime();
      const secunds = Math.floor((leftTime % 60000) / 1000);
      const minutes = Math.floor((leftTime % 3600000) / 60000);
      const hours = Math.floor((leftTime % 86400000) / 3600000);
      const days = Math.floor((leftTime % 86400000) / 86400000);
      sec.innerHTML = formToZero(secunds);
      min.innerHTML = formToZero(minutes);
      hour.innerHTML = formToZero(hours);
      day.innerHTML = formToZero(days);
    };
    calc();
    setInterval(calc, 1000);
  };
  document.querySelectorAll('[data-timer]').forEach((timerWrap) => {
    const sec = timerWrap.querySelector('[data-timer-sec]'),
      min = timerWrap.querySelector('[data-timer-minute]'),
      hour = timerWrap.querySelector('[data-timer-hour]'),
      day = timerWrap.querySelector('[data-timer-day]');

    setTime(hour, min, sec, day);
  });
};

const verifi = () => {
  const verf = document.querySelector('[data-verification-wrapper]');
  if (verf) {
    const verfText = verf.querySelector('[data-verification-text]');
    const verfMore = verf.querySelector('[data-verification-more]');
    const verfLoad = verf.querySelector('[data-verification-load]');

    const setText = (text) => {
      verfText.innerHTML = text || '';
    };
    const setLoad = (pervent) => {
      verfLoad.style.width = pervent ? pervent + '%' : '0%';
    };
    setText();
    setLoad();

    setTimeout(() => {
      setText('Обработа аненты');
      setLoad(10);
    }, 500);
    setTimeout(() => {
      setText('Проверка предыдущих записей');
      setLoad(20);
    }, 2500);
    setTimeout(() => {
      setText('Записи обнаружены ');
      verfText.classList.add('cGreen');
      setLoad(30);
    }, 5000);
    setTimeout(() => {
      setText('Проверяю для вас наличие iPhone 14 Pro');
      verfText.classList.remove('cGreen');
      setLoad(50);
    }, 7500);
    setTimeout(() => {
      setText('Успешно проверено');
      verfText.classList.add('cGreen');
      setLoad(60);
    }, 10000);
    setTimeout(() => {
      setText('Выполнение автоматической верификации человека');
      verfText.classList.remove('cGreen');
      setLoad(90);
    }, 12500);
    setTimeout(() => {
      setText('Автоматически верифицировать человека не получилось');
      verfText.classList.add('cRed');
      setLoad(90);
    }, 15000);
    setTimeout(() => {
      setText('Требуеться ручная верификация');
      verfText.classList.remove('cRed');
      setLoad(90);
      verfMore.classList.add('active');
    }, 17500);
  }
};

const sliders = () => {
  createSlider('.review__video--slider');
  createSlider('.review__photo--slider');
};

const init = () => {
  if (window.innerWidth < 980) {
    sliders();
  }
  timer();
  verifi();
};

window.addEventListener('DOMContentLoaded', init);
