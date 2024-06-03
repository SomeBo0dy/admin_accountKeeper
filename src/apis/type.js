import request from "@/utils/http";
export const getTypeListAPI = (params) => {
  return request({
    url: "/types/page",
    method: "GET",
    params,
  });
};
export const deleteTypeAPI = (typeId) => {
  return request({
    url: `/types/${typeId}`,
    method: "DELETE",
  });
};
export const uploadTypeAPI = (type) => {
  return request({
    url: "/types",
    method: "POST",
    data: type,
  });
};
export const editTypeAPI = (type) => {
  return request({
    url: "/types",
    method: "PUT",
    data: type,
  });
};
