<div align="center">ant-design-testing</div>

_Easier testing for ant-design-based UI library_

This library is based on `Jest` and `React-Testing-Library`

## Usage

```shell
$ npm install ant-design-testing -D
#or
$ yarn add ant-design-testing -D
#or
$ pnpm add ant-design-testing -D
```

Then, modify the prefixCls if you need it, default prefixCls is `ant`

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

Otherwise, you can use query to find ant-design element quickly, like this
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

A simple example form demo, like this
```tsx
// your form Component
const MyForm = ({ onSubmit }: any) => {
    const [form] = Form.useForm();
    return (
        <Form form={form}>
            <Form.Item name="username">
                <Input />
            </Form.Item>
            <Form.Item name="password">
                <Input type="password" />
            </Form.Item>
            <Form.Item name="role">
                <Select>
                    <Select.Option value="admin">管理员</Select.Option>
                </Select>
            </Form.Item>
            <Button
                htmlType="submit"
                onClick={() => {
                    onSubmit(form.getFieldsValue());
                }}
            >
                提交
            </Button>
        </Form>
    );
};
```
```tsx
// your test file
import { select, input, button } from 'ant-design-testing';

it('test MyForm', () => {
    const fn = jest.fn();
    const { container } = render(
        <MyForm onSubmit={fn}/>
    );
    const userName = input.query(container)!;
    const password = input.query(container, 1)!;
    input.fireChange(userName, 'zhangsan')
    input.fireChange(password, '123456')

    select.fireOpen(container);
    select.fireSelect(document.body, 0)

    button.fireClick(container);

    expect(fn).toBeCalledWith({username: 'zhangsan', password: '123456', role: 'admin'});
});
```

**Notice**

Currently, only antd4. x is supported.
