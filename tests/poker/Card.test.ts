import Card from '../../src/poker/Card';

const lowCard = new Card('T', 'd');
const cards = [new Card('A', 's'), new Card('A', 'c')];

describe('Static methods', () => {
  test('string to cards', () => {
    expect(Card.stringToCards('AsAc')).toEqual(cards);
  });

  test('cards to string', () => {
    expect(Card.cardsToString(cards)).toEqual('AsAc');
  });

  test('hand is hidden', () => {
    const hiddenHand = [new Card(), new Card()];

    expect(Card.handIsHidden(hiddenHand)).toBe(true);
    expect(Card.handIsHidden(cards)).toBe(false);
  });
});

describe('Instance methods', () => {
  test('card is hidden', () => {
    const card = cards[0];
    const hiddenCard = new Card();

    expect(card.isHidden()).toBe(false);
    expect(hiddenCard.isHidden()).toBe(true);
  });

  test('exact equals', () => {
    const hand = [new Card('A', 's'), new Card('A', 'd')];

    expect(hand[0].exact_equals(cards[0])).toBe(true);
    expect(hand[1].exact_equals(cards[1])).toBe(false);
  });

  test('values are eqaul', () => {
    const card = new Card('A', 's');

    expect(card.eql(cards[0])).toBe(true);
    expect(card.eql(cards[1])).toBe(true);

    expect(lowCard.eql(card)).toBe(false);
  });

  test('value is gt than other card', () => {
    expect(cards[0].gt(lowCard)).toBe(true);
    expect(lowCard.gt(cards[0])).toBe(false);
  });

  test('value is lt than other card', () => {
    expect(cards[0].lt(lowCard)).toBe(false);
    expect(lowCard.lt(cards[0])).toBe(true);
  });
});
