if (!Array.prototype.partition) {
   Array.prototype.partition = function <T>(
      this: T[],
      handler: (item: T, index: number, array: T[]) => boolean,
   ): [T[], T[]] {
      const trueResults: T[] = [];
      const falseResults: T[] = [];

      for (let i = 0; i < this.length; i++) {
         if (handler(this[i], i, this)) {
            trueResults.push(this[i]);
         } else {
            falseResults.push(this[i]);
         }
      }

      return [trueResults, falseResults];
   };
}

export {};
