import request from "@/utils/http";
export const loginAPI = ({ phone, password, type }) => {
  return request({
    url: "/login/password",
    method: "POST",
    data: {
      phone,
      password,
      type,
    },
  });
};
export const getUserListAPI = (params) => {
  return request({
    url: "/sys/user/info",
    method: "GET",
    params,
  });
};
export const updateUserStateAPI = (stateDto) => {
  return request({
    url: "/sys/user/state",
    method: "PUT",
    data: stateDto,
  });
};
