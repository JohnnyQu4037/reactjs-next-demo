import { RuleObject } from 'ant-design-vue/es/form/interface';

/**
 *
 * @param rule antd rule
 * @param value form item value
 * @returns promise
 */
export const validateEmail = async (rule: RuleObject, value: string) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(value)) {
        return Promise.reject('Please input a correct email.');
    } else {
        return Promise.resolve();
    }
};
