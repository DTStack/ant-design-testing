export type IContainer = HTMLElement | Document;

export type ReturnElement = HTMLElement | null | undefined;

export type OmitFirstArg<F> = F extends (arg1: any, ...args: infer Rest) => infer R ? (...args: Rest) => R : never;

// mixin some custom functions into HTMLElement
export type MixinElement<T> = ReturnElement & { [K in keyof T]: OmitFirstArg<T[K]> };
