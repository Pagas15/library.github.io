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
};

window.addEventListener('DOMContentLoaded', init);
