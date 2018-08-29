const Iter =  require('es-iter');
import _ from 'lodash';

import Card from './Card';
import { SUIT_INDEX, VALS } from './constants';
import Random from './Random';

import { MT19937 } from 'random-js';

export default class Deck {

  public static generateHoleCards(deck: Deck, numHidden: number = 2):Card[] {
    return new Iter(deck.cards).combinations(numHidden * 2);
  }

  public cards: Card[];
  public random: MT19937;
  constructor(holeCards: Card[] = [], seed:number | null = null) {
    this.cards = this.generateDeck(holeCards);
    if (seed) {
      this.random = Random.seed(seed);
    } else {
      this.random = Random.autoSeed();
    }
  }

  public pickCard() {
    const card = this.random.pick(this.cards);
    this.cards = this.cards.filter(c => !c.exact_equals(card));
    return card;
  }

  public add(cards: Card[]) {
    this.cards = this.cards.concat(cards);
  }

  private generateDeck(holeCards: Card[]) {
    const deck:Card[] = [];
    for (const suit of Object.keys(SUIT_INDEX)) {
      for (const value of VALS) {

        const card = new Card(value, suit);
        for (const holeC of holeCards) {
          if (!card.exact_equals(holeC)) {
            deck.push(card);
          }
        }
      };
    }

    return deck;
  }
}
