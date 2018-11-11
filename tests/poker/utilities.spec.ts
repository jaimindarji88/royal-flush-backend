import { createHistogram } from '../../src/poker/utilities';
import Card from '../../src/poker/Card';
import Deck from '../../src/poker/Deck';

describe('Creates a histogram for a given hand', () => {
  const hand = [new Card('K', 's'), new Card('K', 'd')];
  const deck = new Deck(hand, 1337);

  test('histogram is correct', () => {
    const histogram = createHistogram(deck, hand);

    expect(histogram).toEqual({
      flush: 0,
      full_house: 6.7,
      high_card: 0,
      pair: 38.4,
      quads: 0.5,
      royal_flush: 0,
      set: 14.1,
      straight: 0,
      straight_flush: 0,
      two_pair: 40.3,
    });
  });
});
