
const passwordInput = () => {
	const btns = document.querySelectorAll('[data-password-btn]');
	if(btns){
		const funk = (item, btn) => {
			if(item.type == "password"){
				item.type = "text";
				btn.classList.add('active');
			} else {
				item.type = "password"
				btn.classList.remove('active');
			}
		}
		btns.forEach(btn => {
			const item = document.querySelector(`[data-passord-input="${btn.dataset.passwordBtn}"]`);
			if(item){
				btn.addEventListener('click', e => {
					e.preventDefault();
					funk(item, btn);
				})
			}
		})
	}
}

let swiper = null;
const slider = () => {
	if(window.innerWidth < 998){
		swiper = new Swiper('.swiper', {
			mode:'horizontal',
			loop: true,
			slidesPerView: 'auto',
			centeredSlides: true,
			initialSlide: 0,
		});
	}
}

const modal = () => {
	const modal = document.querySelector('[data-modal-wrapper]');
	if(modal){
		const modalOpens = document.querySelectorAll('[data-modal-btn-open]');
		const modalClose = document.querySelectorAll('[data-modal-btn-close]');
		const modalItems = modal.querySelectorAll('[data-modal-window]');

		const obgListItems = {}
		modalItems.forEach(item => {
			obgListItems[item.dataset.modalWindow] = item;
		})

		let nowOpenModal = null;

		const closeOllModal = () => {
			for(let key in obgListItems) {
				obgListItems[key].classList.remove('active')
			}
		}
		const closeModal = () => {
			modal.classList.remove('active')
			nowOpenModal = null;
			closeOllModal();
		}

		const openModal = (identefier) => {
			if(nowOpenModal === null){
				nowOpenModal = identefier;
				obgListItems[identefier].classList.add('active');
				modal.classList.add('active')
			} else if (nowOpenModal !== identefier) {
				closeOllModal();
				nowOpenModal = identefier;
				obgListItems[identefier].classList.add('active');
			} else if (nowOpenModal === identefier) {
				closeModal()
			}
		}

		modalOpens.forEach(btn => {
			const identefier = btn.dataset.modalBtnOpen;
			btn.addEventListener('click', () => {
				openModal(identefier)
			})
		})

		modalClose.forEach(btn => {
			btn.addEventListener('click', closeModal);
		});

		modalItems.forEach(item => {
			item.addEventListener('click',(e) => {
				(e.target === item) && closeModal();
			})
		})
		
		modal.addEventListener('click',(e) => {
			(e.target === modal) && closeModal();
		})
	};

};

const selectInp = (params) => {
	const DEFAULTS = {
		wrapper: 'data-select-wrapper',
		mainBtn: 'data-select-btn',
		mainBtnContent: 'data-select-cnt',
		input: 'data-select-input',
		variantsList: 'data-select-list',
		variantBtn: 'data-select-variant',
		variantContent: 'data-select-cont',
		activeClass: 'active'
	};
	
	const objSet = {...DEFAULTS, ...params};

	const selectInput = document.querySelectorAll(`[${objSet.wrapper}]`);

	if(selectInput){
		selectInput.forEach(itemSelect => {
			const mainBtn = itemSelect.querySelector(`[${objSet.mainBtn}]`);
			const mainBtnContent = itemSelect.querySelector(`[${objSet.mainBtnContent}]`);
			const input = itemSelect.querySelector(`[${objSet.input}]`);
			const variantsList = itemSelect.querySelector(`[${objSet.variantsList}]`);
			const variantBtn = variantsList.querySelectorAll(`[${objSet.variantBtn}]`);

			const closeSelect = () => {
				itemSelect.classList.remove(objSet.activeClass);
				window.removeEventListener('click', windowClosest)
			}

			const windowClosest = event => {
				if(!(event.target.closest(`[${objSet.wrapper}]`))){
					closeSelect();
				}
			}
			const openSelect = () => {
				itemSelect.classList.add(objSet.activeClass);
				window.addEventListener('click', windowClosest)
			}

			const openClose = () => {
				itemSelect.classList.contains(objSet.activeClass) ? closeSelect() :openSelect();
			}

			const selectVariant = (kay, content) => {
				input.value = kay;
				mainBtnContent.innerHTML = content;
				closeSelect();
			}

			mainBtn.addEventListener('click', e => {
				e.preventDefault();
				openClose();
			})

			variantBtn.forEach(btn => {
				const variantBtn = btn.dataset.selectVariant;
				const variantBtnCnt = btn.querySelector(`[${objSet.variantContent}]`).innerHTML;
				btn.addEventListener('click', e => {
					e.preventDefault();
					selectVariant(variantBtn, variantBtnCnt);
				})
			})

		})
	}
}

const clickToSlide = () => {
	const OBJECT_KEYS = {
		main: 0,
		"settings": 4,
		"payment": 3,
		"registration": 2,
		"login": 1,
	}
	const list = document.querySelectorAll('[data-modal-btn-open]');
	if(list && window.innerWidth < 998){
		list.forEach(item => {
			const key = item.dataset.modalBtnOpen;
			item.addEventListener('click', () => {
				console.log(swiper.activeIndex);
				console.log(key);
				swiper.slideTo(OBJECT_KEYS[key])
			})
		})
	}
}

const loader = () => {
	setTimeout(() => {
		document.querySelector('#louder').classList.remove('active');
	}, 1000);
}

const init = () => {
	passwordInput();
	selectInp();
	slider();
	clickToSlide();
	loader();
	if(window.innerWidth > 998){
		modal()
	}
}


window.addEventListener('DOMContentLoaded', init)