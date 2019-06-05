import _ from 'lodash';

import { calcOdds } from '../../src/poker/utilities';
import Card from '../../src/poker/Card';
import Deck from '../../src/poker/Deck';

test('calculated the odds of AsAc winning vs a random hand', async () => {
  const hand = [new Card('A', 's'), new Card('A', 'c')];

  const data = {
    hands: [hand, [new Card()]],
    board: '',
  };

  const deck = new Deck(_.flatten(data.hands), 1337);
  const odds = await calcOdds(deck, data.hands);

  expect(odds[0].win).toBeCloseTo(0.852, 2);
});
