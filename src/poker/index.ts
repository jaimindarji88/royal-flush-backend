import _ from 'lodash';

import Card from './Card';
import Deck from './Deck';
import {
  createHistogram,
  generateRandomBoards,
  calcOdds,
  randomOdds,
} from './utilities';
import { nit } from '../nit_api';

interface IHistInput {
  hand: string;
  others: string[];
  board: string;
  seed?: number;
}

interface IOddsInput {
  hands: string[];
  board: string;
}

export function histogram(
  { hand, others = [], board = '', seed = undefined }: IHistInput,
  iters: number,
) {
  const myCards = Card.stringToCards(hand);
  const otherCards = others.map(h => Card.stringToCards(h));

  const boardCards = board ? Card.stringToCards(board) : [];

  const deck = new Deck(
    myCards.concat(_.flatten(otherCards)).concat(boardCards),
    seed,
  );

  return createHistogram(deck, myCards, boardCards, iters);
}

export function handOdds({ hands, board = '' }: IOddsInput, iters: number) {
  const cardHands = hands.map(hand => Card.stringToCards(hand));
  const deck = new Deck(_.flatten(cardHands));
  let i = iters;

  let randCount = 0;
  hands.forEach((hand: string) => {
    if (hand === '.') {
      randCount += 1;
    }
  });

  if (hands.length >= 3) {
    i = 150;
  }

  if (randCount >= 2) {
    return randomOdds(deck, cardHands[0], randCount, board);
  }
  return calcOdds(deck, hands, board, i);
}
