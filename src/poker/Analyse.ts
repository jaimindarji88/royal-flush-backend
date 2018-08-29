import _ from 'lodash';

import Card from './Card';

import { ICards } from './constants';

export interface IHash {
  [key: number] : number
}

export interface IAnalysis {
  cards: Card[];
  high_card: Card;
  pair: boolean;
  two_pair: boolean;
  set: boolean;
  quads: boolean;
  straight: boolean;
  flush: boolean;
  full_house: boolean;
  straight_flush: boolean;
  rank: number;
  [key:string]: boolean | Card | Card[] | number;
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
    const hash:IHash = {};
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
  public analysed: IAnalysis;
  private highCard: Card;

  constructor(public cards: Card[]) {
    this.cards    = AnalyseCards.sortCards(cards);
    this.valHash  = AnalyseCards.cardsToValueHash(cards);
    this.suitHash = AnalyseCards.cardsToSuitHash(cards);
    this.highCard = _.last(this.cards) as Card;

    this.analysed = {
      cards: this.cards,
      high_card: this.highCard,
      pair: false,
      two_pair: false,
      set: false,
      quads: false,
      straight: false,
      straight_flush: false,
      full_house: false,
      flush: false,
      rank: 0,
    };

    this.analyse();
  }

  private analyse(): void {
    let count = 0;
    for (const val in this.valHash) {
      if (this.valHash[val] === 2) {
        this.analysed.pair = true;
        this.analysed.rank = 1;
        count += 1;
        if (count > 1) {
          this.analysed.pair = false;
          this.analysed.two_pair = true;
          this.analysed.rank = 2;
        }
      } else if(this.valHash[val] === 3) {
        this.analysed.set = true;
        this.analysed.rank = 3;
      } else if(this.valHash[val] === 4) {
        this.analysed.quads = true;
        this.analysed.rank = 7;
      }
    }

    if (this.detectStraight()) {
      this.analysed.straight = true;
      this.analysed.rank = 4;
    }

    for (const suit in this.suitHash) {
      if (this.suitHash[suit] === 5) {
        this.analysed.flush = true;
        this.analysed.rank = 5;
      }
    }

    if (this.analysed.pair && this.analysed.set) {
      this.analysed.full_house = true;
      this.analysed.rank = 6;
    }

    if (this.analysed.straight && this.analysed.flush) {
      this.analysed.straight_flush = true;
      this.analysed.rank = 8;
    }
  }

  private detectStraight():boolean {
    let continuous = 0;
    const vals = Object.keys(this.valHash).sort();
    for (let i = 0; i < vals.length - 1; i += 1) {
      if (vals[i] + 1 === vals[i + 1]) {
        continuous += 1;
      }
    }

    if (continuous === 5) {
      return true;
    }
    return false;
  }
}