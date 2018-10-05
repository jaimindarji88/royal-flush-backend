const addon = require('../../build/Release/nit-addon.node');

export interface IObj {
  hands: string[];
  board: string;
}

export interface ICalculateOdds {
  hands: {
    hand: string;
    win: number;
    tie: number;
  }[];
}

export interface Nit {
  calculateOdds(obj: { hands: string[]; board: string }): ICalculateOdds;
}

const nitAddon:Nit = addon;

export default nitAddon;
