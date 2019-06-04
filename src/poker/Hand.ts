import Random, { MT19937 } from 'random-js';

import Card from './Card';
import { SUIT_VALS } from './constants';
import randomEngine from './engine';

export default class Hand {
  public cards: Card[] = [];
  public engine: MT19937;

  constructor(str: string, suited: boolean = false, seed?: number) {
    if (seed) {
      this.engine = randomEngine.seed(seed);
    } else {
      this.engine = randomEngine.autoSeed();
    }

    if (suited) {
      this.createSuitedHand(str[0], str[1]);
    } else {
      this.createOffSuitHand(str[0], str[1]);
    }
  }

  private createOffSuitHand(first: string, second: string) {
    const suits = Random.shuffle(this.engine, SUIT_VALS);

    const firstSuit = suits.pop();
    const secondSuit = suits.pop();

    this.cards = [new Card(first, firstSuit), new Card(second, secondSuit)];
  }

  private createSuitedHand(first: string, second: string) {
    const suits = Random.shuffle(this.engine, SUIT_VALS);

    const suit = suits.pop();

    this.cards = [new Card(first, suit), new Card(second, suit)];
  }
}
