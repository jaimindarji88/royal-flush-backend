import { psEval } from '../src/paths';

test('get the path to ps_eval source', () => {
  const psEvalString = 'pokerstove/build/bin/ps-eval';

  expect(psEval).toBe(psEvalString);
});