import _ from 'lodash';

import Card from './Card';
import Deck from './Deck';
import { createHistogram } from './utilities';

export const histogram = function (
  myHand: string, otherHands: string[], board: string = '', iters = 1000,
) {
  const myCards = Card.stringToCards(myHand);
  const otherCards = otherHands.map(hand => Card.stringToCards(hand));
  const boardCards = Card.stringToCards(board);

  const deck = new Deck(myCards.concat(_.flatten(otherCards)).concat(boardCards));

  return createHistogram(deck, myCards, iters);
};
