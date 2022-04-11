// clubs diamonds hearts and spades

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiais = ["A", "J", "Q", "K"];

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

  console.log(deck);
  console.log(carta);
  return carta;
};

// pedirCarta();
