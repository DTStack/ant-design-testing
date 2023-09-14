import { provider } from '../src/provider';

Object.defineProperty(global.window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn((query) => ({
        matches: query.includes('max-width'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
    })),
});

// fix issue https://github.com/jestjs/jest/pull/13825#issuecomment-1452037295
Object.defineProperties(MouseEvent.prototype, {
    pageX: {
        get() {
            return this.clientX;
        },
    },
});

provider({ prefixCls: 'ant' });
