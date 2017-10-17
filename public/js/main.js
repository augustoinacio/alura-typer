var tempoInicial = $("#tempo-segundos").text();
var campo = $(".campo-digitacao");

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo());

});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        var quantPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(quantPalavras);
        var quantCaracteres = conteudo.length;
        $("#contador-caracteres").text(quantCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-segundos").text();
    campo.one("focus", function () {
        var cronoId = setInterval(function () {
            tempoRestante--;
            $("#tempo-segundos").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                campo.addClass("campo-desativado");
                clearInterval(cronoId);
            }
        }, 1000);
    });
}
function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado === comparavel) {
            campo.addClass("botao-verde");
            campo.removeClass("botao-vermelho");
        } else {
            campo.addClass("botao-vermelho");
            campo.removeClass("botao-verde");
        }
    });
}

function reiniciaJogo() {
    return function () {
        campo.attr("disabled", false);
        campo.val("");
        $("#tempo-segundos").text(tempoInicial);
        $("#contador-palavras").text(0);
        $("#contador-caracteres").text(0);
        campo.removeClass("campo-desativado");
        campo.removeClass("botao-verde");
        campo.removeClass("botao-vermelho");
        inicializaCronometro();
    }
}
$("#botao-reiniciar").click(reiniciaJogo());