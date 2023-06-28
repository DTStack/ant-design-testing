import { IContainer } from '../interface';
import { getProvider } from '../provider';

export function queryFormItems(container: IContainer) {
    return container.querySelectorAll<HTMLDivElement>(`.${getProvider('prefixCls')}-form-item`);
}

export function queryFormItemControls(container: IContainer) {
    return container.querySelectorAll<HTMLDivElement>(`.${getProvider('prefixCls')}-form-item-control`);
}
