declare module 'es-iter' {
  export class Iter<I> {
    constructor(iterable: Iterable<I>);

    static getIterator<T extends Object>(obj: T): Iter<T>;

    static isIterator<T extends Object>(obj: T): boolean;

    static isIterable<T extends Object>(obj: T): boolean;

    static isMultiIterable<T extends Object>(obj: T): boolean;

    static isClosable<T extends Object>(iterable: IterableIterator<T>): boolean;

    static closeIterator<T extends Object>(
      iterable: IterableIterator<T>,
    ): boolean;

    static keys<T extends Object>(obj: T): Iter<T>;

    static entries<T extends Object>(obj: T): Iter<T>;

    static values<T extends Object>(obj: T): Iter<T>;

    static reverse<T extends Object>(arr: T): Iter<T>;

    static range<T>(start: number, end: number, step: number): Iter<T>;

    static rangeRight<T>(start: number, end: number, step: number): Iter<T>;

    static zip<T, X>(
      iterable: IterableIterator<T>,
      ...others: IterableIterator<X>[]
    ): Iter<T>;

    static longZip<T, X>(
      iterable: IterableIterator<T>,
      ...others: IterableIterator<X>[]
    ): Iter<T>;

    static merge<T, X>(
      iterable: IterableIterator<T>,
      iterable2: IterableIterator<X>,
      comparator: (a: T, b: X) => boolean,
    ): Iter<T>;

    static count<T>(iterable: IterableIterator<T>): Iter<T>;

    static cycle<T>(iterable: IterableIterator<T>): Iter<T>;

    static repeat<T>(iterable: IterableIterator<T>): Iter<T>;

    enumerate(start: number): Iter<I>;
    accumulate(callback: (x: any, y: any) => any): Iter<I>;
    chain<T>(...iterables: IterableIterator<T>[]): Iter<I>;
    compress(selectors: any): Iter<I>;

    groupBy(key: (x: any) => any): Iter<I>;

    map(callback: (x: any) => any): Iter<I>;

    flatMap(callback: (x: any) => any): Iter<I>;

    combinations(len: number): Iter<I>;
  }
}
