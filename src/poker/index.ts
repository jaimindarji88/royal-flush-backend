import _ from 'lodash';

import Card from './Card';
import Deck from './Deck';
import { createHistogram, generateRandomBoards, calcOdds } from './utilities';
import { nit } from '../nit_api';

interface IHistInput {
  myHand: string;
  otherHands: string[];
  board: string;
}

interface IOddsInput {
  hands: string[];
  board: string;
}

export function histogram({ myHand, otherHands, board }: IHistInput, iters: number) {
  const myCards = Card.stringToCards(myHand);
  const otherCards = otherHands.map(hand => Card.stringToCards(hand));
  const boardCards = Card.stringToCards(board);

  const deck = new Deck(
    myCards.concat(_.flatten(otherCards)).concat(boardCards),
  );

  return createHistogram(deck, myCards, iters);
}

export function handOdds({ hands, board = '' }: IOddsInput, iters: number) {
  const cardHands = hands.map(hand => Card.stringToCards(hand));
  const deck = new Deck(_.flatten(cardHands));

  return calcOdds(deck, hands, board, iters);
}
