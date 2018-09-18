import _ from 'lodash';

import Card from './Card';
import { handRanks } from './constants';

export interface IHash {
  [key: number]: number;
}

export default class AnalyseCards {

  public static cardsToSuitHash(cards: Card[]) {
    const hash: IHash = {};

    cards.forEach((card) => {
      if (hash[card.suit] in hash) {
        hash[card.suit] += 1;
      } else {
        hash[card.suit] = 1;
      }
    });

    return hash;
  }

  public static cardsToValueHash(cards: Card[]) {
    const hash: IHash = {};
    cards.forEach((card) => {
      if (card.value in hash) {
        hash[card.value] += 1;
      } else {
        hash[card.value] = 1;
      }
    });
    return hash;
  }

  public static sortCards(cards: Card[]): Card[] {
    return cards.map(x => x).sort((a, b) => {
      if (a.value > b.value) {
        return 1;
      } else if (a.value < b.value) {
        return -1;
      } else if (a.suit > b.suit) {
        return 1;
      }
      return 0;
    });
  }

  public valHash: IHash;
  public suitHash: IHash;
  public rank: number;
  public rankName: string;

  constructor(public cards: Card[]) {
    this.cards = AnalyseCards.sortCards(cards);
    this.valHash = AnalyseCards.cardsToValueHash(cards);
    this.suitHash = AnalyseCards.cardsToSuitHash(cards);

    this.rank = this.analyse();
    this.rankName = handRanks[this.rank];
  }

  private analyse(): number {
    let count = 0;
    let rank = 0;

    let pair;
    let straight;
    let set;
    let flush;

    for (const val in this.valHash) {
      if (this.valHash[val] === 2) {
        pair = true;
        rank = 1;
        count += 1;
        if (count > 1) {
          rank = 2;
        }
      } else if (this.valHash[val] === 3) {
        set = true;
        rank = 3;
      } else if (this.valHash[val] === 4) {
        rank = 7;
      }
    }

    if (this.detectStraight()) {
      straight = true;
      rank = 4;
    }

    for (const suit in this.suitHash) {
      if (this.suitHash[suit] === 5) {
        flush = true;
        rank = 5;
      }
    }

    if (pair && set) {
      rank = 6;
    }

    if (straight && flush) {
      rank = 8;

      if (this.detectRoyal()) {
        rank = 9;
      }
    }

    return rank;
  }

  private detectStraight(): boolean {
    let continuous = 0;
    const vals = Object.keys(this.valHash).sort();
    for (let i = 0; i < vals.length - 1; i += 1) {
      if (vals[i] + 1 === vals[i + 1]) {
        continuous += 1;
      }
    }

    if (continuous >= 5) {
      return true;
    }
    return false;
  }

  private detectRoyal(): boolean {
    const royal = ['10', 'J', 'Q', 'K', 'A'];
    const getSuit = _.maxBy(Object.entries(this.suitHash), e => e[1]);

    if (getSuit) {
      for (const val of royal) {
        const card = new Card(val, getSuit[0]);

        if (!_.includes(this.cards, card)) {
          return false;
        }
      }
    }
    return true;
  }
}
