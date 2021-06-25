/*
* Translated default messages for the jQuery validation plugin.
* Locale: ES (Spanish; Español)
*/
(function ($) {
    $.extend($.validator.messages, {
        required: "Dato obligatorio",
        remote: "Por favor corrija este campo",
        email: "Dirección de email incorrecta",
        url: "URL incorrecta",
        date: "Fecha incorrecta",
        dateISO: "Intruduzca una fecha correcta (ISO)",
        number: "Introduzca un número correcto",
        digits: "Introduzca solo dígitos",
        creditcard: "Introduzca una tarjeta de credito correcta",
        equalTo: "Introduzca el mimso valor otra vez",
        accept: "Introduzca un valor con una extensión válida",
        maxlength: jQuery.validator.format("Introduzca no más de {0} caracteres"),
        minlength: jQuery.validator.format("Introduzca al menos {0} carácteres"),
        rangelength: jQuery.validator.format("Introduce un valor entre {0} y {1} caracteres"),
        range: jQuery.validator.format("Introduce un valor entre {0} y {1}"),
        max: jQuery.validator.format("Introduce un valor menor o igual a {0}"),
        min: jQuery.validator.format("Introduce un valor mayor o igual a {0}")
    });
} (jQuery));
