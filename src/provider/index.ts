const globalConfig = {
  prefixCls: "rc",
};

export function getProvider() {
  return globalConfig;
}

export function provider(opt: Partial<typeof globalConfig>) {
  Object.assign(globalConfig, opt);
}
