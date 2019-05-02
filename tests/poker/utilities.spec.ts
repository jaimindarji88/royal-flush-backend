import {
  createHistogram,
  genRandomHands,
  randomOdds,
} from '../../src/poker/utilities';
import Card from '../../src/poker/Card';
import Deck from '../../src/poker/Deck';
import { Iter } from 'es-iter';

describe('Creates a histogram for a given hand', () => {
  const hand = [new Card('K', 's'), new Card('K', 'd')];
  const deck = new Deck(hand, 1337);

  test('histogram is correct', () => {
    const histogram = createHistogram(deck, hand);

    expect(histogram).toEqual({
      flush: 1.8,
      full_house: 6.7,
      high_card: 0,
      pair: 34.5,
      quads: 0.5,
      royal_flush: 0,
      set: 14,
      straight: 2.5,
      straight_flush: 0.2,
      two_pair: 39.8,
    });
  });

  test('should win 100% pair', () => {
    const board = [
      new Card('A', 's'),
      new Card('8', 's'),
      new Card('6', 'h'),
      new Card('4', 'd'),
      new Card('2', 'c'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 100,
      two_pair: 0,
      set: 0,
      straight: 0,
      flush: 0,
      full_house: 0,
      quads: 0,
      straight_flush: 0,
      royal_flush: 0,
    });
  });

  test('should win 100% 2 pair', () => {
    const board = [
      new Card('A', 's'),
      new Card('A', 'c'),
      new Card('6', 'h'),
      new Card('4', 'd'),
      new Card('2', 'c'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 0,
      two_pair: 100,
      set: 0,
      straight: 0,
      flush: 0,
      full_house: 0,
      quads: 0,
      straight_flush: 0,
      royal_flush: 0,
    });
  });

  test('should win 100% set', () => {
    const board = [
      new Card('A', 's'),
      new Card('K', 'c'),
      new Card('6', 'h'),
      new Card('4', 'd'),
      new Card('2', 'c'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 0,
      two_pair: 0,
      set: 100,
      straight: 0,
      flush: 0,
      full_house: 0,
      quads: 0,
      straight_flush: 0,
      royal_flush: 0,
    });
  });

  test('should win 100% lowest straight', () => {
    const board = [
      new Card('A', 's'),
      new Card('5', 'c'),
      new Card('4', 'h'),
      new Card('3', 'd'),
      new Card('2', 'c'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 0,
      two_pair: 0,
      set: 0,
      straight: 100,
      flush: 0,
      full_house: 0,
      quads: 0,
      straight_flush: 0,
      royal_flush: 0,
    });
  });

  test('should win 100% highest straight', () => {
    const board = [
      new Card('A', 's'),
      new Card('Q', 'c'),
      new Card('J', 'h'),
      new Card('T', 'd'),
      new Card('2', 'c'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 0,
      two_pair: 0,
      set: 0,
      straight: 100,
      flush: 0,
      full_house: 0,
      quads: 0,
      straight_flush: 0,
      royal_flush: 0,
    });
  });

  test('should win 100% mid straight', () => {
    const board = [
      new Card('6', 's'),
      new Card('7', 'c'),
      new Card('8', 'h'),
      new Card('9', 'd'),
      new Card('T', 'c'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 0,
      two_pair: 0,
      set: 0,
      straight: 100,
      flush: 0,
      full_house: 0,
      quads: 0,
      straight_flush: 0,
      royal_flush: 0,
    });
  });

  test('should win 100% flush', () => {
    const board = [
      new Card('A', 's'),
      new Card('J', 'd'),
      new Card('6', 'd'),
      new Card('4', 'd'),
      new Card('2', 'd'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 0,
      two_pair: 0,
      set: 0,
      straight: 0,
      flush: 100,
      full_house: 0,
      quads: 0,
      straight_flush: 0,
      royal_flush: 0,
    });
  });

  test('should win 100% full house', () => {
    const board = [
      new Card('A', 's'),
      new Card('A', 'd'),
      new Card('A', 'c'),
      new Card('4', 'd'),
      new Card('2', 'c'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 0,
      two_pair: 0,
      set: 0,
      straight: 0,
      flush: 0,
      full_house: 100,
      quads: 0,
      straight_flush: 0,
      royal_flush: 0,
    });
  });

  test('should win 100% quads', () => {
    const board = [
      new Card('K', 'c'),
      new Card('K', 'h'),
      new Card('5', 's'),
      new Card('8', 'h'),
      new Card('2', 'c'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 0,
      two_pair: 0,
      set: 0,
      straight: 0,
      flush: 0,
      full_house: 0,
      quads: 100,
      straight_flush: 0,
      royal_flush: 0,
    });
  });

  test('should win 100% straight flush', () => {
    const board = [
      new Card('A', 's'),
      new Card('5', 's'),
      new Card('4', 's'),
      new Card('3', 's'),
      new Card('2', 's'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 0,
      two_pair: 0,
      set: 0,
      straight: 0,
      flush: 0,
      full_house: 0,
      quads: 0,
      straight_flush: 100,
      royal_flush: 0,
    });
  });

  test('should win 100% of the time with royal flush', () => {
    const board = [
      new Card('A', 's'),
      new Card('J', 's'),
      new Card('Q', 's'),
      new Card('T', 's'),
      new Card('2', 'c'),
    ];

    const histogram = createHistogram(deck, hand, board);

    expect(histogram).toEqual({
      high_card: 0,
      pair: 0,
      two_pair: 0,
      set: 0,
      straight: 0,
      flush: 0,
      full_house: 0,
      quads: 0,
      straight_flush: 0,
      royal_flush: 100,
    });
  });
});

describe('generate random hands', () => {
  test('1326 different hands', () => {
    const deck = new Deck();
    const hands = genRandomHands(deck).toArray();

    expect(hands.length).toBe(1326);
  });
});

describe('generate random odds', () => {
  test('2 random people with no board', async () => {
    const hand = [new Card('K', 's'), new Card('K', 'd')];
    const deck = new Deck(hand);

    const odds = await randomOdds(deck, hand, 2);

    expect(odds[0].hand).toBe('KsKd');
    expect(odds[0].win).toBeCloseTo(0.68, 1);
    expect(odds[0].tie).toBeCloseTo(0.002, 2);

    expect(odds[1].hand).toBe('random');
    expect(odds[1].win).toBeCloseTo(0.15, 1);
    expect(odds[1].tie).toBeCloseTo(0.007, 2);
  });
});
