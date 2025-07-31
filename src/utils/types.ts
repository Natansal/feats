export type ToStringKey<K> = K extends string ? K : K extends number ? `${K}` : never;
