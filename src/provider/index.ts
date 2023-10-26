const globalConfig = {
    prefixCls: 'ant',
};

export function getProviders() {
    return globalConfig;
}

export function getProvider(key: keyof typeof globalConfig) {
    return globalConfig[key];
}

export function provider(opt: Partial<typeof globalConfig>) {
    Object.assign(globalConfig, opt);
}
