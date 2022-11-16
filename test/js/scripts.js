const selectInp = (params) => {
  const DEFAULTS = {
    wrapper: 'data-select-wrapper',
    mainBtn: 'data-select-btn',
    mainBtnContent: 'data-select-cnt',
    input: 'data-select-input',
    variantsList: 'data-select-list',
    variantBtn: 'data-select-variant',
    variantContent: 'data-select-cont',
    variantIcon: 'data-select-icon',
    activeClass: 'active',
  };

  const objSet = { ...DEFAULTS, ...params };

  const selectInput = document.querySelectorAll(`[${objSet.wrapper}]`);

  if (selectInput) {
    selectInput.forEach((itemSelect) => {
      const mainBtn = itemSelect.querySelector(`[${objSet.mainBtn}]`);
      const mainBtnContent = itemSelect.querySelector(`[${objSet.mainBtnContent}]`);
      const input = itemSelect.querySelector(`[${objSet.input}]`);
      const variantsList = itemSelect.querySelector(`[${objSet.variantsList}]`);
      const variantBtn = variantsList.querySelectorAll(`[${objSet.variantBtn}]`);
      const varIcons = document.querySelectorAll(`[${objSet.variantIcon}]`);

      const closeSelect = () => {
        itemSelect.classList.remove(objSet.activeClass);
        window.removeEventListener('click', windowClosest);
      };

      const windowClosest = (event) => {
        if (!event.target.closest(`[${objSet.wrapper}]`)) {
          closeSelect();
        }
      };
      const openSelect = () => {
        itemSelect.classList.add(objSet.activeClass);
        window.addEventListener('click', windowClosest);
      };

      const openClose = () => {
        itemSelect.classList.contains(objSet.activeClass) ? closeSelect() : openSelect();
      };

      const selectIcon = (key) => {
        varIcons.forEach((item) => {
          if (item.dataset.selectIcon === key) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      };

      const selectVariant = (kay, content) => {
        input.value = kay;
        mainBtnContent.innerHTML = content;
        selectIcon(kay);
        closeSelect();
      };

      mainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openClose();
      });

      variantBtn.forEach((btn) => {
        const variantBtn = btn.dataset.selectVariant;
        const variantBtnCnt = btn.querySelector(`[${objSet.variantContent}]`).innerHTML;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          selectVariant(variantBtn, variantBtnCnt);
        });
      });
    });
  }
};

const slider = () => {
  const wrapper = document.querySelector('[data-slider]');
  const slides = wrapper.querySelectorAll('[data-slider-item]');
  const ollBts = document.querySelectorAll('[data-slider-btn]');

  const postHeight = () => {
    wrapper.style.height = document.documentElement.clientHeight - 74 + 'px';
  };
  postHeight();

  const themeBody = (id) => {
    if (id === 'slide1' || id === 'slide2') {
      document.body.classList.remove('red');
    } else {
      document.body.classList.add('red');
    }
  };

  const toSlide = (key) => {
    wrapper.scrollTo({ top: 0, behavior: 'smooth' });
    let state = true;
    slides.forEach((item) => {
      if (state) {
        if (item.dataset.sliderItem === key) {
          state = !state;
          item.classList.remove('rightNone');
          item.classList.remove('leftNone');
          item.classList.add('active');
          themeBody(item.dataset.sliderItem);
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
  };

  const btnID = (identifier) => {
    switch (identifier) {
      case 'slide10':
        toSlide('slide10');
        setTimeout(() => {
          toSlide('slide11');
        }, 3000);
        setTimeout(() => {
          toSlide('slide12');
        }, 6000);
        break;
      case 'slide14':
        setTimeout(() => {
          toSlide('slide14');
        }, 300);
        break;
      case 'slide16':
        setTimeout(() => {
          toSlide('slide16');
        }, 300);
        setTimeout(() => {
          toSlide('slide17');
        }, 1500);
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

  return { toSlide };
};

const init = () => {
  selectInp();
  const sliderMet = slider();
  sliderMet.toSlide('slide1');
  setTimeout(() => {
    sliderMet.toSlide('slide2');
  }, 1000);
};

window.addEventListener('DOMContentLoaded', init);
