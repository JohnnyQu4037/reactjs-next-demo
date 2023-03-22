import request from '@/utils/request';

export function getAccounts() {
    return request({
        url: 'user',
        method: 'GET',
    });
}

export function updateAccount(data: ACCOUNT.ModifyAccountData[]) {
    return request({
        url: 'user',
        method: 'PUT',
        data,
    });
}

export function createAccount(data: ACCOUNT.ModifyAccountData) {
    return request({
        url: 'user',
        method: 'POST',
        data,
    });
}
