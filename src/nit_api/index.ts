import addon from './addon';

export const nit = async function (hands: string[], board: string = '') {
  const obj = {
    hands: hands,
    board: board
  };
  
  return addon.calculateOdds(obj);
};
