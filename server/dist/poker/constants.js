"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUIT_VALS = ['s', 'c', 'h', 'd'];
exports.SUIT_INDEX = { s: 0, c: 1, h: 2, d: 3 };
exports.VALS = 'AKQJT98765432';
exports.SUIT_INDEX_VALS = {
    2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
    7: 7, 8: 8, 9: 9,
    T: 10, J: 11, Q: 12, K: 13, A: 14,
};
exports.HISTOGRAM = {
    high_card: 0,
    pair: 0,
    two_pair: 0,
    set: 0,
    straight: 0,
    flush: 0,
    full_house: 0,
    quads: 0,
    straight_flush: 0,
    royal_flush: 0,
};
exports.handRanks = {
    0: 'high_card',
    1: 'pair',
    2: 'two_pair',
    3: 'set',
    4: 'straight',
    5: 'flush',
    6: 'full_house',
    7: 'quads',
    8: 'straight_flush',
    9: 'royal_flush',
};
//# sourceMappingURL=constants.js.map