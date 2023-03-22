import request from '@/utils/request';

export function login(data: AUTH.LoginForm) {
    return request({
        url: 'auth',
        method: 'POST',
        data,
    });
}
