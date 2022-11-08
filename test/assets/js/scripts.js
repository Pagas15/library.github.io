const tabs = (params) => {
  const DEFAULTS = {
    btns: 'data-tabs-btn',
    blocks: 'data-tabs-block',
    activeClass: 'active',
  };

  const objSet = { ...DEFAULTS, ...params };

  const btns = document.querySelectorAll(`[${objSet.btns}]`),
    tabs = document.querySelectorAll(`[${objSet.blocks}]`);

  if (tabs && btns) {
    const libsTabs = {};
    tabs.forEach((tab) => {
      libsTabs[tab.dataset.tabsBlock] = tab;
    });

    const clearOllTabs = () => {
      tabs.forEach((item) => {
        item.classList.remove(objSet.activeClass);
        setTimeout(() => {
          item.style.display = 'none';
        }, 500);
      });
      btns.forEach((item) => item.classList.remove(objSet.activeClass));
    };

    const switchTab = (identifier, btn) => {
      clearOllTabs();

      setTimeout(() => {
        libsTabs[identifier].style.display = 'block';
        libsTabs[identifier].classList.add(objSet.activeClass);
      }, 500);
      btn && btn.classList.add(objSet.activeClass);
    };

    btns.forEach((btn) => {
      const identifier = btn.dataset.tabsBtn;
      btn.addEventListener('click', () => {
        switchTab(identifier, btn);
      });
    });
  }
};

const accordion = (params) => {
  const DEFAULTS = {
    kay: null,
    btns: 'data-accardioun-btn',
    blocks: 'data-accardioun-window',
    wrapper: 'data-accardioun-wrapper',
    activeClass: 'active',
    one: true,
  };

  const objSet = { ...DEFAULTS, ...params };

  const ollAccordions = document.querySelectorAll(
    !objSet.key ? `[${objSet.wrapper}]` : `[${objSet.wrapper}="${objSet.key}"]`,
  );

  if (ollAccordions) {
    const closeCards = (array) => {
      array.forEach((cartItem) => {
        cartItem.classList.remove(objSet.activeClass);
      });
    };
    const closeCard = (card) => {
      card.classList.remove(objSet.activeClass);
    };

    ollAccordions.forEach((acardion) => {
      const kay = !objSet.key ? acardion.dataset.accardiounWrapper : objSet.key;
      const cardsList = acardion.querySelectorAll(`[${objSet.blocks}="${kay}"]`);

      cardsList.forEach((cartItem) => {
        const btn = cartItem.querySelector(`[${objSet.btns}="${kay}"]`);
        btn.addEventListener('click', () => {
          if (cartItem.classList.contains(objSet.activeClass)) {
            objSet.one ? closeCards(cardsList) : closeCard(cartItem);
          } else {
            objSet.one && closeCards(cardsList);
            cartItem.classList.add(objSet.activeClass);
          }
        });
      });
    });
  }
};

const videoControl = () => {
  const videos = document.querySelectorAll('.videoContainer');
  if (videos) {
    videos.forEach((videoWrap) => {
      const mediaControls = videoWrap.querySelector('.videoContainer__sound');
      const videoBlock = videoWrap.querySelector('.video-home');
      mediaControls.addEventListener('click', (e) => {
        e.preventDefault();
        if (mediaControls.classList.contains('active')) {
          videoBlock.muted = true;
          mediaControls.classList.remove('active');
        } else {
          videoBlock.muted = false;
          mediaControls.classList.add('active');
        }
      });
    });
  }
};

const init = () => {
  videoControl();
  tabs();
  accordion();
};

window.addEventListener('DOMContentLoaded', init);
