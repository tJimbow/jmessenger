import type { AxiosInstance } from 'axios';

export class AxiosHttpInstance {
  constructor(private readonly axiosInstance: AxiosInstance) {
    axiosInstance.defaults.baseURL = 'http://localhost:4173/api';
  }

  async get<T, D>(path: string, params: D) {
    return await this.axiosInstance.get<T>(path, { params });
  }

  async post<T, D>(path: string, params: D): Promise<void> {
    await this.axiosInstance.post<T>(path, params);
  }
}