"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iter = require('es-iter');
const random_js_1 = __importDefault(require("random-js"));
const Analyse_1 = __importDefault(require("./Analyse"));
const constants_1 = require("./constants");
function* generateRandomBoards(deck, boardLength, n) {
    for (let i = 0; i < n; i += 1) {
        yield random_js_1.default.sample(deck.engine, deck.cards, boardLength);
    }
}
exports.generateRandomBoards = generateRandomBoards;
function createHistogram(deck, hand, iters = 1000) {
    const histogram = Object.assign({}, constants_1.HISTOGRAM);
    for (const board of generateRandomBoards(deck, 5, iters)) {
        const analysedHand = new Analyse_1.default(board.concat(hand));
        const { rankName } = analysedHand;
        if (rankName in histogram) {
            histogram[rankName] += 1;
        }
    }
    for (const key in histogram) {
        histogram[key] /= iters;
        histogram[key] *= 100;
        histogram[key] = Math.round(histogram[key] * 100) / 100;
    }
    return histogram;
}
exports.createHistogram = createHistogram;
//# sourceMappingURL=utilities.js.map