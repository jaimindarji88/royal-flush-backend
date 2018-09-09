import { psEval } from '../../src/constants';

test('get the path to ps_eval source', () => {
  const psEvalString = './pokerstove/build/bin/ps-eval';

  expect(psEval).toEqual(psEvalString);
});
