// Module Pattern (Padrão de Módulo)
const moduloBlackjack = (() => {
  "use strict";

  // clubs diamonds hearts and spades
  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiais = ["A", "J", "Q", "K"];

  let pontosJogadores = [];

  // Referência HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnParar = document.querySelector("#btnParar"),
    btnNovo = document.querySelector("#btnNovo");

  const divCartasJogadores = document.querySelectorAll(".divCartas"),
    pontosHTML = document.querySelectorAll("small");

  const inicializarJogo = (numJogadores = 2) => {
    deck = criarDeck();
    pontosJogadores = [];
    for (let i = 0; i < numJogadores; i++) {
      pontosJogadores.push(0);
    }
    pontosHTML.forEach((elem) => (elem.innerText = 0));
    divCartasJogadores.forEach((elem) => (elem.innerHTML = ""));

    btnPedir.disabled = false;
    btnParar.disabled = false;
  };

  const criarDeck = () => {
    deck = [];

    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let tipo of tipos) {
      for (let especial of especiais) {
        deck.push(especial + tipo);
      }
    }
    return _.shuffle(deck);
  };

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "Não tem mais cartas no deck";
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // Turno: 0 = primeiro jogador e o último será o computador
  const AcumularPontos = (carta, turno) => {
    pontosJogadores[turno] = pontosJogadores[turno] + valorCarta(carta);
    pontosHTML[turno].innerText = pontosJogadores[turno];
    return pontosJogadores[turno];
  };

  const criarCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJogadores[turno].append(imgCarta);
  };

  const determinarGanhador = () => {
    const [pontosMinimos, pontosComputador] = pontosJogadores;

    setTimeout(() => {
      if (pontosComputador === pontosMinimos) {
        alert("Ninguém ganhou!");
      } else if (pontosMinimos > 21) {
        alert("Computador ganhou!");
      } else if (pontosComputador > 21) {
        alert("Jogador ganhou!");
      } else {
        alert("Computador ganhou!");
      }
    }, 20);
  };

  const turnoComputador = (pontosMinimos) => {
    let pontosComputador = 0;

    do {
      const carta = pedirCarta();
      pontosComputador = AcumularPontos(carta, pontosJogadores.length - 1);
      criarCarta(carta, pontosJogadores.length - 1);
    } while (pontosComputador < pontosMinimos && pontosMinimos <= 21);

    determinarGanhador();
  };

  // Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const pontosJogador = AcumularPontos(carta, 0);
    criarCarta(carta, 0);

    if (pontosJogador > 21) {
      console.log("Você perdeu!");
      btnPedir.disabled = true;
      btnParar.disabled = true;
      turnoComputador(pontosJogador);
    } else if (pontosJogador === 21) {
      console.log("Você ganhou!");
      btnPedir.disabled = true;
      btnParar.disabled = true;
      turnoComputador(pontosJogador);
    }
  });

  btnParar.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnParar.disabled = true;

    turnoComputador(pontosJogadores[0]);
  });

  // btnNovo.addEventListener("click", () => {
  //   console.clear();
  //   inicializarJogo();
  // });

  return { novoJogo: inicializarJogo };
})();
