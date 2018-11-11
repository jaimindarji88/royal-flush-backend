import Card from '../../src/poker/Card';
import Deck from '../../src/poker/Deck';

const fullDeck = [
  new Card('A', 's'), new Card('A', 'c'), new Card('A', 'h'), new Card('A', 'd'),
  new Card('K', 's'), new Card('K', 'c'), new Card('K', 'h'), new Card('K', 'd'),
  new Card('Q', 's'), new Card('Q', 'c'), new Card('Q', 'h'), new Card('Q', 'd'),
  new Card('J', 's'), new Card('J', 'c'), new Card('J', 'h'), new Card('J', 'd'),
  new Card('T', 's'), new Card('T', 'c'), new Card('T', 'h'), new Card('T', 'd'),
  new Card('9', 's'), new Card('9', 'c'), new Card('9', 'h'), new Card('9', 'd'),
  new Card('8', 's'), new Card('8', 'c'), new Card('8', 'h'), new Card('8', 'd'),
  new Card('7', 's'), new Card('7', 'c'), new Card('7', 'h'), new Card('7', 'd'),
  new Card('6', 's'), new Card('6', 'c'), new Card('6', 'h'), new Card('6', 'd'),
  new Card('5', 's'), new Card('5', 'c'), new Card('5', 'h'), new Card('5', 'd'),
  new Card('4', 's'), new Card('4', 'c'), new Card('4', 'h'), new Card('4', 'd'),
  new Card('3', 's'), new Card('3', 'c'), new Card('3', 'h'), new Card('3', 'd'),
  new Card('2', 's'), new Card('2', 'c'), new Card('2', 'h'), new Card('2', 'd'),
];

describe('creates a', () => {
  test('full deck', () => {
    const deck = new Deck();

    expect(deck.cards).toEqual(fullDeck);
  });

  test('deck with holes', () => {
    const deck = new Deck([new Card('A', 's'), new Card('A', 'c')]);
    fullDeck.shift();
    fullDeck.shift();

    expect(deck.cards).toEqual(fullDeck);
  });
});
