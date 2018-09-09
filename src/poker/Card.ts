import {SUIT_INDEX, SUIT_INDEX_VALS} from './constants';

export default class Card {

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

  constructor(val:string | null, s:string | null) {
    if (val && s) {
      this.value = SUIT_INDEX_VALS[val];
      this.suit  = SUIT_INDEX[s];
      this.string = val + s;
    } else {
      this.value = 0;
      this.suit  = 0;
      this.string = 'random';
    }
  }

  public isHidden() {
    return (this.value + this.suit) === 0;
  }

  public exact_equals(other: Card) {
    return (
      this.value === other.value &&
      this.suit  === other.suit
    );
  }

  public eql(other: Card) {
    return (this.value === other.value);
  }

  public gt(other: Card) {
    return (this.value > other.value);
  }

  public lt(other: Card) {
    return (this.value < other.value);
  }
}
