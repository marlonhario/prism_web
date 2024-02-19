import axios from "axios";
import config from "./apiConfig";
import IEndpoint from "../common/interfaces/Endpoint";

export * from "./apiEndpoints";

const apiFetch = (endpoint: Partial<IEndpoint>) => {
  const headers = Object.assign(config.headers, endpoint.headers || {});
  return axios({
    ...config,
    ...endpoint,
    ...headers,
    validateStatus: (status) => {
      return status < 500;
    },
  })
    .then((r) => {
      
      return { status: r.status, data: r.data };
    })
    .catch((e) => {
      const error = {
        error: e.status,
        message: `Caught an error: Failed to ${endpoint.method} information`,
      };
      throw error;
    });
};

export default apiFetch;
