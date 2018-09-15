import { pokerstove } from '../../src/pokerstove_api';
import { psEval, random } from '../../src/pokerstove_api/constants';

test('get the path to ps_eval source', () => {
  const psEvalString = './pokerstove/build/bin/ps-eval';

  expect(psEval).toEqual(psEvalString);
});

describe('testing the pokerstove api in nodejs', () => {
  test('Two random hands should have a 50/50 win rate', async () => {
    const result = {
      hands: [{
        hand: 'random',
        win: '50',
        loss: '50',
      }, {
        hand: 'random',
        win: '50',
        loss: '50',
      }],
    };

    const odds = pokerstove(['.', '.']);

    expect(result).toEqual(odds);
  });
});
