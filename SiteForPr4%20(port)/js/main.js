
const listProjects = document.querySelector('.project-wrap'),
      headbox = document.querySelector('.headbox'),
      services = document.querySelector('.services'),
      social = document.querySelector('.social'),
      projectList = document.querySelector('.project'),
      navBarLink = document.querySelector('.nav-bar-link');




function paralax(){
  window.addEventListener("scroll", function(){
    let offset = window.pageYOffset;
    headbox.style.backgroundPositionY = offset * 0.3 + "px";
  });
  window.addEventListener("scroll", function() {
      let offset = window.pageYOffset;
      var pixtop = headbox.offsetHeight + projectList.offsetHeight;
      services.style.backgroundPositionY = (offset * 0.3) - (pixtop * 0.3) + 'px';
  });
}


function copyMail(){
  const tooptip = document.getElementById("tooptip");
  
  tooptip.addEventListener("click", function(){
    tooptip.setAttribute("tooltip", "Успешно скопировано");
  })
}

function clipBoards(){
    
    var clipboard = new ClipboardJS('.email');

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });

}

const getData = async function(url) {
    const response = await fetch(url);
    if (!response.ok){
      throw new Error(`Ошибка по адресу ${url},
        статус ошибки  ${response.status}!`)
    }
    return await response.json();
};

// function linkList(goots){
//   console.log("1")
//   const {link} = goots;
//   const card = document.createElement('li');
//   card.insertAdjacentHTML('beforeend', `
//   ${link}
//   `)
  
//   navBarLink.insertAdjacentElement('beforeend', card);
// }

function createProjectCard(goots){
    const { dispate, image, link, name, description, technology} = goots;
    const card = document.createElement('div');
    card.className = ('project-wrap__item');
    card.dispate = dispate;
    if (card.dispate == 'y'){
        card.insertAdjacentHTML('beforeend', `
            <div class="project-wrap__img-box">
                <div class="project-wrap__img">
                    <img src="${image}" alt="${name}">
                </div>
                <a href="${link}"></a>
            </div>
            <div class="project-wrap__text-box">
                <h2>${name}</h2>
                <p class="project-wrap__center-text">${description}</p>
                <p class="project-wrap__date">${technology}</p>
                <a class="btn-view" href="${link}">Посмотреть</a>
            </div>
        `);
    } 
    listProjects.insertAdjacentElement('beforeend', card);
}

// func

function init(){
  // getData('./db/links.json').then(function(data){
  //   data.forEach(linkList)
  // });
  getData('./db/project.json').then(function(data){
    data.forEach(createProjectCard)
  });

  paralax();
  clipBoards();
  copyMail();
}


init()