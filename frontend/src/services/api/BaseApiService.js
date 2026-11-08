import { mockRequest } from '../../data/mockData';

class BaseApiService {
 constructor(baseURL = '/api') {
  this.baseURL = baseURL;
 }

  getHeaders() {
   const token = sessionStorage.getItem('token');
    const headers = {
     'Content-Type': 'application/json'
   };

   if (token) {
    headers['Authorization'] = `Bearer ${token}`;
   }

   return headers;
  }

 async handleResponse(response) {
   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
   }

   return data;
  }

 async get(endpoint, params = {}) {
   return mockRequest('GET', `${this.baseURL}${endpoint}`, params);
  }

 async post(endpoint, data = {}) {
   return mockRequest('POST', `${this.baseURL}${endpoint}`, data);
  }

 async put(endpoint, data = {}) {
   return mockRequest('PUT', `${this.baseURL}${endpoint}`, data);
  }

 async delete(endpoint) {
   return mockRequest('DELETE', `${this.baseURL}${endpoint}`);
  }
}

export default BaseApiService;
