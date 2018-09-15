import { psEval, random } from './constants';

import shell from 'shelljs';

export const pokerstove = function (hands: string[], board: string = '') {
  const api = `${psEval} ${hands.join(' ')}`;
  const result = shell.exec(api, { silent: true });

  return JSON.parse(<string>result.stdout);
};
