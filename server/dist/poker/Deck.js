"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Iter = require('es-iter');
const Card_1 = __importDefault(require("./Card"));
const constants_1 = require("./constants");
const engine_1 = __importDefault(require("./engine"));
const random_js_1 = __importDefault(require("random-js"));
class Deck {
    constructor(holeCards = [], seed = null) {
        this.cards = this.generateDeck(holeCards);
        if (seed) {
            this.engine = engine_1.default.seed(seed);
        }
        else {
            this.engine = engine_1.default.autoSeed();
        }
    }
    generateHoleCards(numHidden = 2) {
        return new Iter(this.cards).combinations(numHidden * 2);
    }
    pickCard() {
        this.cards = random_js_1.default.shuffle(this.engine, this.cards);
        return this.cards.pop();
    }
    add(cards) {
        this.cards = this.cards.concat(cards);
    }
    generateDeck(holeCards) {
        const deck = [];
        for (const val of constants_1.VALS) {
            for (const suit of constants_1.SUIT_VALS) {
                const card = new Card_1.default(val, suit);
                let skip = false;
                for (const hc of holeCards) {
                    if (hc.exact_equals(card)) {
                        skip = true;
                    }
                }
                if (skip) {
                    continue;
                }
                deck.push(card);
            }
        }
        return deck;
    }
}
exports.default = Deck;
//# sourceMappingURL=Deck.js.map