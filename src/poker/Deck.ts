const Iter =  require('es-iter');
import _ from 'lodash';

import Card from './Card';
import {SUIT_INDEX, VALS} from './constants';
import Random from './random';

export default class Deck {

  public static generateHoleCards(deck: Deck, numHidden: number = 2):Card[] {
    return new Iter(deck.cards).combinations(numHidden * 2);
  }

  public cards: Card[];
  constructor(holeCards: Card[] = []) {
    this.cards = this.generateDeck(holeCards);
  }

  public pickCard() {
    const card = Random.pick(this.cards);
    this.cards = this.cards.filter(c => !c.exact_equals(card));
    return card;
  }

  public add(cards: Card[]) {
    this.cards = this.cards.concat(cards);
  }

  private generateDeck(holeCards: Card[]) {
    const deck:Card[] = []
    for (const suit of Object.keys(SUIT_INDEX)) {
      for (const value of VALS) {

        const card = new Card(value, suit)
        for (const holeC of holeCards) {
          if (!card.equals(holeC)) {
            deck.push(card)
          }
        }

      } 
    }

    return deck;
  }
}