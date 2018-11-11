import addon from './addon';

export async function nit(hands: string[] = [], board: string = '') {
  const obj = {
    hands,
    board,
  };

  return addon.calculateOdds(obj);
}
