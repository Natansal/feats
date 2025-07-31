if (!Object.typedKeys) {
   Object.typedKeys = Object.keys as any;
}

if (!Object.pick) {
   Object.pick = function <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
      const result = {} as Pick<T, K>;
      for (const key of keys) {
         if (key in obj) {
            result[key] = obj[key];
         }
      }
      return result;
   };
}

if (!Object.omit) {
   Object.omit = function <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
      const result = {} as Omit<T, K>;
      const keySet = new Set(keys.map((v) => v.toString()) as Extract<keyof T, string>[]);

      for (const key in obj) {
         if (!keySet.has(key)) {
            (result as any)[key] = obj[key];
         }
      }

      return result;
   };
}

export {};
