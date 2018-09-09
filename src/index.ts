import Card from './poker/Card';
import { createHistogram } from './poker/utilities';
import Deck from './poker/Deck';

export function histogram(hand: Card[], others: Card[], iters:number = 1000) {
  const deck = new Deck(hand.concat(others));

  return createHistogram(deck, hand, iters);
}
