import request from '@/utils/request';

export function getAuth(data: { email: string; password: string }) {
    return request({
        url: 'https://api-prospero.sigmarisk.com.au/api/v1/auth',
        method: 'POST',
        data,
    });
}
