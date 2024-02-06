//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 a 100'
let listadeNumerosSorteados = [];
let numeroLimite = 100;
let numeroScreto = GerarNumerosAleatorios(); 
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});

}

function exibirMensagemInicia(){
    exibirTextoNaTela('h1', 'jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 100');
}

exibirMensagemInicia()

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroScreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let PalavraTemtativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentavivas = `Você decobriu o número secreto com ${tentativas} ${PalavraTemtativa}`;
        exibirTextoNaTela('p', mensagemTentavivas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroScreto){
            exibirTextoNaTela ('p','  O Número Secreto é Menor');
        }else{
            exibirTextoNaTela('p', 'O Número Secreto é Maior');
        }
        // tentativas = tentativas + 1;
        tentativas++
        limparcampo();
    }
}

function GerarNumerosAleatorios() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1 );
    let quantidadeDeElementosNaLista = listadeNumerosSorteados.length;
    
    if (quantidadeDeElementosNaLista == numeroLimite){
        listadeNumerosSorteados = [];
    }
    if (listadeNumerosSorteados.includes(numeroEscolhido)) {
        return GerarNumerosAleatorios();
    } else {
        listadeNumerosSorteados.push(numeroEscolhido);
        console.log(listadeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparcampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroScreto = GerarNumerosAleatorios();
    limparcampo ();
    tentativas = 1 ;
    exibirMensagemInicia()
    document.getElementById('reiniciar').setAttribute('disabled',true)
}