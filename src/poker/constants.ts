export const SUIT_VALS = ['s', 'c', 'h', 'd'];
export const SUIT_INDEX:ISuits = { s: 0, c: 1, h: 2, d: 3 };
export const VALS = 'AKQJT98765432';

export const SUIT_INDEX_VALS:ICards = {
  2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
  7: 7, 8: 8, 9: 9,
  T: 10, J: 11, Q: 12, K: 13, A: 14,
};

export interface ISuits {
  s: 0;
  c: 1;
  h: 2;
  d: 3;
  [key: string]: number;
}

export interface ICards {
  2: 2;
  3: 3;
  4: 4;
  5: 5;
  6: 6;
  7: 7;
  8: 8;
  9: 9;
  T: 10;
  J: 11;
  Q: 12;
  K: 13;
  A: 14;
  [key: string]: number;
}
