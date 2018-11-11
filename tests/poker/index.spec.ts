import { handOdds } from '../../src/poker';

import Card from '../../src/poker/Card';
import Deck from '../../src/poker/Deck';

const hand = [new Card('K', 's'), new Card('K', 'd')];
const deck = new Deck(hand, 1337);

test('calculated the odds of AsAc winning vs a random hand', async () => {
  const data = {
    hands: ['AsAc', '.'], board: '',
  };

  // const odds = await handOdds(data, 1000);

  // console.log(odds);

  // expect(1).toBe(2);
});
