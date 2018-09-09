"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class Card {
    static handIsHidden(hand) {
        for (const card of hand) {
            if (!card.isHidden()) {
                return false;
            }
        }
        return true;
    }
    constructor(val, s) {
        if (val && s) {
            this.value = constants_1.SUIT_INDEX_VALS[val];
            this.suit = constants_1.SUIT_INDEX[s];
            this.string = val + s;
        }
        else {
            this.value = 0;
            this.suit = 0;
            this.string = 'random';
        }
    }
    isHidden() {
        return (this.value + this.suit) === 0;
    }
    exact_equals(other) {
        return (this.value === other.value &&
            this.suit === other.suit);
    }
    eql(other) {
        return (this.value === other.value);
    }
    gt(other) {
        return (this.value > other.value);
    }
    lt(other) {
        return (this.value < other.value);
    }
}
exports.default = Card;
//# sourceMappingURL=Card.js.map