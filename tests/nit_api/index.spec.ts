import { nit } from '../../src/nit_api';

describe('testing the pokerstove api in nodejs', async () => {
  test('Two random hands should have a ~ 50/50 win rate', async () => {
    const odds = await nit(['.', '.'], 'As3s4c6c9d');

    expect(odds.hands.length).toBe(2);
    expect(odds.hands[0].hand).toBe('random');
    expect(odds.hands[0].win).toBeCloseTo(0.49, 1);
    expect(odds.hands[1].win).toBeCloseTo(0.49, 1);
  });

  test('AsAc vs random hand with a random board', async () => {
    const odds = await nit(['AsAc', '.'], '4s2c4d9hJs');

    expect(odds.hands.length).toBe(2);

    expect(odds.hands[0].win).toBeCloseTo(0.91, 1);
    expect(odds.hands[1].win).toBeCloseTo(0.097, 1);
  });

  test('five different hands', async () => {
    const odds = await nit(['AsAc', 'KsKc', 'TsTc', 'JsJc', '3s3c']);

    expect(odds.hands.length).toBe(5);
  });

  test('three hands and a board', async () => {
    const data = { hands: ['QsQc', '5d3s', '8c9h'], board: 'AsKcTd3c4c' };

    const odds = await nit(data.hands, data.board);

    expect(odds.hands.length).toBe(3);
  });
});
