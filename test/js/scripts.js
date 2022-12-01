const basicScrollTop = function () {
  let btnTop = document.querySelectorAll('[data-scroll]');

  const topscrollTo = () => {
    if (window.scrollY != 0) {
      setTimeout(function () {
        window.scrollTo(0, window.scrollY - 30);
        topscrollTo();
      }, 1);
    }
  };
  btnTop.forEach((item) => {
    item.addEventListener('click', () => {
      topscrollTo();
    });
  });
};

const init = () => {
  basicScrollTop();
};

window.addEventListener('DOMContentLoaded', init);
