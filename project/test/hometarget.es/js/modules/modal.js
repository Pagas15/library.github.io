var modules = window.modules || {};

/*
 * modal: a simple container for modal dialogs
 *
 * usage:
 *     var dialog = new modules.modal({
 *         title:'confirma o muere',
 *         content:'confirma que quieres borrar la b&uacute;squeda',
 *         buttons:'...'
 *     });
 * showCloseButton - true by default, can be overridden if you don't want to show the close button
 * title, content, buttons: the 3 (optional) parts that make up the content of the dialog
 *
 * requires: utils/utils.js & template/t.js
 */
modules.modal = modules.modal || (function () {

    var modalSizeClass = {
        'S': 'size-s',
        'M': 'size-m',
        'L': 'size-l'
    };

    // Private stuff:
    var defaults = {
        showCloseButton: true,
        title: null,
        content: '',
        buttons: '',
        autoCancelClass: 'cancelar',
        autoAcceptClass: 'aceptar',
        destroyOnHide: false,
        hideOnAutoAccept: true,
        hideOnAutoCancel: true,
        scrollable: false,
        size: 'M',
        role: ''
    };

    //var dialogTemplate = '<div class="modal" id="{{=id}}" data-role="{{=role}}">' +
	//	'	<div class="modal-wrapper">' +
	//	'		<div class="modal-box {{=sizeClass}}">' +
	//	'			<div class="modal-blocker"></div>' +
	//	'			{{title}}<div class="modal-header"><h2>{{=title}}</h2>{{showCloseButton}}<a class="icon-close icon-close" href="#"></a>{{/showCloseButton}}</div>{{/title}}' +
	//	'			<div class="modal-content">{{=content}}</div>' +
	//	'			{{buttons}}<div class="modal-buttons">{{=buttons}}</div>{{/buttons}}' +
	//	'		</div>' +
	//	'	</div>' +
	//	'</div>';
    var dialogTemplate = '<div class="modal" id="{{=id}}" data-role="{{=role}}">' +
		'	<div class="modal-wrapper">' +
		'		<div class="modal-box {{=sizeClass}}">' +
		'			<div class="modal-blocker"></div>' +
		'			{{showCloseButton}}<a class="icon-close icon-close" href="#"></a>{{/showCloseButton}}' +
		'			{{title}}<div class="modal-header"><h2>{{=title}}</h2></div>{{/title}}' +
//		'			{{title}}<div class="modal-header"><h2>{{=title}}</h2>{{showCloseButton}}<a class="icon-close icon-close" href="#"></a>{{/showCloseButton}}</div>{{/title}}' +
		'			<div class="modal-content">{{=content}}</div>' +
		'			{{buttons}}<div class="modal-buttons">{{=buttons}}</div>{{/buttons}}' +
		'		</div>' +
		'	</div>' +
		'</div>';
    var template = new t(dialogTemplate);

    var fader = $('<div class="modal-fader"></div>');


    // Public stuff:
    // constructor
    function create(options) {
        var self = this;
        this.blocked = false;

        this.options = Object.extend(Object.clone(defaults), options);
        this.options.id = modules.utils.generateUniqueId('dialog');
        this.options.sizeClass = modalSizeClass[this.options.size];

        this.scroll = 0;

        if (document.getElementById("dynamicDialogContainer") == null) {
            var c = document.createElement("div");
            c.id = "dynamicDialogContainer";
            document.body.appendChild(c);
        }

        $('#dynamicDialogContainer').append($(template.render(this.options)));
        this.modalEl = document.getElementById(this.options.id);


        fader.addClass("d-none");

        if ($(".modal-fader").length <= 0)
            $("body").append(fader);

        if (this.options.showCloseButton) {
            this.modalEl.querySelector('.icon-close').addEventListener("click", (function (e) {
                this.trigger("cancel");
                e.preventDefault();
                this.hide();
            }).bind(this));

            $(this.modalEl).on("click", function (e) {
                var target = $(e.target);
                if ((target.hasClass("modal-wrapper") || target.hasClass("modal")) && !self.blocked) {
                    e.preventDefault();
                    self.hide();
                    self.trigger("cancel");
                }
            });

        }

        if (this.options.autoCancelClass) {
            if (this.modalEl.querySelectorAll('.' + this.options.autoCancelClass)) {
                modules.utils.pseudoToArray(this.modalEl.querySelectorAll('.' + this.options.autoCancelClass)).forEach(function (item) {
                    item.addEventListener("click", (function (e) {
                        this.trigger("cancel");
                        e.preventDefault();
                        if (this.options.hideOnAutoCancel) this.hide();
                    }).bind(self));
                });
            }
        }

        if (this.options.autoAcceptClass) {
            if (this.modalEl.querySelectorAll('.' + this.options.autoAcceptClass)) {
                modules.utils.pseudoToArray(this.modalEl.querySelectorAll('.' + this.options.autoAcceptClass)).forEach(function (item) {
                    item.addEventListener("click", (function (e) {
                        this.trigger("accept");
                        e.preventDefault();
                        if (this.options.hideOnAutoAccept) this.hide();
                    }).bind(self));
                });
            }
        }

        modules.utils.makeObservable(this, ['cancel', 'accept', 'open', 'close']);

        /*
		* AutosuscripciÃ³n de eventos open y close para evitar el robo del evento click
		* del ipad con los controles nativos del video.
		*/
        this.on("open", function () {
            $("video").prop("controls", false);
        });

        this.on("close", function () {
            $("video").prop("controls", true);
        });

        return this;
    }

    create.prototype.modalEl = null;

    create.prototype.show = function () {
        // Store scroll position to restore it on close. (Restore scroll position on mobile and tablet)
        this.scroll = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;

        this.trigger('open');
        $(window).trigger('modal:open', this);

        this.modalEl.style.display = 'block';

        if (document.querySelector("html").className.indexOf("ie8") < 0) {
            $("body, html").addClass("modal-opened");
        }

        $("body").css({ "top": -this.scroll });

        if (typeof window.config !== "undefined") {
            if (modules.utils.getMedia() === "MOBILE") {
                setTimeout(function () {
                    window.scrollTo(0, 0);
                }, 5);
            }
        }

        fader.removeClass("d-none");

        if (this.options.scrollable) {
            var self = this;
            var bodyHeight = window.innerHeight || document.documentElement.clientWidth || document.body.clientWidth;
            var $modalWrapper = $(this.modalEl.querySelector(".modal-wrapper"));
            var $modalContent = $(this.modalEl.querySelector(".modal-content"));           
            var modalContentScrollTop, lastY;
            var modalHeight = $modalWrapper.height();
            var marginTopModalFocused = (bodyHeight / 2) - (modalHeight / 2);

            $(this.modalEl).addClass('focused');
            $(this.modalEl).find('.modal-content, .modal-buttons').addClass('clearfix');

            var resizeModal = function (_modalHeight, _marTopModalFocused) {
                modalHeight = _modalHeight || modalHeight;
                marginTopModalFocused = _marTopModalFocused || marginTopModalFocused;

                if (modalHeight > bodyHeight - 100) {
                    $(self.modalEl).addClass('scrollable');

                    $modalWrapper.css({
                        'margin-top': 10
                    });
                    $modalContent.css({
                        'height': (window.innerHeight - 170)
                    });
               } else {
                    $modalWrapper.css({
                        'margin-top': marginTopModalFocused,
                    });
                }
            }

            $(window).on('resize', function () {                
                resizeModal();
            });

            $modalWrapper.on({
                touchmove: function (e) {
                    var currentY = e.originalEvent.touches[0].clientY;
                    modalContentScrollTop = $modalContent.scrollTop();

                    if ($(e.target).parents('.modal-box').length) {
                        return;
                    }

                    if (currentY > lastY) {
                        $modalContent.scrollTop(modalContentScrollTop -= 10);
                    } else if (currentY < lastY) {
                        $modalContent.scrollTop(modalContentScrollTop += 10);
                    }
                    lastY = currentY;
                },
                mousewheel: function (e) {
                    modalContentScrollTop = $modalContent.scrollTop();

                    if ($(e.target).parents('.modal-box').length) {
                        return;
                    }

                    if (e.originalEvent.wheelDelta < 0) {
                        $modalContent.scrollTop(modalContentScrollTop += 100);
                    } else {
                        $modalContent.scrollTop(modalContentScrollTop -= 100);
                    }
                }
            });

            resizeModal($modalWrapper.height(), (bodyHeight / 2) - ($modalWrapper.height() / 2));
        }
    };

    create.prototype.hide = function () {
        this.trigger('close');
        $(window).trigger('modal:close', this);
        this.modalEl.style.display = '';
        if (this.options.destroyOnHide) {
            this.destroy();
        } else {
            if ($(".modal:visible", '#dynamicDialogContainer').length <= 0) {
                $("body, html").removeClass("modal-opened");
                fader.addClass("d-none");
                window.scrollTo(0, this.scroll);
            }
        }
        $(window).trigger('modal:closed', this);
    };

    create.prototype.destroy = function () {
        this.trigger('close');
        if (this.modalEl.parentNode != null)
            this.modalEl.parentNode.removeChild(this.modalEl);

        if ($(".modal:visible", '#dynamicDialogContainer').length <= 0) {
            $("body, html").removeClass("modal-opened");
            fader.remove();
            window.scrollTo(0, this.scroll);
        }
    };

    create.prototype.setContent = function (content) {
        if (this.modalEl.querySelector(".modal-content")) {
            if (Object.prototype.toString.call(content) === '[object String]') {
                this.modalEl.querySelector(".modal-content").innerHTML = content;
            } else {
                $(this.modalEl.querySelector(".modal-content")).html(content);
            }
        }
    };

    create.prototype.setTitle = function (title) {
        if (this.modalEl.querySelector(".modal-header h2")) {
            if (Object.prototype.toString.call(title) === '[object String]') {
                this.modalEl.querySelector(".modal-header h2").innerHTML = title;
            } else {
                $(this.modalEl.querySelector(".modal-header h2")).html(title);
            }
        }
    };

    create.prototype.block = function () {
        $('.modal-blocker', this.modalEl).addClass('block');
        this.isBlocked = true;
    };
    create.prototype.unblock = function () {
        $('.modal-blocker', this.modalEl).removeClass('block');
        this.isBlocked = false;
    };


    return create;

})();

