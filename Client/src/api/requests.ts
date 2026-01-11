import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5047/api/";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log("interceptor..");
    return Promise.reject(error.message);
  }
);

const queries = {
  get: (url: string) =>
    axios.get(url).then((response: AxiosResponse) => response.data),
  post: <T>(url: string, body: T) =>
    axios.post(url, body).then((response: AxiosResponse) => response.data),
  put: <T>(url: string, body: T) =>
    axios.put(url, body).then((response: AxiosResponse) => response.data),
  delete: (url: string) =>
    axios.delete(url).then((response: AxiosResponse) => response.data),
};

const Catalog = {
  list: () => queries.get("products"),
  details: (id: number) => queries.get(`products/${id}`),
};

const requests = {
  Catalog,
};

export default requests;
