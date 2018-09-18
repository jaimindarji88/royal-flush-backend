import { pokerstove } from '../../src/pokerstove_api';
import { psEval, random } from '../../src/pokerstove_api/constants';

test('get the path to ps_eval source', () => {
  const psEvalString = './pokerstove/build/bin/ps-eval';

  expect(psEval).toEqual(psEvalString);
});

describe('testing the pokerstove api in nodejs', async () => {
  test('Two random hands should have a ~ 50/50 win rate', async () => {
    const result = {
      hands: [
        {
          hand: 'random',
          win: '49.640063913884454',
          tie: '0.35993608611554956',
        },
        {
          hand: 'random',
          win: '49.640063913884454',
          tie: '0.35993608611554956',
        },
      ],
    };

    const odds = await pokerstove(['.', '.'], 'As3s4c6c9d');

    expect(result).toEqual(odds);
  });

  test('Best hand vs Worst hand', async () => {
    const result = {
      hands: [
        {
          hand: 'AsAc',
          win: '88.736871490109237',
          tie: '0.23993987049028678',
        },
        {
          hand: '2s7c',
          win: '10.783248768910193',
          tie: '0.23993987049028678',
        },
      ],
    };

    const odds = await pokerstove(['AsAc', '2s7c']);

    expect(result).toEqual(odds);
  });
});
