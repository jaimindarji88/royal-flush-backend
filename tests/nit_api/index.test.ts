import { nit } from '../../src/nit_api';


describe('testing the pokerstove api in nodejs', async () => {
  test('Two random hands should have a ~ 50/50 win rate', async () => {
    const odds = await nit(['.', '.'], 'As3s4c6c9d');

    expect(odds.hands.length).toBe(2);
    expect(odds.hands[0].hand).toBe('random');
    expect(odds.hands[0].win).toBeCloseTo(0.49, 1)
    expect(odds.hands[1].win).toBeCloseTo(0.49, 1)
  });
  
});
