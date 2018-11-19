import _ from 'lodash';

import { calcOdds } from '../../src/poker/utilities';
import Card from '../../src/poker/Card';
import Deck from '../../src/poker/Deck';

test('calculated the odds of AsAc winning vs a random hand', async () => {
  const data = {
    hands: ['AsAc', '.'], board: '',
  };

  const holes = data.hands.map(hand => Card.stringToCards(hand));
  const deck = new Deck(_.flatten(holes), 1337);
  const odds = await calcOdds(deck, data.hands);

  expect(odds[0].win).toBeCloseTo(0.852, 2);
});
