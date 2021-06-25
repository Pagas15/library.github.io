var Strings = MI_SCRIPTS;

function validacionContacto() {
    $.validator.setDefaults({
        submitHandler: function () { },
        highlight: function (input) {
            $(input).addClass("ui-state-highlight");
        },
        unhighlight: function (input) {
            $(input).removeClass("ui-state-highlight");
        }
    });

    $("#contacto").validate();

}

function callApiSendEmail(e) {

    e.preventDefault();
    if ($("#contacto").valid() == true) {
        var parametros = {
            "idtipo": 4,
            "sNombre": WEBS.FORM.StripHtml($("#nombre").val()),
            "sApellidos": WEBS.FORM.StripHtml($("#apellidos").val()),
            "sTelefono": WEBS.FORM.StripHtml($("#telefono").val()),
            "sEmail": $("#mail").val(),
            "conociste": $("#btn_cmbconociste")[0].innerText,
            "observaciones": WEBS.FORM.StripHtml($("#observaciones").val()),
            "idIdioma": 1
        };
        $.ajax({
            url: "/api/Menu/Postenviarmailcontacto",
            data: JSON.stringify(parametros),
            cache: false,
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            beforeSend: fnMensajeBuscando,
            success: function(response) {
                if (response == "1") {
                    alert(Strings.emailEnviado);
                    window.location.reload();
                } else
                    alert(response);
            },
            error: functionError,
            complete: fnOcultarBusy
        });
    }

}
$(document).ready(function () {
    var arrayconociste = new Array(Strings.prensa, Strings.revista, Strings.vallaPublicitaria, Strings.radio, Strings.feria, Strings.portalInmobiliario, Strings.buscador, Strings.recomendacion, Strings.otros);
    for (var icont = 0; icont < arrayconociste.length; icont++) {
        $("#cmbconociste").append("<li>" + arrayconociste[icont] + " </li>");
    }

    $("#envioinfocontacto").on("click", callApiSendEmail);
    validacionContacto();

});
$('#btn_cmbconociste').die();
$("#btn_cmbconociste").live("click", function (event) {
    if ($('#cmbconociste').is(':hidden')) {
        $('#cmbconociste').show();
    }
    else {
        $('#cmbconociste').hide();
    }
    return false;
});
$('#cmbconociste li').die();
$("#cmbconociste li").live("click", function (event) {
    $("#btn_cmbconociste").html($(this).html() + "<span class='select-icon'></span>");
    $('#cmbconociste').hide();
});
$('.clstransaccion').die();
$(".clstransaccion").live("click", function (event) {
    $(".clstransaccion").attr("checked", false);
    $(this).attr("checked", true);
});
 
