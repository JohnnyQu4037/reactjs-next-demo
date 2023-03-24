import request from "@/utils/request";

export function getPermissions() {
  return request({
    url: "permission",
    method: "GET",
  });
}

export function updatePermission(data: PERMISSION.FrontPermission) {
  return request({
    url: "permission",
    method: "PUT",
    data,
  });
}

export function createPermission(data: PERMISSION.FrontPermission) {
  return request({
    url: "permission",
    method: "POST",
    data,
  });
}

export function deletePermission(data: PERMISSION.FrontPermission) {
  return request({
    url: "permission",
    method: "DELETE",
    data,
  });
}
