const iter = require('es-iter');
import _ from 'lodash';
import Random from 'random-js';

import Analyse from './Analyse';
import Card from './Card';
import Deck from './Deck';

import { HISTOGRAM, IHistogram } from './constants';

export
function *generateRandomBoards(deck:Deck, boardLength:number, n:number):IterableIterator<Card[]> {
  for (let i = 0; i < n; i += 1) {
    yield Random.sample(deck.engine, deck.cards, boardLength);
  }
}

export function createHistogram(deck: Deck, hand: Card[], iters = 1000) {

  const histogram:IHistogram = { ...HISTOGRAM };

  for (const board of generateRandomBoards(deck, 5, iters)) {

    const analysedHand =  new Analyse(board.concat(hand));
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

  return histogram;
}
