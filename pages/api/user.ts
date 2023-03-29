import request from "@/utils/request";

export const getAccounts = () => {
  return request({
    url: "user",
    method: "GET",
  });
};

export const updateAccount = (data: ACCOUNT.ModifyAccountData[]) => {
  return request({
    url: "user",
    method: "PUT",
    data,
  });
};

export const createAccount = (data: ACCOUNT.ModifyAccountData) => {
  return request({
    url: "user",
    method: "POST",
    data,
  });
};

export const deleteAccounts = (data: { id: number }) => {
  return request({
    url: "user",
    method: "delete",
    data,
  });
};
