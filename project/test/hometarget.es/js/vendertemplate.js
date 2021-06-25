var Strings = MI_SCRIPTS;

function validacionVender() {

    $.validator.setDefaults({
        submitHandler: function () { },
        highlight: function (input) {
            $(input).addClass("ui-state-highlight");
        },
        unhighlight: function (input) {
            $(input).removeClass("ui-state-highlight");
        }
    });

}

function callApiSendEmail(e) {

    e.preventDefault();
    if ($("#vender").valid() == true) {
        var parametros = {
            "idtipo": 2,
            "sNombre": WEBS.FORM.StripHtml($("#nombre").val()),
            "sApellidos": WEBS.FORM.StripHtml($("#apellidos").val()),
            "sTelefono": WEBS.FORM.StripHtml($("#telefono").val()),
            "sEmail":$("#mail").val(),
            "sProvincia": WEBS.FORM.StripHtml($("#provincia").val()),
            "sLocalidad": WEBS.FORM.StripHtml($("#localidad").val()),
            "sDireccion": WEBS.FORM.StripHtml($("#direccion").val()),
            "sNumero": WEBS.FORM.StripHtml($("#numero").val()),
            "sCP": WEBS.FORM.StripHtml($("#codigopostal").val()),
            "sTipoVivienda": WEBS.FORM.StripHtml($("#tipovivienda").val()),
            "sDormitorios": WEBS.FORM.StripHtml($("#dormitorios").val()),
            "sBanios": WEBS.FORM.StripHtml($("#banios").val()),
            "sAntiguedad": WEBS.FORM.StripHtml($("#antiguedad").val()),
            "sOtrasCC": WEBS.FORM.StripHtml($("#otrascc").val()),
            "sTransaccion": $(".clstransaccion:checked").val(),
            "idIdioma": WEBS.PAGINA.IdIdioma
        };

        $.ajax({
            url: "/api/Menu/Postenviarmail",
            data: JSON.stringify(parametros),
            cache: false,
            dataType: "json",
            type: "Post",
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                if (response == 1) {
                    alert(Strings.emailEnviado);
                    window.location.reload();
                }
                else
                    alert(response);
            },
            beforeSend: fnMensajeBuscando,
            error: functionError,
            complete: fnOcultarBusy
        });
    }
}

$(document).ready(function () {
    
    $("#envioinfovender").on("click", callApiSendEmail);
    validacionVender();
});

$('.clstransaccion').die();
$(".clstransaccion").live("click", function (event) {
    $(".clstransaccion").attr("checked", false);
    $(this).attr("checked", true);
});


