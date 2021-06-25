var WEBS = WEBS || {};

WEBS.PAGINA = (function ($) {
    'use strict';

    var Strings = MI_SCRIPTS;
    Date.now = Date.now || function () { return new Date().getTime(); };
    var p_fecha = new Date().getTime();    
    var pag = {};
    var _func = {};
    var _plantilla;

    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                  ? args[number]
                  : match
                ;
            });
        };
    }

    // _func.cookies = {
    //     show: function () {
    //         $('#divCookies').show();
    //     },
    //     close: function () {
    //         var technicalCookieIsChecked = $("#chkTechnicalCookie").is(":checked");
    //         var performanceCookieIsChecked = $("#chkPerformanceCookie").is(":checked");

    //         this.setcookievalues(technicalCookieIsChecked, performanceCookieIsChecked);

    //         window.location.reload();
    //     },
    //     reject: function () {
    //         this.setcookievalues(true, false);

    //         window.location.reload();
    //     },
    //     setcookievalues: function (technicalCookieIsChecked, performanceCookieIsChecked) {
    //         $.cookie('_ac', null);
    //         $.cookie('_ac', "true", { expires: 1, path: '/' });

    //         $.cookie('_technical', technicalCookieIsChecked, { expires: 1, path: '/' });
    //         $.cookie('_performance', performanceCookieIsChecked, { expires: 1, path: '/' });
    //     }
    // };

    _func.tabs = function () {
        var $tabs = $("#tabs nav.tabs");

        $tabs.find("> a").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            var $this = $(this);
            var hash = $this.attr("href");
            if (!$(this).hasClass("active")) {

                $this
                    .siblings()
                        .removeClass("active")
                    .end()
                    .addClass("active");

                $("section.tab-item:visible").hide();
                $("section.tab-item").filter(hash).fadeIn('slow');
            }

        });

        $tabs.find(":visible:first").addClass("active");

    };
    _func.normalizar = function (string) {

        var value = string.toString();
        value = value.replace(" ", "_").replace("@", "_");

        var specialCharacters = "/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g";
        value = value.replace(specialCharacters, '');
        value = value.replace(/([âãäåæá])+/g, 'a');
        value = value.replace(/([èéêë])+/g, 'e');
        value = value.replace(/([ìíîï])+/g, 'i');
        value = value.replace(/([òóôõ])+/g, 'o');
        value = value.replace(/([ùúûü])+/g, 'u');
        value = value.replace(/([ñ])+/g, 'n');
        value = value.replace(" ", '_');
        value = value.replace("@", '_');

        return value.toLowerCase();
    };
    _func.asignarEventos = function () {
        $('#imglogo').off().on("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            document.location.href = "/default.aspx";
        });
        $('.des-destacada').off().on("click", function (event) {
            $.cookie(pag.COOKIE_SELECTED, "");
        });
        $('#pieseo').off().on("click", function (event) {
            $.cookie(pag.COOKIE_isAdsOffice, "");
        });
        $('#office').off().on("click", function (event) {
            $.cookie(pag.COOKIE_SEARCH_OFFICES, "");
        });
    };

    pag.idPublishService = "";
    pag.BlobUrl = "";
    pag.IdIdioma = 1;
    pag.plantilla = 1;

    pag.AnchoSlide = 0;
    pag.AltoSlide = 0;
    pag.Ancho = 0;
    pag.Alto = 0;
    pag.AnchoBanner = 0;
    pag.AltoBanner = 0;
    pag.AnchoLogo = 0;
    
    pag.COOKIE_SEARCH = "search_buscador_pro";
    pag.COOKIE_SEARCH_OFFICES = "search_buscador_offices";
    pag.COOKIE_isAdsOffice = "isAdsOffice";
    pag.COOKIE_isMap = "isMap";
    pag.COOKIE_URLListadoFriendly = "URLListadoFriendly";
    pag.COOKIE_SELECTED = "selected_buscador_pro";
    pag.K_NUM_RSS = 1;

    pag.formatear =
    {
        separador: ".", // separador para los miles
        formatear: function (num) {
            num += '';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var regx = /(\d+)(\d{3})/;
            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
            }
            return "{0} {1}".format(splitLeft, this.simbol);
        },
        new: function (num, simbol) {
            this.simbol = simbol || '';
            return this.formatear(num);
        }
    };
    pag.datoscss =
    {
        value: null,
        getdatos: function (forzar) {
            var sPag = "css.js";
            if (forzar) {
                p_fecha = Date.now();
                $.sessionStorage("fecha", p_fecha);
            }
            $.ajax({
                url: "/loadjson.ashx?file=" + sPag + "&fecha=" + p_fecha,
                dataType: "json",
                type: "GET",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    pag.datoscss.value = response;
                },
            })
            .fail(function (jqXHR, textStatus, errorThrownorThrown) {
                console.log("error al hacer ping");
            });
        }
    };
   
    pag.datosmaster =
    {
        value: null,
        getdatos: function (forzar) {
            var sPag = "site.js";
            if (forzar) {
                p_fecha = Date.now();
                $.sessionStorage("fecha", p_fecha);
            }
            $.ajax({
                url: "/loadjson.ashx?file=" + sPag + "&fecha=" + p_fecha,
                dataType: "json",
                type: "GET",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    pag.datosmaster.value = response;
                }
            })
            .fail(function (jqXHR, textStatus, errorThrownorThrown) {
                console.log("error al hacer ping");
            });
        }   
    };
    /*esto es solo para la edición TODO cambiar */
    pag.menus =
    {
        value: null,
        getmenus: function (forzar) {
            var sPag = "menu.js";
            if (forzar) {
                p_fecha = Date.now();
                $.sessionStorage("fecha", p_fecha);
            }

            $.ajax({
                url: "/loadjson.ashx?file=" + sPag + "&fecha=" + p_fecha,
                dataType: "json",
                async: false,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    pag.menus.value = response;
                },
                error: functionError
            });
        },
        pintarmenus: function (forzar) {
            if (this.value == null || forzar)
                this.getmenus(forzar);

            var $ulmenu = $("#ulmenu");
            var $ulmenuextra= $("#ulmenuextra");
            

            $ulmenu.empty();
            $ulmenuextra.empty();
            var esMls = false;
            var cadena = "";

            jQuery.map(this.value, function (obj) {
                if ((obj.value == "default.aspx" || obj.value == "")) {
                    if (pag.nombrepagina.replace(".js", ".aspx").toLowerCase() == "default.aspx" || pag.nombrepagina == "")
                        cadena += "<li ><a class='active' href='/" + obj.value + "'>" + Strings.inicio + "</a></li>";
                    else
                        cadena += "<li ><a href='/" + obj.value + "'>" + Strings.inicio + "</a></li>";
                }
                else if (obj.value.replace(".aspx", ".html").toLowerCase() == pag.nombrepagina.replace(".js", ".html").toLowerCase())
                    cadena += "<li ><a class='active' href='/" + obj.value.replace(".aspx", ".html").toLowerCase() + "'>" + obj.name + "</a></li>";
                else
                    cadena += "<li><a href='/" + obj.value.replace(".aspx", ".html").toLowerCase() + "'>" + obj.name + "</a></li>";
            });
            $ulmenu.html(cadena);
            $ulmenuextra.html(cadena);
            
        }
    };
    pag.banners =
    {
        value: null,
        getbanner: function (forzar) {
            var sPag = "banners.js";
            if (forzar) {
                p_fecha = Date.now();
                $.sessionStorage("fecha", p_fecha);
            }

            $.ajax({
                url: "/loadjson.ashx?file="+ sPag + "&fecha=" + p_fecha,
                dataType: "json",
                type: "GET",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    pag.banners.value = response;
                }
            })
            .fail(function (jqXhr, textStatus) {
                console.log("error al hacer ping");
            });
        }        
    };
    pag.datoslinks =
    {
        value: null,
        getlinks: function (forzar) {
            var sPag = "links.js";
            if (forzar) {
                p_fecha = Date.now();
                $.sessionStorage("fecha", p_fecha);
            }

            $.ajax({
                url: "/loadjson.ashx?file="+ sPag + "&fecha=" + p_fecha,
                dataType: "json",
                type: "GET",
                async:false,
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    pag.datoslinks.value = response;
                }
            }).fail(function (jqXHR, textStatus, errorThrownorThrown) {
                console.log("error al hacer ping");
            });
        }
    };
    /*FIN esto es solo para la edición TODO cambiar */
    /* para la edicion los datos y aqui solo editarpagina */
    pag.datos =
   {
       value: null,
       getdatos: function (forzar) {
           var sPag = pag.nombrepagina;

           if (forzar) {
               p_fecha = Date.now();
               $.sessionStorage("fecha", p_fecha);
           }

           if (isNaN(pag.nombrepagina) && pag.nombrepagina.indexOf(".oficinas") < 0 && pag.nombrepagina.toLowerCase().indexOf("plantilla") < 0) {

               $.ajax({
                   url: "/loadjson.ashx?file=" + sPag + "&fecha=" + p_fecha,
                   dataType: "json",
                   type: "GET",
                   async: false,
                   contentType: "application/json; charset=utf-8",
                   success: function (response) {
                       pag.datos.value = response;
                   }
               });
           }
       },
       editarpagina: function () {
           $.getScript("/js/jquery.editableTools.js", function () {
               // Create reference to parent contaier
               var $idVisorFotos = $('#idvisorfotos');
               if ($idVisorFotos.length > 0)
                   $idVisorFotos.find('.editable').editable({
                       event: 'click'
                   });

               // Display correct short key info depending on OS    
               var $editableArea = $('.editable-area');
               $editableArea.addClass("logado");
               $editableArea.find('.editable').off();
               $editableArea.find('.editable').editable({
                   event: 'click'
               })
               //.on('mouseout', function () { $(".edit-icon").remove(); })
               .on('mouseover', function () {
                   $(".edit-icon").remove();
                   $(this).prepend("<span class='edit-icon' />");
               })
               // Switch info text when starting to edit      
               .on('edit', function () {
                   tinyMCE.init({
                       selector: "textarea.mceEditor",
                       theme: "silver",
                       plugins: ['advlist autolink link image lists charmap preview hr anchor pagebreak spellchecker',
                           'searchreplace wordcount visualblocks visualchars code  insertdatetime media nonbreaking',
                           'save table contextmenu directionality emoticons  paste textcolor'],
                       contextmenu: "cut copy paste",
                       toolbar: 'insertfile undo redo cut copy paste pastetext| styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media  | forecolor backcolor emoticons | code',
                       images_upload_url: 'FileTransferFoto.ashx',
                       images_upload_credentials: true,
                       paste_data_images: true
                   });
               });
           });
       }
   };
    pag.pintar = function () {

        _func.tabs();
        var logado = $.cookie("login");
        if ((logado!=undefined && logado!="" && logado!="0")) {
            $("#alogin").text(Strings.cerrarSesion);

            var pintarMenuCms = function(content) {
                $('body').append(content);
                $.getScript("/js/menuedicionTools.js", function () {
                    $("#imglogo").off();
                    pag.datos.editarpagina();
                    var link = $.cookie("_menucms");
                    if (link != undefined) {
                        $("#" + link).click();
                    }
                });
            };

            pag.llamadaGet("/api/Cms/GetCmsMainMenu", {}, pintarMenuCms);

        } else {
            $("#sendpass2").on("click", function (event) {
                $("#sendpass2").attr("disabled", "disabled");
                $.ajax({
                    url: "/forgotlogin.ashx",
                    type: "POST",
                    data: "dat=" + $("#pass").val() + "&xsfr=" + $("body").data("xsfr"),
                    success: function (response) {
                        $("#sendpass2").removeAttr("disabled");
                        if (response == "1") {
                            alert(Strings.emailEnviado);
                        }
                        else
                            alert(Strings.errorPassword);
                    },
                    error: function () {
                        alert(Strings.errorPassword);
                    },
                    beforeSend: window.modules.utils.loadingByEl.show('body', {
                        blockLayer: true, fixed: true
                    }),
                    complete: function () {
                        window.modules.utils.loadingByEl.hide('body');
                    },
                });

            });
        }
    };
    pag.forzar = function () {
        p_fecha = Date.now();
        $.sessionStorage("fecha", p_fecha);
    };
    pag.getfecha = function () {
        return p_fecha;
    };
    

    pag.logOn = function () {
        var response = $('#captchalogin').val();

        $('#CaptchaCodeTextBox').on("paste keyup", function () {
            $('#CaptchaIncorrectLabel').hide();
        });

        $('#PasswordTextBox').on("paste keyup", function () {
            $('#feedbackErrorLogin').hide();
        });


        if (response!= "0" && response!="") {
            $("#alogin").text(Strings.cerrarSesion);
            $('#loginform').remove();

            var pintarMenuCms = function (content) {
                $('body').append(content);
                $.getScript("/js/menuedicionTools.js", function () {
                    $("#imglogo").off();
                    pag.datos.editarpagina();
                    var link = $.cookie("_menucms");
                    if (link != undefined) {
                        $("#" + link).click();
                    }
                });
            };

            pag.llamadaGet("/api/Cms/GetCmsMainMenu", {}, pintarMenuCms);

        }
    };
    pag.logOff = function (e) {
        //  e.preventDefault();
        var $editableArea = $('.editable-area');
        if ($editableArea.length > 0)
            $editableArea.removeClass("logado");

        $.removeCookie("_menucms", { path: "/" });
        location.reload();
    };
    pag.forgot = function (e) {

        $("#sendpass2").attr("disabled", "disabled");
        $.ajax({
            url: "/forgotlogin.ashx",
            type: "POST",
            data: "dat=" + $("#pass").val(),
            success: function (response) {
                $("#sendpass2").removeAttr("disabled");
                if (response == "1") {
                    alert(Strings.emailEnviado);
                }
                else
                    alert(Strings.errorPassword);
            },
            error: function () {
                alert(Strings.errorPassword);
            },
            beforeSend: window.modules.utils.loadingByEl.show('body', {
                blockLayer: true, fixed: true
            }),
            complete: function () {
                window.modules.utils.loadingByEl.hide('body');
            },
        });
    };
    pag.closesession = function (event) {
        event.preventDefault();
        if (confirm(Strings.confirmCerrarSesion)) {

            var btn = document.getElementById($('#btnLinkUniqueID').val(), this);
            btn.click();

        }
    };
    pag.nombrepagina = "";
    pag.eventchange = function () {
        $('#CaptchaCodeTextBox').on("paste keyup", function () {
            $('#CaptchaIncorrectLabel').hide();
        });

        $('#PasswordTextBox').on("paste keyup", function () {
            $('#feedbackErrorLogin').hide();
        });
    };
    _func.activeMenuExtra = function () {
        if (!$(".nav").is(":visible"))
            return;
        
        var maxheight = $(".nav").outerHeight(); //height
        maxheight = maxheight + (maxheight / 2);
        var height = $("#ulmenu").height();

        if (height > maxheight)
            $("#extraparent").fadeIn().css('display', 'inline-block');

    };
    pag.init = function (plantilla) {
        _plantilla = plantilla;

        // if (typeof $.cookie("_ac") == "undefined" || $.cookie("_ac") == null || $.cookie("_ac") != "true") {
        //     _func.cookies.show();

        //     $("#divCookies #aclose").off().on("click", function () {
        //         _func.cookies.close();
        //     });

        //     $("#divCookies #reject").off().on("click", function () {
        //         _func.cookies.reject();
        //     });
        // }
        var loc = window.location;
        this.nombrepagina = loc.pathname.split("/");
        this.nombrepagina = this.nombrepagina[this.nombrepagina.length - 1];

        if (this.nombrepagina == "") {
            this.nombrepagina = "default.aspx";
        }

        this.nombrepagina = this.nombrepagina.replace(".aspx", ".js").replace(".html", ".js");
        if (this.nombrepagina.indexOf(".ficha") != -1)
            this.nombrepagina = "ficha.js";
        else {
            if (this.nombrepagina.indexOf(".listado") != -1)
                this.nombrepagina = "listadoads.js";
        }
        this.pintar();
        _func.asignarEventos();
        _func.activeMenuExtra();
    };
    pag.PostRedirect = function (redirectUrl, parameters, bNewPag) {
        var html = "";
        html += "<form action=\"" + redirectUrl + "\"";
        if (bNewPag)
            html += " target=\"_blank\"";
        html += " method=\"post\">\n";
        if (parameters != null) {
            $.each(parameters, function (i, item) {
                html += "<input type='hidden' name='" + item.name + "' value='" + item.value + "' />\n";
            });
        }
        html += "</form>\n";
        var form = $(html);
        $("body").append(form);
        $(form).submit();
    };
    
    _func.plantilla1 = function (elemento, color) {

        switch (elemento) {

            case "coorporativoBK":
                $(' .resultados .inmueble h2 strong').css('color', color);
                $('.buscador h1,  .nav li:hover,.nav li a:hover, .editable-area h1, .banner .editslideshow, .nav li a, .nav, #translate-this, .corporativo, .row-fluid .modulo h2:after, .ficha-main .sidebar h2:after, h2 i.icono-filtros, h2 i.icono-news, h2 i.icono-casa, .btn.action:hover, .btn.action:active, .btn.action.active,.btn.action.disabled, .btn.action[disabled] ').css('background-color', color);
                $('.ficha .sidebar h2 strong, .row-fluid .modulo h2 strong').css('background-color', color);
                $('.nav li a,.btn.btn-small').css('background-color', color);

                break;
            case "paginaBK":
                $('.main, .filtros, .nav .active, .sidebar .contactoFicha').css('background-color', color);
                break;
            case "fondoBK":
                $('body').css('background-color', color);
                break;
            case "headerBK":
                $('.header, .diveditmovil .resultLogo .bg-fondo').css('background-color', color);
                $('.logo-home').css("background-color", color);
                break;
            case "footerBK":
                $('.corporativo').css('background-color', color);
                break;
            case "letracoorp":
                $('a, a:link, a:hover, .ui-widget a span, .nav .active,  .ficha .encabezado p strong.through, .resultados .inmueble h2 strong.through').css('color', color);
                $(' .ficha .prices,.contenidos .modulo p.prices').css("color", color);
                break;
            case "letrafondos":
                $('.nav li a, .nav li:hover a,.nav li a:hover, .buscador h1, .modulo h2 a, .banner h2, .banner h2, .editable-area h1, .btn.btn-primary, .btn.btn-primary, .row-fluid .modulo h2, .sidebar h2, .corporativo p, .corporativo a ').css('color', color);
                break;
            case "letra":
                $('body').css('color', color);
                $('.ficha .through, .contenidos .modulo p span.through').css("color", color);
                break;
        }
    };
    _func.plantilla2 = function (elemento, color) {

        switch (elemento) {

            case "coorporativoBK":
                //$(".header").css("background-color", color);
                //TODO: Move to PlantillaCopiar3
                //$(".nav").css("background-color", color);
                //$(".linksq > .container").css("border-bottom-color", color);
                //$(".banners a").css("border-bottom-color", color);
                //$(".linksq > .container").css("border-bottom-color", color);
                //$(".highlights .text-fields").css("border-bottom-color", color);
                break;
            case "paginaBK":
                $(".seo").css("background-color", color);
                break;
            case "fondoBK":
                //$(".result-list .result-details .info-results p").css('background-color', color);
                $("body").css('background-color', color);
                break;
            case "headerBK":
                //$(".header").css("background-color", color);
                break;
            case "footerBK":
                $('.connect').css('background-color', color);
                $(".search-type .buildings img").css('background-color', color);
                break;
            case "letracoorp":
                $(".prices-wrap .price").css('color', color);
                $(".office-list .sidebar nav > ul li a").css('color', color);
                $(".news .news-box .content > a").css('color', color);
                $(".news .feeds .content > a").css('color', color);
                $(".result-list .sidebar dt").css('color', color);
                $(".result-list .sidebar label").css('color', color);
                $(".ficha .encabezado p a").css('color', color);
                $(".office ul li a").css('color', color);
                $(".seo ul li a").css('color', color);
                $(".highlights .text-fields > p.prices").css('color', color);
                $(".info-results h1 a").css('color', color);
                $(".info-links li a").css('color', color);
                $(".history li a").css('color', color);
                $(".advertisement h2").css('color', color);
                $(".banners-text a").css('color', color);
                break;
            case "letrafondos":
                $("blockquote").css('color', color);
                $(".address").css('color', color);
                $(".banner .slogan").css('color', color);
                $(".login > a").css('color', color);
                $('.nav li a:hover').css('background-color', color);
                break;
            case "letra":
                //$('body').css('color', color);
                //$(".result-list .result-details .info-results p ").css("color", color);
                $("highlights .text-fields p").css("color", color);
                break;
        }
    };
    _func.plantilla3 = function (elemento, color) {

        switch (elemento) {
            case "coorporativoBK":
                $('.nav').css('background-color', color);
                $('.banners a, .linksq > .container').css('border-bottom', '10px solid ' + color);
                $('.highlights .text-fields').css('border-bottom', '8px solid ' + color);
                break;
            case "paginaBK":
                //No aplica
                break;
            case "fondoBK":
                $('body').css('background-color', color);
                break;
            case "headerBK":
                $(".header .logo").css("background-color", color);
                break;
            case "footerBK":
                $('.footer .connect').css('background-color', color);
                break;
            case "letracoorp":
                $(".office-list .history ul li a").css('color', color); //?????????
                $(".office-list .sidebar nav > ul li a").css('color', color);
                $(".highlights .text-fields .prices, .result-list .sidebar dt, .ficha .encabezado p a, .office ul li a, .seo ul li a, .prices-wrap .price").css('color', color);
                $(".news .content > a").css('color', color); //?????????


                break;
            case "letrafondos":
                $(".banner blockquote, .banner .slogan, .login > a, .address").css('color', color);
                $('.nav ul li a, .nav li a:hover').css('color', color);
                break;
            case "letra":
                $('body').css('color', color);
                $(".info-results p").css("color", color);
                break;
        }
    };
    _func.plantilla4 = function (elemento, color) {

        switch (elemento) {

            case "coorporativoBK":
                $("nav,.button-field button").css("background-color", color);
                $(".banners a,.linksq > .container").css("border-bottom", "10px solid " + color);
                $(".highlights .text-fields").css("border-bottom", "8px solid " + color);

                break;
            case "paginaBK":
                $(".main > .wrap > .container, .footer > .wrap .connect").css("background-color", color);
                break;
            case "fondoBK":
                $('body').css('background-color', color);
                break;
            case "headerBK":
                $(".header .logo").css("background-color", color);

                break;
            case "footerBK":
                $('.footer .connect').css('background-color', color);
                break;
            case "letracoorp":
                $(".office-list .history ul li a").css("color", color);
                $(".office-list .sidebar nav > ul li a").css('color', color);
                $("h1,.highlights .text-fields .prices,.result-list .sidebar dt,.ficha .encabezado p a,.office ul li a,.seo ul li a,.prices-wrap .price ").css("color", color);
                $(".news .content > a").css("color", color);
                $(".box_skitter .label_skitter h1").css("color", "#ffffff");

                break;
            case "letrafondos":
                $("nav ul li a,.button-field button").css("color", color);
                break;
            case "letra":
                $('body').css('color', color);
                $(".info-results p,label").css("color", color);
                $(".login > a,.address").css("color", color);
                break;
        }
    };
    _func.plantilla5 = function (elemento, color) {

        switch (elemento) {

            case "coorporativoBK":
                //$(".header").css("background-color", color);
                //TODO: Move to PlantillaCopiar3
                //$(".nav").css("background-color", color);
                //$(".linksq > .container").css("border-bottom-color", color);
                //$(".banners a").css("border-bottom-color", color);
                //$(".linksq > .container").css("border-bottom-color", color);
                //$(".highlights .text-fields").css("border-bottom-color", color);
                break;
            case "paginaBK":
                $(".seo").css("background-color", color);
                break;
            case "fondoBK":
                //$(".result-list .result-details .info-results p").css('background-color', color);
                $("body").css('background-color', color);
                break;
            case "headerBK":
                //$(".header").css("background-color", color);
                break;
            case "footerBK":
                $('.connect').css('background-color', color);
                //$(".search-type .buildings img").css('background-color', color);
                break;
            case "letracoorp":
                $(".prices-wrap .price").css('color', color);
                $(".office-list .sidebar nav > ul li a").css('color', color);
                $(".news .news-box .content > a").css('color', color);
                $(".news .feeds .content > a").css('color', color);
                $(".result-list .sidebar dt").css('color', color);
                $(".result-list .sidebar label").css('color', color);
                $(".ficha .encabezado p a").css('color', color);
                $(".office ul li a").css('color', color);
                $(".seo ul li a").css('color', color);
                $(".highlights .text-fields > p.prices").css('color', color);
                $(".info-results h1 a").css('color', color);
                $(".info-links li a").css('color', color);
                $(".history li a").css('color', color);
                $(".advertisement h1").css('color', color);
                $(".banners-text a").css('color', color);
                break;
            case "letrafondos":
                $("blockquote").css('color', color);
                $(".address").css('color', color);
                $(".banner .slogan").css('color', color);
                $(".login > a").css('color', color);
                $('.nav li a:hover').css('background-color', color);
                break;
            case "letra":
                //$('body').css('color', color);
                //$(".result-list .result-details .info-results p ").css("color", color);
                $("highlights .text-fields p").css("color", color);
                break;
        }
    };

    _func.plantilla6 = function (elemento, color) {

        switch (elemento) {

            case "coorporativoBK":
                //$(".header").css("background-color", color);
                //TODO: Move to PlantillaCopiar3
                //$(".nav").css("background-color", color);
                //$(".linksq > .container").css("border-bottom-color", color);
                //$(".banners a").css("border-bottom-color", color);
                //$(".linksq > .container").css("border-bottom-color", color);
                //$(".highlights .text-fields").css("border-bottom-color", color);
                break;
            case "paginaBK":
                $(".seo").css("background-color", color);
                break;
            case "fondoBK":
                //$(".result-list .result-details .info-results p").css('background-color', color);
                $("body").css('background-color', color);
                break;
            case "headerBK":
                //$(".header").css("background-color", color);
                break;
            case "footerBK":
                $('.connect').css('background-color', color);
                //$(".search-type .buildings img").css('background-color', color);
                break;
            case "letracoorp":
                $(".prices-wrap .price").css('color', color);
                $(".office-list .sidebar nav > ul li a").css('color', color);
                $(".news .news-box .content > a").css('color', color);
                $(".news .feeds .content > a").css('color', color);
                $(".result-list .sidebar dt").css('color', color);
                $(".result-list .sidebar label").css('color', color);
                $(".ficha .encabezado p a").css('color', color);
                $(".office ul li a").css('color', color);
                $(".seo ul li a").css('color', color);
                $(".highlights .text-fields > p.prices").css('color', color);
                $(".info-results h1 a").css('color', color);
                $(".info-links li a").css('color', color);
                $(".history li a").css('color', color);
                $(".advertisement h1").css('color', color);
                $(".banners-text a").css('color', color);
                break;
            case "letrafondos":
                $("blockquote").css('color', color);
                $(".address").css('color', color);
                $(".banner .slogan").css('color', color);
                $(".login > a").css('color', color);
                $('.nav li a:hover').css('background-color', color);
                break;
            case "letra":
                //$('body').css('color', color);
                //$(".result-list .result-details .info-results p ").css("color", color);
                $("highlights .text-fields p").css("color", color);
                break;
        }
    };

    pag.formatDate = function (d) {
        
        var weekday = [Strings.semana_domingo, Strings.semana_lunes, Strings.semana_martes, Strings.semana_miercoles, Strings.semana_jueves, Strings.semana_viernes, Strings.semana_sabado];
        var monthname = [Strings.mes_enero, Strings.mes_febrero, Strings.mes_marzo, Strings.mes_abril, Strings.mes_mayo, Strings.mes_junio, Strings.mes_julio, Strings.mes_agosto, Strings.mes_septiembre, Strings.mes_octubre, Strings.mes_noviembre, Strings.mes_diciembre];

        if (!isNaN(d.getTime()))
            return weekday[d.getDay()] + ", " + d.getDate() + " " + Strings.de + " " + monthname[d.getMonth()] + " " + Strings.de + " " + d.getFullYear();
        else
            return "";
    };

    pag.pintarcss = function (elemento, color) {
        if(_plantilla==1)
            _func.plantilla1(elemento, color);
        if (_plantilla == 2)
            _func.plantilla2(elemento, color);
        if (_plantilla == 3)
            _func.plantilla3(elemento, color);        
        if (_plantilla == 4)
            _func.plantilla4(elemento, color);
        if (_plantilla == 5)
            _func.plantilla5(elemento, color);
        if (_plantilla == 6)
            _func.plantilla6(elemento, color);
    }
    pag.normalizar = function (string) {
        return _func.normalizar(string)
    };

    pag.llamadaPOST = function (url, object, fncallback, fnerror) {
        $.ajax({
            url: url,
            cache: false,
            type: 'POST',
            data: JSON.stringify(object),
            contentType: 'application/json; charset=utf-8',
            beforeSend: window.modules.utils.loadingByEl.show('body', {
                blockLayer: true, fixed: true
            }),
            complete: function () {
                window.modules.utils.loadingByEl.hide('body');
            },
            statusCode: {
                200: function (data) {
                    if (fncallback)
                        fncallback(data);
                }
            }
        })
        .fail(function (jqXHR, textStatus) {
            if (fnerror)
                fnerror();
        });
    };
    pag.llamadaPOSTSinLoading = function (url, object, fncallback, fnerror) {
        $.ajax({
            url: url,
            cache: false,
            type: 'POST',
            data: JSON.stringify(object),
            contentType: 'application/json; charset=utf-8',
            statusCode: {
                200: function (data) {
                    if (fncallback)
                        fncallback(data);
                }
            }
        })
            .fail(function (jqXHR, textStatus) {
                if (fnerror)
                    fnerror();
            });
    };

    pag.llamadaGet = function(url, object, fncallback) {
        $.ajax({
            url: url,
            cache: false,
            async: false,
            type: 'GET',
            data: object,
            dataType: 'json',
            success: function (data) {
                fncallback(data);

            },
            error: function (xhr, status) {
            }
        });
    };

    return pag;
}(jQuery));
