const CONSTS = {
  api: {
    arbi: 'https://home.scaletrk.com/signup/affiliate',
    autor: 'https://home.scaletrk.com/signup/advertiser',
  },
};

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
    return { closeOllModal, closeModal, openModal };
  }
};

const request = async ({ url, method = 'GET', data = null, callBack }) => {
  try {
    const headers = {};
    let body;
    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    const result = await response.json();
    if (callBack) {
      callBack(result);
    } else {
      return result;
    }
  } catch (event) {
    console.warn('Error: ', event.message);
  }
};

const inputsAndForms = (modelMethod) => {
  const inputMasks2 = {
    email: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
    password: /^[A-Za-z0-9_-].{8,}$/,
    telegram: /^[A-Za-z0-9_-]{3,16}$/,
  };

  const createError = (text = 'Please Enter Valid') => {
    let errorMassage = document.createElement('p');
    errorMassage.className = 'txt25x29 cRed textError';
    errorMassage.innerHTML = text;
    return errorMassage;
  };

  const checkOut = (wrapper, condition, massage) => {
    const havesError = !!wrapper.lastChild?.classList?.contains('textError');
    if (condition) {
      if (havesError) {
        wrapper.removeChild(wrapper.lastChild);
      }
    } else {
      if (!havesError) {
        wrapper.appendChild(massage);
      }
    }
  };

  const checkInput = {
    name: (input, subr = false) => {
      const wrapper = input.closest('.inputBox');
      const errorMassage = createError('Как минимум 2 символов');
      const check = () => checkOut(wrapper, input.value.length >= 2, errorMassage);
      if (subr) {
        input.addEventListener('input', check);
      } else {
        check();
        return input.value.length >= 2;
      }
    },
    email: (input, subr = false) => {
      const wrapper = input.closest('.inputBox');
      const errorMassage = createError('Укажите валидную электронную почту');

      const check = () => checkOut(wrapper, !!input.value.match(inputMasks2.email), errorMassage);
      if (subr) {
        input.addEventListener('input', check);
      } else {
        check();
        return !!input.value.match(inputMasks2.email);
      }
    },
    telegram: (input, subr = false) => {
      const wrapper = input.closest('.inputBox');
      const errorMassage = createError('Пожалуйста укажите правильный логин');

      const check = () =>
        checkOut(wrapper, !!input.value.match(inputMasks2.telegram), errorMassage);

      if (subr) {
        input.addEventListener('input', check);
      } else {
        check();
        return !!input.value.match(inputMasks2.telegram);
      }
    },
    password: (input, subr = false) => {
      const wrapper = input.closest('.inputBox');
      const errorMassage = createError('Минимум 8 символов, латиницей');
      const check = () =>
        checkOut(wrapper, !!input.value.match(inputMasks2.password), errorMassage);

      if (subr) {
        input.addEventListener('input', check);
      } else {
        check();
        return !!input.value.match(inputMasks2.password);
      }
    },
    passwordRepeat: (input, subr = false) => {
      const wrapper = input.closest('.inputBox');
      const errorMassage = createError('Пароли должны совпадать');
      const mainPass = document.querySelector(`[data-main-pass="${input.dataset.repeatPass}"]`);

      const check = () => checkOut(wrapper, mainPass.value === input.value, errorMassage);
      if (subr) {
        input.addEventListener('input', check);
      } else {
        check();
        return mainPass.value === input.value;
      }
    },
    text: () => true,
  };

  const inputsOll = () => {
    document.querySelectorAll('input').forEach((inputItem) => {
      const type = inputItem.name;
      checkInput[type](inputItem, true);
    });
  };

  const inputsForms = (methodPopups) => {
    const successfully = (result) => {
      if (result?.status === 'success') {
        methodPopups.openModal('successfully');
      } else {
        methodPopups.openModal('error');
      }
    };
    const form1 = () => {
      const btn = document.querySelector('[data-form-btn="arbit1"]');
      const ollFields = document.querySelectorAll(`[data-form-input="arbit1"]`);
      const btnClick = () => {
        let isNormal = [];
        ollFields.forEach((input) => {
          isNormal.push({
            key: input.name,
            value: input.value,
            isValid: checkInput[input.name](input),
          });
        });
        if (isNormal.every((item) => true === item.isValid)) {
          const data = {
            email: isNormal.find((item) => item.key === 'email').value,
            firstname: isNormal.find((item) => item.key === 'name').value,
            password: isNormal.find((item) => item.key === 'password').value,
            password_repeat: isNormal.find((item) => item.key === 'passwordRepeat').value,
            contacts: [
              {
                type: 5,
                account: isNormal.find((item) => item.key === 'telegram').value,
                title: 'Telegram',
              },
            ],
          };
          request({
            url: CONSTS.api.arbi,
            method: 'POST',
            data,
            callBack: (result) => {
              successfully(result);
            },
          });
        }
      };
      btn.addEventListener('click', btnClick);
    };
    const form2 = () => {
      const btn = document.querySelector('[data-form-btn="autor1"]');
      const btnPre = document.querySelector('[data-form-btn-pre="autor1"]');
      const ollFields = document.querySelectorAll(`[data-form-input="autor1"]`);
      const baseClick = (callBack, elseCallBack = () => {}) => {
        let isNormal = [];
        ollFields.forEach((input) => {
          isNormal.push({
            key: input.name,
            value: input.value,
            isValid: checkInput[input.name](input),
          });
        });
        if (isNormal.every((item) => true === item.isValid)) {
          callBack(isNormal);
        } else {
          elseCallBack();
        }
      };
      const btnClickPre = () => {
        baseClick(() => {
          methodPopups.openModal('autor2');
        });
      };
      const btnClick = () => {
        baseClick(
          (isNormal) => {
            const data = {
              email: isNormal.find((item) => item.key === 'email').value,
              firstname: isNormal.find((item) => item.key === 'name').value,
              password: isNormal.find((item) => item.key === 'password').value,
              password_repeat: isNormal.find((item) => item.key === 'passwordRepeat').value,
              contacts: [
                {
                  type: 5,
                  account: isNormal.find((item) => item.key === 'telegram').value,
                  title: 'Telegram',
                },
              ],
              notes: isNormal.find((item) => item.key === 'text').value,
            };
            request({
              url: CONSTS.api.autor,
              method: 'POST',
              data,
              callBack: (result) => {
                successfully(result);
              },
            });
          },
          () => {
            methodPopups.openModal('autor1');
          },
        );
      };
      btnPre.addEventListener('click', btnClickPre);
      btn.addEventListener('click', btnClick);
    };

    form1();
    form2();
  };

  inputsOll();
  inputsForms(modelMethod);
};

const init = () => {
  const modelMethod = modal();
  header();
  sliders();
  inputsAndForms(modelMethod);
};

window.addEventListener('DOMContentLoaded', init);
