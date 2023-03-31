import request from "@/utils/request";

export const getPermissions = () => {
  return request({
    url: "permission",
    method: "GET",
  });
};

export const updatePermission = (data: { id: number; permission_name: string; permission: object }) => {
  return request({
    url: "permission",
    method: "PUT",
    data,
  });
};

export const createPermission = (data: { permission_name: string; permission: object }) => {
  return request({
    url: "permission",
    method: "POST",
    data,
  });
};

export const deletePermission = (data: { id: number }) => {
  return request({
    url: "permission",
    method: "DELETE",
    data,
  });
};
