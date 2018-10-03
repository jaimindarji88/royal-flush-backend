import addon from './addon';

export const nit = async function (hands: string[] = [], board: string = '') {
  const obj = {
    hands,
    board,
  };

  return addon.calculateOdds(obj);
};
