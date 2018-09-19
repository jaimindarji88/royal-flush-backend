const Iter = require('es-iter');
import _ from 'lodash';

import Card from './Card';
import { VALS, SUIT_VALS } from './constants';
import randomEngine from './engine';

import Random, { MT19937 } from 'random-js';

export default class Deck {
  public cards: Card[];
  public engine: MT19937;
  constructor(holeCards: Card[] = [], seed: number | null = null) {
    this.cards = this.generateDeck(holeCards);
    if (seed) {
      this.engine = randomEngine.seed(seed);
    } else {
      this.engine = randomEngine.autoSeed();
    }
  }

  public generateHoleCards(numHidden: number = 2): Card[] {
    return new Iter(this.cards).combinations(numHidden * 2);
  }

  public pickCard() {
    this.cards = Random.shuffle(this.engine, this.cards);
    return this.cards.pop();
  }

  public add(cards: Card[]) {
    this.cards = this.cards.concat(cards);
  }

  private generateDeck(holeCards: Card[]) {
    const deck: Card[] = [];
    for (const val of VALS) {
      for (const suit of SUIT_VALS) {
        const card = new Card(val, suit);
        let skip = false;

        for (const hc of holeCards) {
          if (hc.isHidden()) {
            continue;
          }

          if (hc.exact_equals(card)) {
            skip = true;
          }
        }
        if (skip) {
          continue;
        }
        deck.push(card);
      }
    }
    return deck;
  }
}
