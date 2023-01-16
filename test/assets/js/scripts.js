const header = () => {
  const header = document.getElementById('header');
  const btnHeader = document.getElementById('btnHeader');

  btnHeader.addEventListener('click', (e) => {
    e.preventDefault();
    header.classList.toggle('active');
  });
};

const init = () => {
  header();
};

window.addEventListener('DOMContentLoaded', init);
