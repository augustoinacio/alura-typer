$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
    $("#spinner").show();
    $.get('http://localhost:3000/frases', function(data){
       var frase = $(".frase");
       var numeroAleatorio = Math.floor(Math.random() * data.length );
       frase.text(data[numeroAleatorio].texto);
       atualizaTamanhoFrase();
       atualizaTempo(data[numeroAleatorio].tempo);
    }).fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").toggle();
        },2000);
    }).always(function(){
        $("#spinner").toggle();
    });
}


function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function atualizaTempo(tempo){
    var tempoValor = $("#tempo-segundos");     
    tempoValor.text(tempo);   
    tempoInicial = tempo;
}

function buscaFrase(){
    $("#spinner").show();
console.log('busca por id acionado');
    var fraseID = $("#frase-id").val();
    var dados = { id : fraseID};
    $.get('http://localhost:3000/frases',dados,trocaFrase)   
    .fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").toggle();
        },2000);
    }).always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data){
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempo(data.tempo);
}