import request from '@/utils/request';

export function getPermissions() {
    return request({
        url: 'permission',
        method: 'GET',
    });
}

export function updatePermission(data) {
    return request({
        url: 'permission',
        method: 'PUT',
        data,
    });
}

export function createPermission(data) {
    return request({
        url: 'permission',
        method: 'POST',
        data,
    });
}

export function deletePermission(data) {
    return request({
        url: 'permission',
        method: 'DELETE',
        data,
    });
}
