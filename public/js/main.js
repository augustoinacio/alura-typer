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
                clearInterval(cronoId);
                finalizaJogo();
            }
        }, 1000);
    });
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        console.log('------------------------------------');
        console.log(digitado);
        console.log(comparavel);
        console.log('------------------------------------');
        if (digitado === comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
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
        campo.removeClass("borda-verde");
        campo.removeClass("borda-vermelha");
        inicializaCronometro();
    }
}

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var numPalavras = $("#contador-palavras").text();
    var usuario = "Augusto Teste";
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);
}

function novaLinha(usuario, numPalavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaNumPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    link.append(icone);     
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaNumPalavras)
    linha.append(colunaRemover);
    return linha;
}

function removeLinha(){
    event.preventDefault();
    $(this).parent().parent().remove();

}
function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}
$("#botao-reiniciar").click(reiniciaJogo());