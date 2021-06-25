/*
 * Generic Object.clone and Object.extend
 * Si hace falta más adelante podemos añadir estructuras más sofisticadas para proporcionar herencia o lo que necesitemos,
 * pero estas dos son básicas para construir esas otras cosas.
 */

Object.extend = function (object) {
    var length = arguments.length;
    var reference;
    var member;
    for (var i = 1; i < length; i++) {
        reference = arguments[i];

        for (member in reference) {
            if (reference.hasOwnProperty(member)) {
                object[member] = reference[member];
            }
        }
    }
    return object;
};

Object.clone = function (object) {
    var cloned;
    switch (true) {
        case object instanceof Array:
            cloned = [];
            for (var i = object.length; i--;) {
                if (object[i] instanceof Object) {
                    cloned[i] = Object.clone(object[i]);
                } else {
                    cloned[i] = object[i];
                }
            }
            break;
        case object instanceof Function:
            cloned = object;
            break;
        case object instanceof Date:
            cloned = new Date(+object);
            break;
        default:
            cloned = {};
            for (var key in object) {
                if (object[key] instanceof Object) {
                    cloned[key] = Object.clone(object[key]);
                } else {
                    cloned[key] = object[key];
                }
            }
            break;
    }
    return cloned;
};
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1);
        var fToBind = this;
        var fNOP = function () { };
        var fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

/* rgsanchez: autoresize de textarea */
(function () {
    if ($("#comment-wrapper").is(":visible")) {
        var $autoResize = $("textarea[data-autoresize]");
        if ($autoResize && $autoResize.length > 0 && $.fn.autosize) {
            $autoResize.autosize({ append: '' });
            document.body.offsetWidth; // force a reflow before the class gets applied
            $autoResize.addClass('textarea-transition');
        }
    }

})();


var modules = window.modules || {};

modules.utils = modules.utils || (function () {
    // funciones privadas auxiliares
    function parseProperties(fileText, store) {
        var lines = fileText.replace(/#.*?$/gm, '').split(/[\r\n]+/g);
        for (var i = 0, l = lines.length; i < l; i++) {
            var line = lines[i];
            var pieces = line.match(/^\s*(\S*)\s*=\s*(.*?)\s*$/);
            if (pieces && pieces.length == 3) {
                store[pieces[1]] = pieces[2];
            } else {
                if (line !== '') { console && console.warn('Probably invalid line: ', line); }
            }
        }
    }

    function getLang() {
        var lang = '';
        if ($('html').attr('lang')) {
            lang = '_' + $('html').attr('lang');
        } else if (window.djConfig) {
            if (window.djConfig.languageDefault) lang = '_' + window.djConfig.languageDefault;
        } else if ($('html').attr('class')) {
            var clases = $('html').attr('class').split(" ");
            for (var i = 0, l = clases.length; i < l; i++) {
                if (clases[i].length == 2) lang = '_' + clases[i];
                break;
            }
        }
        if (!lang || lang === '' || '_es,_it,_pt,_ca,_en,_fr,_de'.indexOf(lang) === -1) lang = '_es';
        return lang;
    }

    function markTouchDeviceAndUnbind(e) {
        modules.utils.isTouchDevice = true;
        $(document).trigger('touchDeviceDetected');
        $(document).off('touchstart', markTouchDeviceAndUnbind);
    }

    function firstMouseMoveCaptured(e) {
        if (modules.utils.isTouchDevice) $(document).trigger('touchDeviceDetected');
        $(document).off('mousemove', firstMouseMoveCaptured);
    }

    $(document).on('touchstart', markTouchDeviceAndUnbind);
    $(document).on('mousemove', firstMouseMoveCaptured);

    // names of lenguaje files loaded, to avoid load the same files more than one time.
    var lenguageFilesLoaded = [];


    // Método para contar los caracteres restantes en un textarea
    function textareaLengthCounter($textarea, $counterEl) {
        if (!$textarea.is('textarea')) {
            throw new TypeError('[data-chars-counter] attribute only can be used in textarea');
        }

        var maxLength = +$textarea.attr('maxlength');
        var enteredText = $textarea.val();
        var charsCount = enteredText.length + enteredText.replace(/[^\n]/g, '').length;
        var showWhenCharLeft = +$textarea.attr('data-chars-counter-show') || 0;

        if (!!showWhenCharLeft) {
            if ((maxLength - charsCount) <= showWhenCharLeft) {
                $counterEl.html(charsCount + '/' + maxLength);
            } else {
                $counterEl.html('');
            }
        } else {
            $counterEl.html(charsCount + '/' + maxLength);
        }
    }

    var pTS = "" + (+new Date()); // meh...
   /* (function () {
        var modulesLink = $('link').filter(function (i, e) {
            return this.href.indexOf('modules.css') !== -1 && this.href.indexOf('?') !== -1;
        });
        if (modulesLink.length > 0) {
            pTS = modulesLink[0].href.split('?')[1];
        } else {
            console.error("Oh, uh, parece que alguien se ha olvidado de ponerle timestamp a modules.css...");
        }
    })();*/

    return {
        pageTimeStamp: pTS,
        isTouchDevice: false,

        // Generates a random string with a passed prefix
        generateUniqueId: function (tag) {
            return tag + Math.random().toString(36).slice(2) + "gid";
        },

        // Simple verification of Arrays
        isArray: function (obj) {
            return Array.isArray ? Array.isArray(obj) : (Object.prototype.toString.call(obj) === "[object Array]");
        },

        // pseudoArray to Array
        pseudoToArray: function (pseudo) {
            var r = [];
            for (var i = 0, l = pseudo.length; i < l; i++) r.push(pseudo[i]);
            return r;
        },

        // language files loaded will be available here
        i18n: {},

        // load one or more language files
        loadLanguageFile: function (url, callback) {
            if (!modules.utils.isArray(url)) url = [url];
            var peticiones = [];

            for (var i = 0, l = url.length; i < l; i++) {
                peticiones.push(function (file) {

                    if (lenguageFilesLoaded.indexOf(file) < 0) {

                        var lang = getLang();
                        lenguageFilesLoaded.push(file);

                        file = '/static/common/i18n/' + file + lang + '.properties?' + modules.utils.pageTimeStamp;


                        return $.ajax(file, {
                            method: 'GET',
                            dataType: 'text',
                            success: function (texto, status, xhr) {
                                parseProperties(texto, modules.utils.i18n);
                            },
                            error: function (xhr, status, err) {
                                console.warn("load failed ", status, err, file);
                            }
                        });

                    } else {
                        return $;
                    }

                }(url[i]));
            }
            if (callback) $.when.apply($, peticiones).done(callback); //.fail(callback);
        },

        makeObservable: function (subject, events) {
            events = events || [];
            subject.getEvents = function () {
                return events;
            };

            subject.firesEvent = function (eventName) {
                return events.join().indexOf(eventName) != -1;
            };

            subject.on = function (eventName, callback, context) {
                this.observers = this.observers || {};
                eventName = eventName.split(" ");

                for (var i = 0, l = eventName.length; i < l; i++) {
                    this.observers[eventName[i]] = this.observers[eventName[i]] || [];
                    this.observers[eventName[i]].push({ callback: callback, context: context || null });
                }

                return subject;
            };

            subject.off = function (eventName, callback, context) {
                if (this.observers) { //throw new Error('One false move, baby, suddenly everything´s ruined');
                    eventName = eventName.split(" ");
                    for (var i = 0, l = eventName.length; i < l; i++) {
                        if (this.observers[eventName[i]]) {
                            for (var j = 0, m = this.observers[eventName[i]].length; j < m; j++) {
                                if (this.observers[eventName[i]][j].context == context && this.observers[eventName[i]][j].callback.toString() == callback.toString()) {
                                    this.observers[eventName[i]].splice(j, 1);
                                    break;
                                }
                            }
                        }
                    }

                    return subject;
                }
            };

            subject.trigger = function (eventName) {
                var params = [].slice.call(arguments, 1);
                // this is a potential breaker ;p
                if (modules.utils.isArray(params[0])) params = params[0];
                if (this.observers && this.observers[eventName]) {
                    for (var i = 0, l = this.observers[eventName].length; i < l; i++) {
                        setTimeout((function (observer) {
                            return function () {
                                observer.callback.apply(observer.context, params);
                            };
                        })(this.observers[eventName][i]), 10);
                    }
                }
            };

            subject.triggerSync = function (eventName) {
                var params = [].slice.call(arguments, 1);
                if (modules.utils.isArray(params[0])) params = params[0];
                if (this.observers && this.observers[eventName]) {
                    for (var i = 0, l = this.observers[eventName].length; i < l; i++) {
                        this.observers[eventName][i].callback.apply(this.observers[eventName][i].context, params);
                    }
                }
            };
        },


        // make function fn execute only after t milliseconds of being called
        // subsequent calls re-set the delay and fn only gets called once
        // example:
        // var g = debounce(f, 20);
        // g() is called at 0 4 8 12 16 20 24 60 70 120
        // original f will only be called at: 44 90 140
        debounce: function (fn, t, ctx) {
            var timer;
            return function () {
                clearTimeout(timer);
                var args = arguments;
                timer = setTimeout(function () {
                    fn.apply(ctx, args);
                }, t);
            };
        },

        // make function fn execute at maximum once every t milliseconds,
        // no matter how many times it's called. subsequent calls queue up
        // another call if none is queued. example:
        // var g = throttle(f, 20);
        // g() is called at 0 4 8 12 16 20 24
        // original f will only be called at: 0 20 40
        throttle: function (fn, t, ctx) {
            t || (t = 250);
            var last, timer;
            return function () {
                var now = +new Date(),
				args = arguments;
                if (last && now < last + t) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        last = now;
                        fn.apply(ctx, args);
                    }, t);
                } else {
                    last = now;
                    fn.apply(ctx, args);
                }
            };
        },

        stripHTML: function (str) {
            if (typeof str !== "undefined") {
                return str.toString().replace(/<\S[^><]*>/g, "");
            } else {
                throw Error("[utils.stripHTML]: String can´t be undefined");
            }
        },

        formatAsThousands: function (value) {
            if (typeof value !== "undefined") {
                while (value.length > 1 && (value.charAt(0) === '0' && value.charAt(1) !== ',')) value = value.substring(1);
                var fullstr;
                if (value.indexOf(',') !== -1) {
                    fullstr = value.replace(/\./g, '').replace(/,/, '.');
                    if (fullstr.length - fullstr.indexOf('.') > 3) {
                        fullstr = fullstr.substring(0, fullstr.indexOf('.') + 3);
                    }
                } else if (value.indexOf('.') !== value.lastIndexOf('.')) {
                    fullstr = value.replace(/\./g, '');
                } else if ((value.indexOf('.') !== -1) && (value.length - value.lastIndexOf('.') > 3)) {
                    fullstr = value.replace(/\./g, '');
                    //fullstr = value.substring(0,value.length -1);
                } else {
                    fullstr = value;
                }
                fullstr = fullstr.split('.');
                var str = fullstr[0];
                var cCadena = str.replace(/\D/g, "");
                var cReturnValue = '';
                var j = 0;
                var i = cCadena.length;

                for (i; i > 0; i--) {
                    if (((j % 3) === 0) && (j !== 0)) {
                        cReturnValue = '.' + cReturnValue;
                    }
                    j++;
                    cReturnValue = cCadena.substring(i - 1, i) + cReturnValue;
                }

                if (fullstr.length > 1) {
                    cReturnValue += ',' + fullstr[1].replace(/\D/g, '');
                }
                if (cReturnValue.charAt(0) === ',') cReturnValue = '0' + cReturnValue;
                return cReturnValue;
            } else {
                throw Error("[utils.formatAsThousands]: String can´t be undefined");
            }
        },

        loadingByEl: (function () {
            return {
                show: function (layer, opt) {

                    if (!layer || !$(layer).length) {
                        throw new TypeError(layer + '" is not defined or does not exist in dom.');
                    }

                    var blockLayer = opt.blockLayer;
                    var fixed = opt.fixed;
                    var iconStyle = opt.iconStyle, styleInLine = [];

                    if (blockLayer) {
                        $(layer).addClass('loadingEl').append('<div class="loadingRemove blockLayer"></div>');
                    }

                    if (typeof iconStyle === 'object' && !$.isEmptyObject(iconStyle)) {
                        for (var a in iconStyle) {
                            styleInLine.push(a + ':' + iconStyle[a]);
                        }
                    }

                    var appendElement = function () {
                        $(layer).addClass('loadingEl').append('<div class="loadingRemove loading" ' + ((fixed === true) ? 'style="position:fixed"' : '') + '><span class="icon" ' + (styleInLine.length ? 'style=" ' + styleInLine.join('; ') + ' "' : '') + '></span></div>');
                    }

                    //callback
                    $.when(appendElement()).then(function () {
                        $('.loading', layer).css({ 'margin-left': '-' + $('.icon', layer).width() / 2 + 'px', 'margin-top': '-' + $('.icon', layer).height() / 2 + 'px' });
                    });
                },
                hide: function (layer) {
                    $(layer).removeClass('loadingEl').find('.loadingRemove').remove();
                }
            };
        })(),

        textLimiter: function (text, characterLimit, points) {
            var parsedText = text.trim();
            var parsedCharacterLimit = +characterLimit;
            var strPoints = points ? '...' : '.';

            if (!parsedCharacterLimit) {
                throw new ReferenceError('CharacterLimit cannot be empty.');
            }

            if (parsedText.length > parsedCharacterLimit) {
                return parsedText.substring(0, parsedCharacterLimit) + strPoints;
            } else {
                return parsedText;
            }
        },

        //serialize form to object
        serializeObject: function ($form) {
            var o = {};
            var a = $form.serializeArray();

            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },

        // REFACTOR!!
        getMedia: function () {
            if (matchMedia(config.mediaMobile).matches) {
                return 'MOBILE';
            } else if (matchMedia(config.mediaTablet).matches) {
                return 'TABLET';
            } else if (matchMedia(config.mediaDesktop).matches) {
                return 'DESKTOP';
            } else {
                return 'MOBILE';
            }
        },

        toggleContainers: function (containers) {
            var elemsHide = containers.toHide;
            var elemsShow = containers.toShow;

            if (elemsHide.length > 0) {
                // hide
                $.each(elemsHide, function (i, val) {
                    $(val).addClass('d-none').hide();
                });
            }

            if (elemsShow.length > 0) {
                // show
                $.each(elemsShow, function (i, val) {
                    $(val).removeClass('d-none').show();
                });
            }
        },

        hasBeenDone: function (elem) {
            var $elem = $(elem);
            if ($elem.data('hasBeenDone')) return true;
            $elem.data('hasBeenDone', true);
            return false;
        },

        letDoAgain: function (elem) {
            $(elem).data('hasBeenDone', false);
        },


        /* Aplica un contandor de caracteres sobre los <textarea> que tengan el atributo "data-chars-counter"
		 * - Se autoejecuta iniciando así los contadores de los <textarea> que estén en la página
		 * - Se autodevuelve para guardarse y así poder llamarse desde cualquier script
		 * - Se puede llamar pasando como parámetro un <textarea> específico, si no, se ejecuta sobre todos los que encuentre
		 *
		 * Como nodo hermano debe ir un tag con atributo "data-chars-counter-left" para mostrar los caracteres que quedan por rellenar
		 *  - Si se quiere que el contador sólo aparezca superado un número de caracteres hay que insertar tal número en el <textarea> con el atributo "data-chars-counter-show"
		 *
		 * Dependencias:
		 * - textareaLengthCounter
		 */
        setTextareaCharsCounter: (function fn($textareaEl) {
            var $textarea = $textareaEl ? $textareaEl : $('[data-chars-counter]');
            var $counterEl = $textareaEl ? $textareaEl.parent().find('[data-chars-counter-left]') : $('[data-chars-counter-left]');

            $textarea.each(function (i, item) {
                textareaLengthCounter($textarea.eq(i), $counterEl.eq(i));

                $(this).off('keyup').on('keyup', function () {
                    textareaLengthCounter($textarea.eq(i), $counterEl.eq(i));
                });
            });

            return fn;
        }()),

        removePlaceholderOnFocus: (function fn($inputEl) {

            var $input = $inputEl ? $inputEl : $('textarea[placeholder], input[placeholder]');

            $input.each(function () {
                var $el = $(this);

                $el.data('placeholder', $el.attr('placeholder'));

                $el.on('focus', function () {
                    $(this).removeAttr('placeholder');
                });

                $el.on('blur', function () {
                    var $this = $(this);
                    $this.attr('placeholder', $this.data('placeholder'));
                });

            });

            return fn;

        }())

    };
})();


