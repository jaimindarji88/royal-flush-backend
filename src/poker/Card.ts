import _ from 'lodash';

import Hand from './Hand';
import { SUIT_INDEX, SUIT_INDEX_VALS, SUIT_VALS } from './constants';

export default class Card {
  public static stringToCards(str: string, seed?: number): Card[] {
    // returns a hand
    if (str.length === 3) {
      if (str[2] === 'o') {
        return new Hand(str, false, seed).cards;
      } else if (str[2] === 's') {
        return new Hand(str, true, seed).cards;
      }
    }

    const formatted = _.compact(str.split(/(\w[s|c|h|d])/));

    return formatted.map(card => new Card(card[0], card[1]));
  }

  public static cardsToString(cards: Card[]) {
    return cards.reduce((acc, cur) => acc + cur.string, '');
  }

  public static handIsHidden(hand: Card[]) {
    for (const card of hand) {
      if (!card.isHidden()) {
        return false;
      }
    }
    return true;
  }

  public readonly value: number;
  public readonly suit: number;
  public readonly string: string;

  constructor(val?: string, s?: string) {
    if (val && s) {
      this.value = SUIT_INDEX_VALS[val];
      this.suit = SUIT_INDEX[s];
      this.string = val + s;
    } else {
      this.value = 0;
      this.suit = 0;
      this.string = 'random';
    }
  }

  public isHidden() {
    return this.value + this.suit === 0;
  }

  public exact_equals(other: Card) {
    return this.value === other.value && this.suit === other.suit;
  }

  public eql(other: Card) {
    return this.value === other.value;
  }

  public gt(other: Card) {
    return this.value > other.value;
  }

  public lt(other: Card) {
    return this.value < other.value;
  }
}
