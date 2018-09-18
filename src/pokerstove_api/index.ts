import { execAsync } from '../utilities';
import { psEval, random } from './constants';

export const pokerstove = async function (hands: string[], board: string = '') {
  const handsString = hands.join(' ');
  if (handsString.includes(random) && !board) {
    return {
      error: 'board must be included when calculating a random hand',
    };
  }

  let api = `${psEval} ${hands.join(' ')}`;
  if (board) {
    api = `${api} --board ${board}`;
  }

  const result = await execAsync(api, { silent: true, async: true });

  try {
    return JSON.parse(result);
  } catch (e) {
    return e;
  }
};
