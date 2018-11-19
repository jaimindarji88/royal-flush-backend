import addon from './addon';

export async function nit(hands: string[] = [], board: string = '') {
  const obj = {
    hands,
    board,
  };

  for (const hand of hands) {
    if (hand === '.' && board === '') {
      throw Error('The board cannot be empty with a random hand');
    }
  }

  return addon.calculateOdds(obj);
}
