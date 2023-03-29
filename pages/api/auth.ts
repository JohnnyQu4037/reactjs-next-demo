import request from "@/utils/request";

export const login = (data: AUTH.LoginForm) => {
  return request({
    url: "auth",
    method: "POST",
    data,
  });
};
