const formToZero = (str) => {
  const strNew = String(str);
  return strNew.length < 2 ? '0' + strNew : strNew < 1 ? '00' : strNew;
};

const timer = () => {
  let currentTime = new Date();
  let endHour = 24;
  if (!(currentTime.getHours() + 4 < 24)) {
    endHour = 29;
  }

  const setTime = (hour, min, sec) => {
    const endTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      endHour,
    );
    const calc = () => {
      const leftTime = endTime.getTime() - new Date().getTime();
      const secunds = Math.floor((leftTime % (1000 * 60)) / 1000);
      const minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));
      const hours = Math.floor((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      sec.innerHTML = formToZero(secunds);
      min.innerHTML = formToZero(minutes);
      hour.innerHTML = formToZero(hours);
    };
    calc();
    setInterval(calc, 1000);
  };
  document.querySelectorAll('[data-timer]').forEach((timerWrap) => {
    const sec = timerWrap.querySelector('[data-timer-sec]'),
      min = timerWrap.querySelector('[data-timer-minute]'),
      hour = timerWrap.querySelector('[data-timer-hour]');

    setTime(hour, min, sec);
  });
};

const slider = () => {
  const wrapper = document.querySelector('[data-slider]');
  const slides = wrapper.querySelectorAll('[data-slider-item]');
  const ollBts = document.querySelectorAll('[data-slider-btn]');

  const postHeight = (id) => {
    if (!isNaN(id)) {
      wrapper.style.height = id + 'px';
    } else {
      wrapper.style.height =
        document.querySelector(`[data-slider-item="${id}"]`).offsetHeight + 'px';
    }
  };

  const toSlide = (key, other = false) => {
    wrapper.scrollTo({ top: 0, behavior: 'smooth' });
    let state = true;
    slides.forEach((item) => {
      if (state) {
        if (item.dataset.sliderItem === key) {
          state = !state;
          item.classList.remove('rightNone');
          item.classList.remove('leftNone');
          item.classList.add('active');
        } else {
          item.classList.remove('rightNone');
          item.classList.remove('active');
          item.classList.add('leftNone');
        }
      } else {
        item.classList.remove('leftNone');
        item.classList.remove('active');
        item.classList.add('rightNone');
      }
    });
    if (other) {
      slides.forEach((item) => {
        if (item.dataset.sliderItem === other) {
          item.classList.remove('rightNone');
          item.classList.remove('leftNone');
          item.classList.add('active');
        }
      });
    }
  };

  const btnID = (identifier) => {
    switch (identifier) {
      case 'postHeight':
        postHeight('slide1');
        toSlide('slide1');
        break;
      case 'slide2':
      case 'slide3':
      case 'slide4':
      case 'slide5':
      case 'slide6':
      case 'slide7':
      case 'slide8':
        toSlide(identifier, 'slide1');
        break;
      case 'slide9':
        toSlide(identifier);
        postHeight(454);
        break;
      case 'slide10':
        toSlide(identifier);
        postHeight(454);
        break;
      case 'slide11':
        setTimeout(() => {
          toSlide(identifier, 'slide10');
          postHeight(556);
        }, 500);
        break;
      case 'slide12':
        toSlide(identifier);
        postHeight(454);
        break;
      case 'slide13':
        setTimeout(() => {
          toSlide(identifier, 'slide12');
          postHeight(546);
        }, 500);
        break;
      default:
        toSlide(identifier);
        break;
    }
  };

  ollBts.forEach((btn) => {
    const identifier = btn.dataset.sliderBtn;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btnID(identifier);
    });
  });

  return { toSlide, btnID };
};

const init = () => {
  timer();
  const sliderMet = slider();
  sliderMet.btnID('slide1');
};

window.addEventListener('DOMContentLoaded', init);
