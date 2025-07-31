if (!Array.prototype.filterAndMap) {
   Array.prototype.filterAndMap = function <T, U>(
      this: T[],
      handler: (item: T, index: number, array: T[]) => U | undefined,
   ): Exclude<U, undefined>[] {
      const result: Exclude<U, undefined>[] = [];
      for (let i = 0; i < this.length; i++) {
         const mapped = handler(this[i], i, this);
         if (isDefined(mapped)) {
            result.push(mapped);
         }
      }
      return result;
   };
}

function isDefined<T>(value: T): value is Exclude<T, undefined> {
   return value !== undefined;
}

export {};
