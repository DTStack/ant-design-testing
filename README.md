<div align="center">ant-design-testing</div>

_Easier testing for ant-design-based UI library_

## Usage

```shell
$ npm install ant-design-testing -D
#or
$ yarn add ant-design-testing -D
#or
$ pnpm add ant-design-testing -D
```

then, modify the prefixCls if you need it, default prefixCls is `ant`

```tsx
// setupTests.ts
import { provider } from 'ant-design-testing';

provider({ prefixCls: 'ant' });
```

```tsx
// yourInput.test.tsx
import { input } from 'ant-design-testing';

describe("Test input's fire functions", () => {
    test('fireChange', () => {
        const fn = jest.fn();
        const { container } = render(<Input onChange={fn} />);
        input.fireChange(container, 'test');
        expect(fn).toBeCalled();
    });
});
```

otherwise, you can use query to find ant-design element quickly, like this
```tsx
// yourInput.test.tsx
import { input } from 'ant-design-testing';

test('query', () => {
    const { container } = render(<div>
        <Input />
        <Input id='test' />
    </div>);
    const el = input.query(container, 1)
    expect(el.id).toBe('test');
});
```
