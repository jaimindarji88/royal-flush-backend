"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("./poker/utilities");
const Deck_1 = __importDefault(require("./poker/Deck"));
function histogram(hand, others, iters = 1000) {
    const deck = new Deck_1.default(hand.concat(others));
    return utilities_1.createHistogram(deck, hand, iters);
}
exports.histogram = histogram;
//# sourceMappingURL=index.js.map