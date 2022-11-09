const passwordInput = () => {
  document.querySelectorAll('[data-password-input]').forEach((item) => {
    const input = item.querySelector('input');
    const btn = item.querySelector('.inputBox__iconPassword');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (input.type === 'password') {
        input.type = 'text';
      } else if (input.type === 'text') {
        input.type = 'password';
      }
    });
  });
};

const init = () => {
  passwordInput();
};

window.addEventListener('DOMContentLoaded', init);
