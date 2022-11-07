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
};

window.addEventListener('DOMContentLoaded', init);
