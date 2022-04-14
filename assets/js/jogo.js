// clubs diamonds hearts and spades
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiais = ["A", "J", "Q", "K"];

let pontosJogador = 0,
  pontosComputador = 0;

// Referência HTML
const btnPedir = document.querySelector("#btnPedir");
const btnParar = document.querySelector("#btnParar");
const btnNovo = document.querySelector("#btnNovo");

const divCartasJogador = document.querySelector("#jogador-cartas");
const divCartasComputador = document.querySelector("#computador-cartas");
const pontosHTML = document.querySelectorAll("small");

// Baralho
const criarDeck = () => {
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
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

criarDeck();

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "Não tem mais cartas no deck";
  }

  const carta = deck.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Computador
const turnoComputador = (pontosMinimos) => {
  do {
    const carta = pedirCarta();

    pontosComputador = pontosComputador + valorCarta(carta);
    pontosHTML[1].innerText = pontosComputador;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputador.append(imgCarta);

    if (pontosMinimos > 21) {
      break;
    }
  } while (pontosComputador < pontosMinimos && pontosMinimos <= 21);

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

// Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  pontosJogador = pontosJogador + valorCarta(carta);
  pontosHTML[0].innerText = pontosJogador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJogador.append(imgCarta);

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

  turnoComputador(pontosJogador);
});

btnNovo.addEventListener("click", () => {
  console.clear();

  deck = [];
  deck = criarDeck();

  pontosJogador = 0;
  pontosComputador = 0;

  pontosHTML[0].innerText = 0;
  pontosHTML[1].innerText = 0;

  divCartasComputador.innerHTML = "";
  divCartasJogador.innerHTML = "";

  btnPedir.disabled = false;
  btnParar.disabled = false;
});
