import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the method types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Define the callApi function with TypeScript types
async function callApi<T>(
  url: string,
  method: HttpMethod,
  data: any = null,
  headers: Record<string, string> = {}
): Promise<T> {
  try {
    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      data: data,
      headers: headers,
    };

    const response: AxiosResponse<T> = await axios(config);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

export default callApi;