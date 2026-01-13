import axios, { type AxiosRequestConfig, type Method } from "axios";

export const baseURL = import.meta.env.VITE_BASE_URL
export const request = axios.create({
    baseURL
})

export const httpRequest = <T>(
    url: string,
    method: Method,
    data?: any,
    config?: AxiosRequestConfig,
): Promise<HttpResponse<T>> => {
    return new Promise((resolve, reject) => {
        request({
            url,
            method,
            data: method === 'get' || method === 'GET' ? null : data,
            params: method === 'get' || method === 'GET' ? data : null,
            ...config,
        })
            .then((res) => {
                resolve(res.data as HttpResponse<T>);
            })
            .catch((err) => {
                reject(err);
                console.error(`axios error: ${err}`);
            });
    });
};

export const getRequest = <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return httpRequest<T>(url, 'GET', data, config);
};

export const postRequest = <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return httpRequest<T>(url, 'POST', data, config);
};

export const putRequest = <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return httpRequest<T>(url, 'PUT', data, config);
};

export const deleteRequest = <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    return httpRequest<T>(url, 'DELETE', data, config);
};
