const iter = require('es-iter');
import _ from 'lodash';
import Random from 'random-js';

import Analyse from './Analyse';
import Card from './Card';
import Deck from './Deck';
import { nit } from '../nit_api';

import { HISTOGRAM, IHistogram } from './constants';

export function* generateRandomBoards(
  deck: Deck,
  boardLength: number,
  n: number,
): IterableIterator<Card[]> {
  for (let i = 0; i < n; i += 1) {
    yield Random.sample(deck.engine, deck.cards, 5 - boardLength);
  }
}

export function createHistogram(
  deck: Deck,
  hand: Card[],
  board: Card[] = [],
  iters = 1000,
) {
  const histogram: IHistogram = { ...HISTOGRAM };

  if (board.length === 5) {
    const finalBoard = hand.concat(board);
    const analysedHand = new Analyse(finalBoard);
    const { rankName } = analysedHand;
    histogram[rankName] = 100;
  } else {
    for (const genBoard of generateRandomBoards(deck, board.length, iters)) {
      const finalBoard = genBoard.concat(hand).concat(board);
      const analysedHand = new Analyse(finalBoard);
      const { rankName } = analysedHand;
      if (rankName in histogram) {
        histogram[rankName] += 1;
      }
    }

    for (const key in histogram) {
      histogram[key] /= iters;
      histogram[key] *= 100;
      histogram[key] = Math.round(histogram[key] * 100) / 100;
    }
  }

  return histogram;
}

export async function calcOdds(
  deck: Deck,
  hands: string[],
  board: string = '',
  iters: number = 1000,
) {
  const oddsList = Array(hands.length)
    .fill(0)
    .map((_, index) => {
      return {
        win: 0,
        tie: 0,
        hand: hands[index] === '.' ? 'random' : hands[index],
      };
    });

  for (const genBoard of generateRandomBoards(deck, board.length / 2, iters)) {
    const newBoard = Card.cardsToString(genBoard) + board;
    const odds = await nit(hands, Card.cardsToString(genBoard));
    odds.hands.forEach(foundOdds => {
      const { hand, win, tie } = foundOdds;
      oddsList.forEach(savedHands => {
        if (hand !== savedHands.hand) return;
        savedHands.win += win;
        savedHands.tie += tie;
      });
    });
  }

  oddsList.forEach(odds => {
    odds.win /= iters;
    odds.tie /= iters;
  });

  return oddsList;
}
