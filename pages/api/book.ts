import request from '@/utils/request';

export function getPkBook() {
    return request({
        url: 'book/pk',
        method: 'GET',
    });
}
