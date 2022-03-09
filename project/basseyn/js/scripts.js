// Was made by Pagas15
// My site - https://pagas15.github.io


const bodytopPad = () => {
  const header = document.getElementById('header');
  if(header){
    document.body.style.paddingTop = header.clientHeight + 'px';
  }
};

const hoverBtns = list => {
  const headWrapHov = document.getElementById('hoverHeader');

  
  const close = (block, btn) => {
    headWrapHov.classList.remove('active');
    block.classList.remove('active');
    btn.classList.remove('hover');
  }

  const open = (block, btn) => {
    headWrapHov.classList.add('active');
    block.classList.add('active');
    btn.classList.add('hover');
  }

  const hoverBtn = (btn, block) => {
    let [btnHov, blockHov] = [document.querySelector('#'+btn),document.querySelector('#'+block)];
    let interval = null;

    const hovIn = () => {
      clearTimeout(interval);
      open(blockHov, btnHov);
    }
    const hovOut = () => {
      interval = setTimeout(() => {
        close(blockHov, btnHov);
      }, 200);
    }

    btnHov.addEventListener('mouseover', hovIn);
    btnHov.addEventListener('mouseout', hovOut);
    blockHov.addEventListener('mouseover', hovIn);
    blockHov.addEventListener('mouseout', hovOut);
  }

  headWrapHov && list.forEach(item => {
    hoverBtn(item[0], item[1])
  })
  
};

const cataloge = (doit) => {
  const headWrapHov = document.getElementById('hoverHeader');
  const btn = document.getElementById('btnCategory');
  const block = document.getElementById('btnCategory');
  const bgBlock = document.querySelector('.header__bg');
  const categ = document.querySelector('#category');
  const ifer = document.querySelector('.category__tabs');
  if(btn){
    if(!doit){
      btn.addEventListener('click', () => {
        headWrapHov.classList.add('active');
        block.classList.add('active');
        categ.classList.add('active');
      })
      bgBlock.addEventListener('click', () => {
        if(ifer.classList.contains('active')){
          ifer.classList.remove('active');
        } else if (categ.classList.contains('active')) {
          headWrapHov.classList.remove('active');
          block.classList.remove('active');
          categ.classList.remove('active');
        }
      })
    } else if(doit === 'close') {
      headWrapHov.classList.remove('active');
      block.classList.remove('active');
      categ.classList.remove('active');
    }
  }

}

const tabsMenu = () => {
  const btnsTabs = document.querySelectorAll('[data-tab-btn]');
  const blockTabs = document.querySelectorAll('[data-tab-item]');
  
  const clearTabs = () => {
    btnsTabs.forEach(item => {
      item.classList.remove('active')
    })
    blockTabs.forEach(item => {
      item.classList.remove('active')
    })
  }

  const openTab = (btn, block) => {
    clearTabs();
    btn.classList.add('active');
    block.classList.add('active');
    if(window.innerWidth < 992){
      document.querySelector('.category__tabs').classList.add('active');
    }
  }

  if(btnsTabs){
    btnsTabs.forEach(item => {
      const blockTab = document.querySelector(`[data-tab-item="${item.dataset.tabBtn}"]`);
      if(blockTab){
        item.addEventListener('click', ()=>{
          openTab(item, blockTab);
        })
      }
    })
  }
}

const tabs = () => {
  
  const btnsTabs = document.querySelectorAll('[data-tabs-btn]');
  const blockTabs = document.querySelectorAll('[data-tabs-tab]');
  const clearTabs = () => {
    btnsTabs.forEach(item => {
      item.classList.remove('active')
    })
    blockTabs.forEach(item => {
      item.classList.remove('active')
    })
  }

  const openTab = (btn, block) => {
    clearTabs();
    btn.classList.add('active');
    block.classList.add('active');
  }

  if(btnsTabs){
    btnsTabs.forEach(item => {
      const blockTab = document.querySelector(`[data-tabs-tab="${item.dataset.tabsBtn}"]`);
      if(blockTab){
        item.addEventListener('click', ()=>{
          openTab(item, blockTab);
        })
      }
    })
  }
}

const siderBlocs = () => {
  const blocks = document.querySelectorAll('[data-sider-blos]');
  if(blocks){
    blocks.forEach(item => {
      const btn = item.querySelector('.cards__header');
      btn.addEventListener('click', () => {
        item.classList.toggle('active')
      })
    })
  }
}

const search = () => {
  const search = document.getElementById('search');
  const searchWrap = document.getElementById('searchWrap');
  const btnClose = searchWrap && searchWrap.querySelector('.btnClose');
  const listHider = ['#btnCategory', '#phones', '#navbar'].map(item => document.querySelector(item));
  
  if(search){
    search.addEventListener('click', () => {
      if(searchWrap.classList.contains('activeSearch')){
        // code for search
      } else {
        searchWrap.classList.add('activeSearch')
        listHider.forEach(item => item.style.display = 'none')
      }
    })
    btnClose.addEventListener('click', () => {
      searchWrap.classList.remove('activeSearch')
      listHider.forEach(item => item.style.display = '')
    })
  }
}

const menuMob = (doit) => {
  const btn = document.getElementById('menuBtn');
  const block = document.getElementById('headerContent');
  if(!doit){
    if(btn && block){
      btn.addEventListener('click', e => {
        e.preventDefault();
        btn.classList.toggle('active');
        block.classList.toggle('active');
        if(window.innerWidth < 992){
          cataloge('close');
        }
      })
    }
  } else if (doit === 'close'){
    btn.classList.remove('active');
    block.classList.togremovegle('active');
  }
}

const favorites = () => {
  document.querySelectorAll('[data-btn-favorites]').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    })
  })
}

const sideBar = () => {
  const sliders = document.querySelectorAll('[data-slider]');
  if(sliders){
    sliders.forEach(item => {
      const ollow = [item.querySelector('.sliderRow__line'), ...item.querySelectorAll('.inputBox__input')]
      noUiSlider.create(ollow[0], {
        start: [100, 5631],
        connect: true,
        range: {
            'min': 32,
            'max': 10000
        }
      })
      ollow[0].noUiSlider.on('update', function (values, handle) {
        ollow[handle + 1].value = Math.floor(values[handle]);
      });
    })
  }
}

const catal = () => {
  const btn = document.querySelector('#btnCatalog');
  if(btn){
    const left = document.querySelector('#catagLeft')
    btn.addEventListener('click', () => {
      left.classList.toggle('active');
    })
  }
}

const btnShop = (elemClick,elemList,elemClose) => {
	if(document.querySelector(elemClick)){
		document.querySelectorAll(elemClick).forEach(item=>{
			item.addEventListener('click', ()=>{
				elemList.forEach(item=>{
					document.querySelector(item).classList.toggle('active');
				});
			});
		})
		elemClose.forEach(item => {
			document.querySelector(item).addEventListener('click', ()=>{
				elemList.forEach(elem=>{
					document.querySelector(elem).classList.remove('active');
				});
			})
		});
	}
}

const setCardHeight = () => {
  const list = document.querySelectorAll('.card');
  if(list){
    list.forEach(item => {
      item.parentElement.style.minHeight = item.offsetHeight + 'px'
    })
  }
}

const init = () => {
  setTimeout(setCardHeight, 100);
  catal();
  sideBar();
  siderBlocs();
  bodytopPad();
  tabsMenu();
  tabs();
  search();
  menuMob();
  favorites();
  if(window.innerWidth > 992){
    hoverBtns([['btnCart', 'hoverCart'],['btnFavorites', 'hoverFavorites'],['btnCategory','category']]);
  } else {
    cataloge();
  }
  btnShop('#offerOrd',['#popup', '#itemCategPop'],['#popupBg', '#categClose'])
}


window.addEventListener('DOMContentLoaded', init)
