import request from "@/utils/request";

export const getPkBook = () => {
  return request({
    url: "book/pk",
    method: "GET",
  });
};
