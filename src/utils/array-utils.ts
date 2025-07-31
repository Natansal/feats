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

if (!Array.prototype.groupBy) {
   Array.prototype.groupBy = function <T, K extends PropertyKey>(
      this: T[],
      keyFn: (item: T, index: number, array: T[]) => K,
   ): Record<K, T[]> {
      const groups = {} as Record<K, T[]>;

      for (let i = 0; i < this.length; i++) {
         const key = keyFn(this[i], i, this);
         (groups[key] ??= []).push(this[i]);
      }

      return new Proxy(groups, {
         get(target, prop) {
            if (prop in target) {
               return target[prop as K];
            }
            return [];
         },
      });
   };
}

if (!Array.prototype.unique) {
   Array.prototype.unique = function <T>(this: T[]): T[] {
      return Array.from(new Set(this));
   };
}

if (!Array.prototype.uniqBy) {
   Array.prototype.uniqBy = function <T, K>(this: T[], keyFn: (item: T) => K): T[] {
      const seen = new Set<K>();
      const result: T[] = [];
      for (const item of this) {
         const key = keyFn(item);
         if (!seen.has(key)) {
            seen.add(key);
            result.push(item);
         }
      }
      return result;
   };
}

if (!Array.prototype.chunk) {
   Array.prototype.chunk = function <T>(this: T[], size: number): T[][] {
      const chunks: T[][] = [];
      for (let i = 0; i < this.length; i += size) {
         chunks.push(this.slice(i, i + size));
      }
      return chunks;
   };
}

if (!Array.prototype.intersect) {
   Array.prototype.intersect = function <T>(this: T[], other: T[]): T[] {
      const setOther = new Set(other);
      return this.filter((item) => setOther.has(item));
   };
}

if (!Array.prototype.difference) {
   Array.prototype.difference = function <T>(this: T[], other: T[]): T[] {
      const setOther = new Set(other);
      return this.filter((item) => !setOther.has(item));
   };
}

if (!Array.prototype.union) {
   Array.prototype.union = function <T>(this: T[], other: T[]): T[] {
      const set = new Set([...this, ...other]);
      return Array.from(set);
   };
}

if (!Array.prototype.pluck) {
   Array.prototype.pluck = function <T, K extends keyof T>(this: T[], key: K): T[K][] {
      return this.map((item) => item[key]);
   };
}

function isDefined<T>(value: T): value is Exclude<T, undefined> {
   return value !== undefined;
}

export {};
