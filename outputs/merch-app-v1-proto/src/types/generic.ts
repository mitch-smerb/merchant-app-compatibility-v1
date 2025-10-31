export type IsAny<T> = 0 extends 1 & T ? true : false;

export interface BaseMap<V = any> {
  [key: string]: V;
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
