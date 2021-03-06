import Iter from 'es-iter';

import _ from 'lodash';
import Random from 'random-js';

import Analyse from './Analyse';
import Card from './Card';
import Deck from './Deck';
import { nit } from '../nit_api';

import { HISTOGRAM, IHistogram } from './constants';

export function* generateRandomBoards(
  deck: Deck,
  boardLength: number,
  n: number,
): IterableIterator<Card[]> {
  for (let i = 0; i < n; i += 1) {
    yield Random.sample(deck.engine, deck.cards, 5 - boardLength);
  }
}

export function createHistogram(
  deck: Deck,
  hand: Card[],
  board: Card[] = [],
  iters = 1000,
) {
  const histogram: IHistogram = { ...HISTOGRAM };

  if (board.length === 5) {
    const finalBoard = hand.concat(board);
    const analysedHand = new Analyse(finalBoard);
    const { rankName } = analysedHand;
    histogram[rankName] = 100;
  } else {
    for (const genBoard of generateRandomBoards(deck, board.length, iters)) {
      const finalBoard = genBoard.concat(hand).concat(board);
      const analysedHand = new Analyse(finalBoard);
      const { rankName } = analysedHand;
      if (rankName in histogram) {
        histogram[rankName] += 1;
      }
    }

    for (const key in histogram) {
      histogram[key] /= iters;
      histogram[key] *= 100;
      histogram[key] = Math.round(histogram[key] * 100) / 100;
    }
  }

  return histogram;
}

export async function calcOdds(
  deck: Deck,
  hands: Card[][],
  board: string = '',
  iters: number = 1000,
) {
  const handsStrings = hands.map(hand => Card.cardsToString(hand));

  const oddsList = Array(hands.length)
    .fill(0)
    .map((_, index) => ({
      win: 0,
      tie: 0,
      hand: Card.handIsHidden(hands[index]) ? 'random' : handsStrings[index],
    }));

  if (board.length === 10) {
    const odds = await nit(handsStrings, board);
    return odds.hands;
  }

  for (const genBoard of generateRandomBoards(deck, board.length / 2, iters)) {
    const newBoard = Card.cardsToString(genBoard) + board;

    const odds = await nit(handsStrings, newBoard);
    odds.hands.forEach(foundOdds => {
      const { hand, win, tie } = foundOdds;
      oddsList.forEach(savedHands => {
        if (hand !== savedHands.hand) return;
        savedHands.win += win;
        savedHands.tie += tie;
      });
    });
  }

  oddsList.forEach(odds => {
    odds.win /= iters;
    odds.tie /= iters;
  });

  return oddsList;
}

export async function randomOdds(
  deck: Deck,
  playerHand: Card[],
  numRandom: number,
  board: string = '',
) {
  const playerString = Card.cardsToString(playerHand);
  const handCombinations = [];
  const BOARD_ITERS = 12;

  const oddsList = [
    {
      win: 0,
      tie: 0,
      hand: playerString,
    },
  ];

  for (let i = 0; i < numRandom; i += 1) {
    const handsComb = genRandomHands(deck).toArray();

    const randomHands = Random.shuffle(deck.engine, handsComb);
    handCombinations.push(randomHands);

    oddsList.push({
      win: 0,
      tie: 0,
      hand: 'random',
    });
  }

  const [first, ...rest] = handCombinations;
  const zippedHands = Iter.zip(first, ...rest);

  let count = 0;
  for (const currentHands of zippedHands) {
    const flatHands = _.flatten(currentHands) as Card[];
    if (_.uniqBy(flatHands, 'string').length !== flatHands.length) {
      continue;
    }

    const hands = currentHands.map((hand: Card[]) => Card.cardsToString(hand));
    hands.unshift(playerString);

    const boardDeck = new Deck(playerHand.concat(flatHands));
    for (const genBoard of generateRandomBoards(
      boardDeck,
      board.length / 2,
      BOARD_ITERS,
    )) {
      const odds = await nit(hands, Card.cardsToString(genBoard) + board);
      for (let i = 0; i < odds.hands.length; i += 1) {
        oddsList[i].win += odds.hands[i].win;
        oddsList[i].tie += odds.hands[i].tie;
      }
      count += 1;
    }
  }

  const randomVal = { win: 0, tie: 0 };
  oddsList.forEach(odd => {
    if (odd.hand === 'random') {
      randomVal.win += odd.win;
      randomVal.tie += odd.tie;
    }
  });

  randomVal.win = randomVal.win / count / numRandom;
  randomVal.tie = randomVal.tie / count;

  return oddsList.map(odds => ({
    hand: odds.hand,
    win: odds.hand === 'random' ? randomVal.win : odds.win / count,
    tie: odds.hand === 'random' ? randomVal.tie : odds.tie / count,
  }));
}

interface IRandomOdds {
  deck: Deck;
  playerHand: Card[];
  numRandom: number;
  board?: string;
}

export function genRandomHands(deck: Deck) {
  return new Iter(deck.cards).combinations(2);
}
