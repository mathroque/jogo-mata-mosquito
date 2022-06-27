// Obtém a largura e altura do navegador sempre que um resize acontece
var altura = 0
var largura = 0
var vidas = 3
var tempo = 10
var criaMosquitoTempo = 1500
document.getElementById('cronometro').innerHTML = tempo

var nivelSlc = window.location.search
nivelSlc = nivelSlc.replace('?', '')

if (nivelSlc === 'facil') {
    criaMosquitoTempo = 1500
} else if (nivelSlc === 'normal') {
    criaMosquitoTempo = 1000
} else if (nivelSlc === 'dificil') {
    criaMosquitoTempo = 700
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}
ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {
    tempo -= 1
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criarMosquito)
        location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

function posicaoRandomica() {
    // Remove o mosquito anterior(caso exista)
    var IDMosquito = document.getElementById('mosquito')
    if (IDMosquito) {
        IDMosquito.remove()
        if (vidas < 1) {
            location.href = 'fim_de_jogo.html'
        }
        var vidaSelecionavel = document.getElementById('v' + vidas)
        vidaSelecionavel.src = 'imagens/coracao_vazio.png'
        vidas--
    }

    // Utiliza os tamanhos coletados para criar uma posição aleatória para o elemento html
    var posicaoX = Math.floor(Math.random() * largura) - 100
    var posicaoY = Math.floor(Math.random() * altura) - 100
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    // Criando elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.position = 'absolute'
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove()
    }
    document.body.appendChild(mosquito)
}

var criarMosquito = setInterval(() => {
    posicaoRandomica()
}, criaMosquitoTempo);

// Retorna uma string para identificar qual a classe do tamanho em que a imagem será exibida
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)
    switch (classe) {
        case 0:
            return 'mosquito1'
        
        case 1:
            return 'mosquito2'

        case 2: 
            return 'mosquito3'
    }
}

// Retorna uma string para identificar qual a classe do lado em que a imagem será exibida
function ladoAleatorio() {
    var lado = Math.floor(Math.random() * 2)
    switch (lado) {
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }
}

function iniciarJogo() {
    var nivel = document.getElementById('nivel').value
    if (nivel === '') {
        alert('Selecione um nível para iniciar o jogo.')
    } else {
        window.location.href = 'jogo.html?' + nivel
    }
}

