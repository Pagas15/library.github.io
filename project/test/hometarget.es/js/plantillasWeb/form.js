
// create the root namespace and making sure we're not overwriting it
var WEBS = WEBS || {};

WEBS.FORM = (function ($) {
    'use strict';
    var _func = {}, pag = {};

    _func.confirmOnPageExit = function (e) {
        // If we haven't been passed the event get the window.event
        e = e || window.event;

        var message = "Any text will block the navigation and display a prompt";

        // For IE6-8 and Firefox prior to version 4
        if (e)
            e.returnValue = message;

        // For Chrome, Safari, IE8+ and Opera 12+
        return message;
    };

    pag.ControlNavegar = function (bAviso) {
        if (bAviso)
            window.onbeforeunload = _func.confirmOnPageExit;
        else
            window.onbeforeunload = null;
    };

    pag.FeedbackEndEtiqueta = function (idBtn,etiqueta) {
        $(idBtn).removeClass('loading')
            .addClass('success')
            .text(etiqueta);
    };

    pag.FeedbackError = function (idBtn) {
        $(idBtn).removeAttr("disabled")
            .removeClass("loading")
            .removeClass("success");
        if ($(idBtn).data("original"))
            $(idBtn).text($(idBtn).data("original"));
    };

   
    pag.DesactivarCambios = function (idBtn) {
        this.ControlNavegar(false);
    };

    pag.ActivarCambios = function (idBtn) {
        this.ControlNavegar(true);
        $(idBtn).removeAttr("disabled")
            .removeClass('success');
        if ($(idBtn).data("original"))
            $(idBtn).text($(idBtn).data("original"));
    };

    pag.StripHtml = function (value) {
        var strippedText = $("<div/>").html(value).text();
        return strippedText;
    };

    return pag;
}(jQuery));
