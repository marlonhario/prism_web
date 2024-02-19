import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const config: { headers: AxiosRequestHeaders } & AxiosRequestConfig = {
  baseURL: `${process.env.REACT_APP_PRISM_API || ''}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};

export default config;
